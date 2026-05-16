document.addEventListener('DOMContentLoaded', () => {
  const flightDataStr = localStorage.getItem('selectedFlight');
  const searchParamsStr = localStorage.getItem('flightSearchParams');
  
  if (!flightDataStr) {
    window.location.href = 'index.html';
    return;
  }

  const flight = JSON.parse(flightDataStr);
  let searchParams = { passengers: 1 };
  if(searchParamsStr) searchParams = JSON.parse(searchParamsStr);

  const numPassengers = parseInt(searchParams.passengers) || 1;
  let currentStep = 1;
  let selectedSeats = [];
  let addons = { baggage: 0, meal: 0, insurance: 0 };
  let basePrice = flight.price * numPassengers;
  let discount = 0;

  // Initialize Summary
  updateSummary();

  // Step Navigation
  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3')
  ];
  const progressBars = [
    document.getElementById('prog-1'),
    document.getElementById('prog-2'),
    document.getElementById('prog-3')
  ];

  function showStep(stepNum) {
    steps.forEach((el, index) => {
      if (el) el.style.display = (index + 1 === stepNum) ? 'block' : 'none';
    });
    progressBars.forEach((el, index) => {
      if (el) {
        if (index + 1 <= stepNum) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });
    currentStep = stepNum;
  }

  // Generate Passenger Forms
  const paxContainer = document.getElementById('passengers-container');
  if (paxContainer) {
    paxContainer.innerHTML = '';
    for(let i=1; i<=numPassengers; i++) {
      paxContainer.innerHTML += `
        <div class="card mb-4">
          <h4 class="mb-4">Passenger ${i}</h4>
          <div class="grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div class="form-group">
              <label class="form-label">First Name</label>
              <input type="text" class="form-control pax-fname" required>
            </div>
            <div class="form-group">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-control pax-lname" required>
            </div>
            <div class="form-group">
              <label class="form-label">Passport Number</label>
              <input type="text" class="form-control pax-passport" required>
            </div>
          </div>
        </div>
      `;
    }
  }

  // Seat Map Generation
  const seatMap = document.getElementById('seat-map');
  if (seatMap) {
    let rows = '';
    for(let i=1; i<=15; i++) {
      let seatHTML = '';
      ['A','B','C', 'space', 'D','E','F'].forEach(seat => {
        if (seat === 'space') {
          seatHTML += `<div style="width: 20px;"></div>`;
        } else {
          const seatId = `${i}${seat}`;
          // random taken seats
          const isTaken = Math.random() > 0.7;
          let className = 'seat';
          if (isTaken) className += ' taken';
          else if (i <= 3) className += ' premium';
          
          seatHTML += `<div class="${className}" data-seat="${seatId}">${seatId}</div>`;
        }
      });
      rows += `<div class="flex justify-center gap-2 mb-2">${seatHTML}</div>`;
    }
    seatMap.innerHTML = rows;

    // Seat Click Logic
    document.querySelectorAll('.seat:not(.taken)').forEach(el => {
      el.addEventListener('click', function() {
        const sid = this.getAttribute('data-seat');
        if (this.classList.contains('selected')) {
          this.classList.remove('selected');
          selectedSeats = selectedSeats.filter(s => s !== sid);
        } else {
          if (selectedSeats.length < numPassengers) {
            this.classList.add('selected');
            selectedSeats.push(sid);
          } else {
            showToast(`You can only select ${numPassengers} seat(s)`, 'error');
          }
        }
        updateSummary();
      });
    });
  }

  // Next Buttons
  const toStep2 = document.getElementById('to-step-2');
  if (toStep2) toStep2.addEventListener('click', () => {
    // Basic validation
    const inputs = paxContainer.querySelectorAll('input');
    let valid = true;
    inputs.forEach(i => { if(!i.value) valid = false; });
    if(!valid) {
      showToast('Please fill all passenger details', 'error');
      return;
    }
    showStep(2);
  });

  const toStep3 = document.getElementById('to-step-3');
  if (toStep3) toStep3.addEventListener('click', () => {
    if (selectedSeats.length < numPassengers) {
      showToast(`Please select ${numPassengers} seat(s)`, 'error');
      return;
    }
    showStep(3);
  });

  const backTo1 = document.getElementById('back-to-1');
  if (backTo1) backTo1.addEventListener('click', () => showStep(1));
  const backTo2 = document.getElementById('back-to-2');
  if (backTo2) backTo2.addEventListener('click', () => showStep(2));


  // Addons logic
  document.querySelectorAll('input[name="baggage"]').forEach(el => {
    el.addEventListener('change', (e) => {
      addons.baggage = parseInt(e.target.value) * numPassengers;
      updateSummary();
    });
  });
  
  const insToggle = document.getElementById('insurance-toggle');
  if (insToggle) {
    insToggle.addEventListener('change', (e) => {
      addons.insurance = e.target.checked ? (25 * numPassengers) : 0;
      updateSummary();
    });
  }

  // Promo Code
  const applyPromo = document.getElementById('apply-promo');
  if (applyPromo) {
    applyPromo.addEventListener('click', () => {
      const code = document.getElementById('promo-code').value.toUpperCase();
      if (promoCodes[code]) {
        if (promoCodes[code] < 1) {
          discount = basePrice * promoCodes[code]; // percentage
        } else {
          discount = promoCodes[code]; // fixed amount
        }
        showToast('Promo code applied!', 'success');
        updateSummary();
      } else {
        showToast('Invalid promo code', 'error');
      }
    });
  }

  function updateSummary() {
    const sumBase = document.getElementById('sum-base');
    const sumSeats = document.getElementById('sum-seats');
    const sumAddons = document.getElementById('sum-addons');
    const sumDiscount = document.getElementById('sum-discount');
    const sumTotal = document.getElementById('sum-total');

    if (sumBase) sumBase.textContent = `$${basePrice}`;
    if (sumSeats) sumSeats.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';
    
    const addonsTotal = addons.baggage + addons.meal + addons.insurance;
    if (sumAddons) sumAddons.textContent = `$${addonsTotal}`;
    
    if (sumDiscount) sumDiscount.textContent = discount > 0 ? `-$${discount.toFixed(2)}` : '$0';
    
    const finalTotal = basePrice + addonsTotal - discount;
    if (sumTotal) sumTotal.textContent = `$${finalTotal.toFixed(2)}`;
  }

  // Confirm Booking
  const confirmBtn = document.getElementById('confirm-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      // Gather data
      const paxes = [];
      const fnames = document.querySelectorAll('.pax-fname');
      const lnames = document.querySelectorAll('.pax-lname');
      for(let i=0; i<numPassengers; i++) {
        paxes.push({ firstName: fnames[i].value, lastName: lnames[i].value, seat: selectedSeats[i] });
      }

      // Check if already submitted
      if (confirmBtn.disabled) return;
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = 'Confirming...';

      const booking = {
        reference: 'SW-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        flight: flight,
        passengers: paxes,
        totalPaid: basePrice + addons.baggage + addons.insurance - discount,
        date: new Date().toISOString()
      };

      localStorage.setItem('lastBooking', JSON.stringify(booking));
      
      // Also save to all bookings
      let allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
      
      // To prevent showing too many dummy bookings during testing, keep only the latest 5
      if (allBookings.length > 4) {
        allBookings = allBookings.slice(allBookings.length - 4);
      }

      allBookings.push(booking);
      localStorage.setItem('allBookings', JSON.stringify(allBookings));

      window.location.href = 'confirmation.html';
    });
  }
});
