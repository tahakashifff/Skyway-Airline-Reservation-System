document.addEventListener('DOMContentLoaded', () => {
  const findBtn = document.getElementById('find-booking-btn');
  const bpContainer = document.getElementById('boarding-pass-container');
  const formContainer = document.getElementById('checkin-form-container');

  if (findBtn) {
    findBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const ref = document.getElementById('booking-ref-input').value.toUpperCase();
      const lname = document.getElementById('last-name-input').value.toLowerCase();

      if (!ref || !lname) {
        showToast('Please enter both booking reference and last name', 'error');
        return;
      }

      let allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
      const booking = allBookings.find(b => 
        b.reference === ref && 
        b.passengers.some(p => p.lastName.toLowerCase() === lname)
      );

      if (booking) {
        if (booking.status === 'Cancelled') {
          showToast('This booking is cancelled.', 'error');
          return;
        }
        
        // Hide form, show boarding pass
        formContainer.style.display = 'none';
        bpContainer.style.display = 'block';
        
        generateBoardingPass(booking, lname);
      } else {
        showToast('Booking not found', 'error');
      }
    });
  }

  function generateBoardingPass(booking, lname) {
    const flight = booking.flight;
    // Find the specific passenger
    const pax = booking.passengers.find(p => p.lastName.toLowerCase() === lname) || booking.passengers[0];
    
    document.getElementById('bp-name').textContent = `${pax.firstName} ${pax.lastName}`;
    document.getElementById('bp-route').textContent = `${flight.origin} ✈ ${flight.destination}`;
    document.getElementById('bp-flight').textContent = flight.flightNo;
    document.getElementById('bp-date').textContent = new Date(booking.date).toLocaleDateString();
    document.getElementById('bp-time').textContent = flight.depTime;
    document.getElementById('bp-seat').textContent = pax.seat;
    document.getElementById('bp-class').textContent = flight.class;
    
    // Simulate torn edge with CSS in html
    // The barcode is an SVG placeholder
  }
});
