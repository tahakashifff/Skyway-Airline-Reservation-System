document.addEventListener('DOMContentLoaded', () => {
  const bookingStr = localStorage.getItem('lastBooking');
  if (!bookingStr) return;

  const booking = JSON.parse(bookingStr);
  const flight = booking.flight;
  const pax = booking.passengers[0]; // main passenger

  // Populate Ticket
  const bkgRef = document.getElementById('booking-ref');
  const tktName = document.getElementById('ticket-name');
  const tktRoute = document.getElementById('ticket-route');
  const tktFlight = document.getElementById('ticket-flight');
  const tktSeat = document.getElementById('ticket-seat');

  if (bkgRef) bkgRef.textContent = booking.reference;
  if (tktName) tktName.textContent = `${pax.firstName} ${pax.lastName}`;
  if (tktRoute) tktRoute.textContent = `${flight.origin} ✈ ${flight.destination}`;
  if (tktFlight) tktFlight.textContent = flight.flightNo;
  if (tktSeat) tktSeat.textContent = pax.seat;

  // Confetti removed for minimal design
});
