document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('status-search-btn');
  const resultCard = document.getElementById('status-result');

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const flightNo = document.getElementById('status-flight-no').value.toUpperCase();
      
      if (!flightNo) {
        showToast('Please enter a flight number', 'error');
        return;
      }

      if (typeof flightStatuses === 'undefined') return;

      const statusObj = flightStatuses.find(f => f.flightNo === flightNo);
      
      if (statusObj) {
        resultCard.style.display = 'block';
        
        document.getElementById('st-flight').textContent = statusObj.flightNo;
        document.getElementById('st-route').textContent = statusObj.route;
        document.getElementById('st-aircraft').textContent = statusObj.aircraft;
        
        const badge = document.getElementById('st-badge');
        badge.textContent = statusObj.status;
        badge.className = 'badge';
        if (statusObj.status === 'On Time' || statusObj.status === 'Landed') badge.classList.add('badge-success');
        else if (statusObj.status === 'Cancelled') badge.classList.add('badge-danger');
        else badge.classList.add('badge-warning');

        document.getElementById('st-scheduled').textContent = statusObj.scheduled;
        document.getElementById('st-actual').textContent = statusObj.actual;
        document.getElementById('st-gate').textContent = statusObj.gate;
        document.getElementById('st-term').textContent = statusObj.terminal;

        const pBar = document.getElementById('st-progress');
        pBar.style.width = statusObj.progress + '%';
        if (statusObj.status === 'Cancelled') pBar.style.backgroundColor = 'var(--danger)';
        else pBar.style.backgroundColor = 'var(--primary)';

      } else {
        showToast('Flight status not found', 'error');
        resultCard.style.display = 'none';
      }
    });
  }
});
