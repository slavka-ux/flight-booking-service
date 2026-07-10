import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MOCK_FLIGHTS = [
  { flightNumber: 'AG-101', airline: 'AeroGlide Express', origin: 'LHR', originName: 'London Heathrow', destination: 'JFK', destinationName: 'New York JFK', departureTime: '08:30 AM', arrivalTime: '11:45 AM', duration: '8h 15m', price: 499, stops: 0, classType: 'Economy' },
  { flightNumber: 'AG-102', airline: 'AeroGlide Express', origin: 'LHR', originName: 'London Heathrow', destination: 'JFK', destinationName: 'New York JFK', departureTime: '02:15 PM', arrivalTime: '05:30 PM', duration: '8h 15m', price: 850, stops: 0, classType: 'Business' },
  { flightNumber: 'AG-201', airline: 'SkyLine Airways', origin: 'CDG', originName: 'Paris Charles de Gaulle', destination: 'NRT', destinationName: 'Tokyo Narita', departureTime: '11:00 AM', arrivalTime: '07:30 AM', duration: '11h 30m', price: 1250, stops: 1, classType: 'Economy' },
  { flightNumber: 'AG-202', airline: 'SkyLine Airways', origin: 'CDG', originName: 'Paris Charles de Gaulle', destination: 'NRT', destinationName: 'Tokyo Narita', departureTime: '09:00 PM', arrivalTime: '04:30 PM', duration: '10h 30m', price: 3400, stops: 0, classType: 'First' },
  { flightNumber: 'UA-301', airline: 'UkraWings', origin: 'KBP', originName: 'Kyiv Boryspil', destination: 'LHR', destinationName: 'London Heathrow', departureTime: '06:00 AM', arrivalTime: '08:20 AM', duration: '3h 20m', price: 180, stops: 0, classType: 'Economy' },
  { flightNumber: 'UA-302', airline: 'UkraWings', origin: 'KBP', originName: 'Kyiv Boryspil', destination: 'JFK', destinationName: 'New York JFK', departureTime: '10:00 AM', arrivalTime: '02:00 PM', duration: '11h 00m', price: 650, stops: 1, classType: 'Economy' },
  { flightNumber: 'EK-401', airline: 'Emirates', origin: 'DXB', originName: 'Dubai International', destination: 'LHR', destinationName: 'London Heathrow', departureTime: '03:00 PM', arrivalTime: '07:30 PM', duration: '7h 30m', price: 900, stops: 0, classType: 'Business' },
];

async function main() {
  console.log('Start seeding...');
  
  // Clear existing flights
  await prisma.flight.deleteMany({});
  
  for (const flight of MOCK_FLIGHTS) {
    const createdFlight = await prisma.flight.create({
      data: flight
    });
    console.log(`Created flight with id: ${createdFlight.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
