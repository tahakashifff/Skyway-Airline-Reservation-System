const cities = [
  { code: 'JFK', name: 'New York', country: 'USA' },
  { code: 'DXB', name: 'Dubai', country: 'UAE' },
  { code: 'LHR', name: 'London', country: 'UK' },
  { code: 'CDG', name: 'Paris', country: 'France' },
  { code: 'IST', name: 'Istanbul', country: 'Turkey' },
  { code: 'BKK', name: 'Bangkok', country: 'Thailand' },
  { code: 'SYD', name: 'Sydney', country: 'Australia' },
  { code: 'HND', name: 'Tokyo', country: 'Japan' }
];

const airlines = [
  { code: 'SW', name: 'SkyWay Airlines', logo: 'SW' },
  { code: 'EA', name: 'Eagle Air', logo: 'EA' },
  { code: 'OA', name: 'Oceanic Airlines', logo: 'OA' },
  { code: 'GA', name: 'Global Airways', logo: 'GA' }
];

const flights = [
  {
    id: 'f1',
    airline: airlines[0],
    flightNo: 'SW101',
    origin: 'JFK',
    destination: 'LHR',
    depTime: '08:00',
    arrTime: '20:00',
    duration: '7h 00m',
    stops: 0,
    price: 450,
    class: 'Economy',
    aircraft: 'Boeing 777'
  },
  {
    id: 'f2',
    airline: airlines[1],
    flightNo: 'EA202',
    origin: 'JFK',
    destination: 'LHR',
    depTime: '10:30',
    arrTime: '23:30',
    duration: '8h 00m',
    stops: 1,
    price: 320,
    class: 'Economy',
    aircraft: 'Airbus A330'
  },
  {
    id: 'f3',
    airline: airlines[2],
    flightNo: 'OA303',
    origin: 'JFK',
    destination: 'LHR',
    depTime: '18:00',
    arrTime: '06:00',
    duration: '7h 00m',
    stops: 0,
    price: 520,
    class: 'Economy',
    aircraft: 'Boeing 787'
  },
  {
    id: 'f4',
    airline: airlines[0],
    flightNo: 'SW205',
    origin: 'LHR',
    destination: 'DXB',
    depTime: '09:00',
    arrTime: '19:00',
    duration: '7h 00m',
    stops: 0,
    price: 600,
    class: 'Economy',
    aircraft: 'Airbus A380'
  },
  {
    id: 'f5',
    airline: airlines[3],
    flightNo: 'GA404',
    origin: 'LHR',
    destination: 'DXB',
    depTime: '14:00',
    arrTime: '01:00',
    duration: '8h 00m',
    stops: 1,
    price: 480,
    class: 'Economy',
    aircraft: 'Boeing 777'
  },
  {
    id: 'f6',
    airline: airlines[0],
    flightNo: 'SW301',
    origin: 'DXB',
    destination: 'BKK',
    depTime: '03:00',
    arrTime: '12:30',
    duration: '6h 30m',
    stops: 0,
    price: 350,
    class: 'Economy',
    aircraft: 'Boeing 787'
  },
  {
    id: 'f7',
    airline: airlines[0],
    flightNo: 'SW401',
    origin: 'JFK',
    destination: 'DXB',
    depTime: '22:00',
    arrTime: '18:30',
    duration: '12h 30m',
    stops: 0,
    price: 850,
    class: 'Economy',
    aircraft: 'Airbus A380'
  },
  {
    id: 'f8',
    airline: airlines[1],
    flightNo: 'EA501',
    origin: 'JFK',
    destination: 'DXB',
    depTime: '16:00',
    arrTime: '15:00',
    duration: '15h 00m',
    stops: 1,
    price: 700,
    class: 'Economy',
    aircraft: 'Boeing 777'
  },
  {
    id: 'f9',
    airline: airlines[2],
    flightNo: 'OA601',
    origin: 'CDG',
    destination: 'JFK',
    depTime: '10:00',
    arrTime: '12:30',
    duration: '8h 30m',
    stops: 0,
    price: 420,
    class: 'Economy',
    aircraft: 'Boeing 787'
  },
  {
    id: 'f10',
    airline: airlines[0],
    flightNo: 'SW701',
    origin: 'IST',
    destination: 'LHR',
    depTime: '08:30',
    arrTime: '10:30',
    duration: '4h 00m',
    stops: 0,
    price: 150,
    class: 'Economy',
    aircraft: 'Airbus A320'
  }
];

const flightStatuses = [
  { flightNo: 'SW101', route: 'JFK → LHR', status: 'On Time', scheduled: '08:00', actual: '08:00', gate: 'A12', terminal: '4', aircraft: 'Boeing 777', progress: 0 },
  { flightNo: 'SW205', route: 'LHR → DXB', status: 'In Air', scheduled: '09:00', actual: '09:05', gate: 'B3', terminal: '5', aircraft: 'Airbus A380', progress: 50 },
  { flightNo: 'EA202', route: 'JFK → LHR', status: 'Delayed', scheduled: '10:30', actual: '11:45', gate: 'C7', terminal: '1', aircraft: 'Airbus A330', progress: 0, delayReason: 'Weather' },
  { flightNo: 'SW301', route: 'DXB → BKK', status: 'Landed', scheduled: '03:00', actual: '02:50', gate: 'D14', terminal: '3', aircraft: 'Boeing 787', progress: 100 },
  { flightNo: 'OA303', route: 'JFK → LHR', status: 'Cancelled', scheduled: '18:00', actual: '-', gate: '-', terminal: '-', aircraft: 'Boeing 787', progress: 0, delayReason: 'Operational' }
];

const promoCodes = {
  'SKY20': 0.20,
  'WELCOME10': 0.10,
  'FLY50': 50 // Fixed amount
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { cities, flights, flightStatuses, airlines, promoCodes };
}
