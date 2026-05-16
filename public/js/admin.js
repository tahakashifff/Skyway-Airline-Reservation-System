document.addEventListener('DOMContentLoaded', () => {
  const loginOverlay = document.getElementById('login-overlay');
  const dashboardContent = document.getElementById('dashboard-content');
  const loginForm = document.getElementById('admin-login-form');
  const logoutBtn = document.getElementById('logout-btn');

  // Check Auth Status
  if (sessionStorage.getItem('adminAuth') === 'true') {
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (dashboardContent) dashboardContent.style.display = 'flex';
    initDashboard();
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('admin-user').value;
      const pass = document.getElementById('admin-pass').value;

      if (user === 'admin' && pass === 'admin123') {
        sessionStorage.setItem('adminAuth', 'true');
        loginOverlay.style.display = 'none';
        dashboardContent.style.display = 'flex';
        initDashboard();
        if(typeof showToast === 'function') showToast('Login successful', 'success');
      } else {
        if(typeof showToast === 'function') showToast('Invalid credentials', 'error');
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('adminAuth');
      dashboardContent.style.display = 'none';
      loginOverlay.style.display = 'flex';
    });
  }

  function initDashboard() {
    // Animate Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const updateCount = () => {
        const c = +counter.innerText;
        const inc = target / 50;
        if (c < target) {
          counter.innerText = Math.ceil(c + inc);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });

    // Chart.js Setup
    if (typeof Chart !== 'undefined') {
      Chart.defaults.color = '#94a3b8'; // text-muted
      Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';

      const revCtx = document.getElementById('revenueChart');
      if (revCtx && !revCtx.dataset.initialized) {
        revCtx.dataset.initialized = true;
        new Chart(revCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Revenue',
              data: [12000, 19000, 15000, 25000, 22000, 30000],
              borderColor: '#38bdf8',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              fill: true,
              tension: 0.4
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, animation: false }
        });
      }

      const classCtx = document.getElementById('classChart');
      if (classCtx && !classCtx.dataset.initialized) {
        classCtx.dataset.initialized = true;
        new Chart(classCtx, {
          type: 'doughnut',
          data: {
            labels: ['Economy', 'Business', 'First Class'],
            datasets: [{
              data: [70, 20, 10],
              backgroundColor: ['#38bdf8', '#94a3b8', '#e2e8f0'],
              borderColor: '#0f172a'
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, animation: false }
        });
      }

      const destCtx = document.getElementById('destChart');
      if (destCtx && !destCtx.dataset.initialized) {
        destCtx.dataset.initialized = true;
        new Chart(destCtx, {
          type: 'bar',
          data: {
            labels: ['DXB', 'LHR', 'JFK', 'CDG', 'BKK'],
            datasets: [{
              label: 'Bookings',
              data: [400, 350, 300, 250, 200],
              backgroundColor: '#38bdf8'
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', animation: false }
        });
      }
    }

    // Populate Flight Schedule Table
    const tableBody = document.getElementById('schedule-table-body');
    if (tableBody && typeof flightStatuses !== 'undefined' && !tableBody.dataset.initialized) {
      tableBody.dataset.initialized = true;
      tableBody.innerHTML = '';
      flightStatuses.forEach(f => {
        const tr = document.createElement('tr');
        let badgeClass = 'badge-success';
        if (f.status === 'Delayed') badgeClass = 'badge-warning';
        if (f.status === 'Cancelled') badgeClass = 'badge-danger';

        tr.innerHTML = `
          <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">${f.flightNo}</td>
          <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">${f.route}</td>
          <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">${f.scheduled}</td>
          <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">${f.actual}</td>
          <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">${f.aircraft}</td>
          <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);"><span class="badge ${badgeClass}">${f.status}</span></td>
        `;
        tableBody.appendChild(tr);
      });
    }
  }
});
