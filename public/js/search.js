document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('flight-search-form');
  const originSelect = document.getElementById('origin');
  const destinationSelect = document.getElementById('destination');
  const swapBtn = document.getElementById('swap-cities');

  // Populate dropdowns from data.js
  if (typeof cities !== 'undefined' && originSelect && destinationSelect) {
    cities.forEach(city => {
      const option1 = new Option(`${city.name} (${city.code})`, city.code);
      const option2 = new Option(`${city.name} (${city.code})`, city.code);
      originSelect.add(option1);
      destinationSelect.add(option2);
    });
    // Set defaults
    originSelect.value = 'JFK';
    destinationSelect.value = 'LHR';
  }

  // Swap cities logic
  if (swapBtn && originSelect && destinationSelect) {
    swapBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const temp = originSelect.value;
      originSelect.value = destinationSelect.value;
      destinationSelect.value = temp;
      
      // Animate swap icon
      const icon = swapBtn.querySelector('i');
      icon.style.transform = 'rotate(180deg)';
      setTimeout(() => { icon.style.transform = 'rotate(0)'; }, 300);
    });
  }

  // Handle form submission
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const searchParams = {
        tripType: document.querySelector('input[name="tripType"]:checked').value,
        origin: originSelect.value,
        destination: destinationSelect.value,
        departDate: document.getElementById('departDate').value,
        returnDate: document.getElementById('returnDate').value,
        passengers: document.getElementById('passengers').value,
        cabinClass: document.getElementById('cabinClass').value
      };

      if (searchParams.origin === searchParams.destination) {
        if(typeof showToast === 'function') showToast('Origin and Destination cannot be the same', 'error');
        return;
      }

      if (!searchParams.departDate) {
        if(typeof showToast === 'function') showToast('Please select a departure date', 'error');
        return;
      }

      localStorage.setItem('flightSearchParams', JSON.stringify(searchParams));
      window.location.href = 'results.html';
    });
  }
});
