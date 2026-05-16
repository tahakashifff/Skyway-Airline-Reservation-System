document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bookings-container');
  if (!container) return;

  renderBookings();

  function renderBookings() {
    let allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    container.innerHTML = '';

    if (allBookings.length === 0) {
      container.innerHTML = `
        <div class="text-center section">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80" alt="Empty" style="border-radius: 50%; width: 200px; height: 200px; object-fit: cover; margin: 0 auto 2rem;">
          <h3>No bookings yet!</h3>
          <p class="text-muted mb-4">It's time to start a new adventure.</p>
          <a href="index.html" class="btn btn-primary">Book your first flight</a>
        </div>
      `;
      return;
    }

    allBookings.reverse().forEach((booking, index) => {
      // For demo, first item is upcoming, others might be random statuses
      const status = booking.status || 'Confirmed';
      const badgeClass = status === 'Confirmed' ? 'badge-success' : (status === 'Cancelled' ? 'badge-danger' : 'badge-warning');
      
      const flight = booking.flight;
      const dateStr = new Date(booking.date).toLocaleDateString();

      const card = document.createElement('div');
      card.className = 'card mb-4 card-top-accent';
      card.innerHTML = `
        <div class="flex justify-between items-center flex-wrap gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="badge ${badgeClass}">${status}</span>
              <span class="text-muted" style="font-size: 0.875rem;">Ref: ${booking.reference}</span>
            </div>
            <h4 style="margin-bottom: 0.25rem;">${flight.origin} ✈ ${flight.destination}</h4>
            <p class="text-muted" style="font-size: 0.875rem;">${flight.flightNo} • ${dateStr} • ${booking.passengers.length} Passenger(s)</p>
          </div>
          
          <div class="flex gap-2">
            ${status !== 'Cancelled' ? `<button class="btn btn-outline" onclick="cancelBooking('${booking.reference}')">Cancel</button>` : ''}
            <a href="checkin.html" class="btn btn-primary">Check-in / Boarding Pass</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  window.cancelBooking = function(ref) {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      let allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
      const booking = allBookings.find(b => b.reference === ref);
      if (booking) {
        booking.status = 'Cancelled';
        localStorage.setItem('allBookings', JSON.stringify(allBookings));
        showToast('Booking cancelled successfully', 'success');
        renderBookings();
      }
    }
  };
});
