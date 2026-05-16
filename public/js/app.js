// Global application logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navbar
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Scroll to Top
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.className = 'btn btn-primary';
  scrollTopBtn.style.position = 'fixed';
  scrollTopBtn.style.bottom = '20px';
  scrollTopBtn.style.right = '20px';
  scrollTopBtn.style.borderRadius = '50%';
  scrollTopBtn.style.width = '50px';
  scrollTopBtn.style.height = '50px';
  scrollTopBtn.style.display = 'none';
  scrollTopBtn.style.zIndex = '999';
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Setup Toast Container
  if (!document.getElementById('toast-container')) {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
});

// Toast System
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
  const colorClass = type === 'success' ? 'text-success' : 'text-danger';
  
  toast.innerHTML = `
    <i class="fas fa-${icon} ${colorClass}" style="font-size: 1.5rem;"></i>
    <div>
      <h4 style="margin: 0; font-size: 1rem; color: var(--text);">${type === 'success' ? 'Success' : 'Error'}</h4>
      <p style="margin: 0; font-size: 0.875rem; color: var(--text-muted);">${message}</p>
    </div>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
