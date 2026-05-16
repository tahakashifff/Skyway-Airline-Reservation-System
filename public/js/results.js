document.addEventListener('DOMContentLoaded', () => {
  const resultsContainer = document.getElementById('flights-container');
  if (!resultsContainer) return;

  const searchParamsStr = localStorage.getItem('flightSearchParams');
  let searchParams = { origin: 'JFK', destination: 'LHR', passengers: 1, class: 'Economy' };
  
  if (searchParamsStr) {
    searchParams = JSON.parse(searchParamsStr);
    // Update sticky header
    const headerTitle = document.getElementById('search-summary-title');
    const headerDetails = document.getElementById('search-summary-details');
    if (headerTitle) headerTitle.textContent = `${searchParams.origin} to ${searchParams.destination}`;
    if (headerDetails) headerDetails.textContent = `${searchParams.departDate} | ${searchParams.passengers} Passenger(s) | ${searchParams.cabinClass}`;
  }

  // Show skeletons
  resultsContainer.innerHTML = '';
  for(let i=0; i<3; i++) {
    resultsContainer.innerHTML += `
      <div class="card mb-4 skeleton" style="height: 120px;"></div>
    `;
  }

  // Simulate network request
  setTimeout(() => {
    renderFlights(searchParams);
  }, 1500);

  // Filter bindings (simplified for demo)
  const filterInputs = document.querySelectorAll('.filter-input');
  filterInputs.forEach(input => {
    input.addEventListener('change', () => {
      // Show loader again
      resultsContainer.innerHTML = '<div class="card mb-4 skeleton" style="height: 120px;"></div>';
      setTimeout(() => renderFlights(searchParams), 500);
    });
  });
});

function renderFlights(params) {
  const container = document.getElementById('flights-container');
  container.innerHTML = '';

  // Filter flights based on origin and destination (or just show all if no match for demo purposes)
  let filteredFlights = flights.filter(f => f.origin === params.origin && f.destination === params.destination);
  
  // If no exact match, just show a few random ones for demonstration
  if (filteredFlights.length === 0) {
    filteredFlights = flights.slice(0, 3);
  }

  if (filteredFlights.length === 0) {
    container.innerHTML = `
      <div class="text-center section">
        <i class="fas fa-plane-slash" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <h3>No flights found</h3>
        <p class="text-muted">Try different dates or destinations.</p>
      </div>
    `;
    return;
  }

  filteredFlights.forEach(flight => {
    const card = document.createElement('div');
    card.className = 'card mb-4 animate-fade-in card-top-accent';
    
    card.innerHTML = `
      <div class="flex justify-between items-center" style="flex-wrap: wrap; gap: 1rem;">
        <div class="flex items-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--bg-soft); display: flex; justify-content: center; align-items: center; font-weight: bold; color: var(--primary);">
            ${flight.airline.logo}
          </div>
          <div>
            <h4 style="margin: 0;">${flight.airline.name}</h4>
            <span class="text-muted" style="font-size: 0.875rem;">${flight.flightNo} • ${flight.aircraft}</span>
          </div>
        </div>

        <div class="flex items-center gap-4" style="flex: 1; justify-content: center;">
          <div class="text-center">
            <div style="font-size: 1.25rem; font-weight: bold;">${flight.depTime}</div>
            <div class="text-muted">${flight.origin}</div>
          </div>
          
          <div class="flex flex-col items-center" style="min-width: 150px;">
            <span style="font-size: 0.75rem; color: var(--text-muted);">${flight.duration}</span>
            <div style="width: 100%; height: 2px; background: #e2e8f0; position: relative; margin: 0.5rem 0;">
              <i class="fas fa-plane" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--primary);"></i>
            </div>
            <span class="badge ${flight.stops === 0 ? 'badge-success' : 'badge-warning'}">${flight.stops === 0 ? 'Direct' : flight.stops + ' Stop(s)'}</span>
          </div>

          <div class="text-center">
            <div style="font-size: 1.25rem; font-weight: bold;">${flight.arrTime}</div>
            <div class="text-muted">${flight.destination}</div>
          </div>
        </div>

        <div class="text-right flex flex-col items-end gap-2">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--secondary);">$${flight.price}</div>
          <button class="btn btn-primary" onclick="selectFlight('${flight.id}')">Select Flight</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function selectFlight(id) {
  const flight = flights.find(f => f.id === id);
  if (flight) {
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
    window.location.href = 'booking.html';
  }
}
