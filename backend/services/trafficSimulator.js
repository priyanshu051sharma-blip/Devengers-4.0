import TrafficSignal from '../models/TrafficSignal.js';
import ParkingSpot from '../models/ParkingSpot.js';
import ParkingZone from '../models/ParkingZone.js';

const INTERSECTIONS = [
  { signalId: 'SIG001', name: 'S.G. Highway - Thaltej, Ahmedabad', lat: 23.0507, lng: 72.5110 },
  { signalId: 'SIG002', name: 'Ashram Road - Income Tax Circle, Ahmedabad', lat: 23.0365, lng: 72.5684 },
  { signalId: 'SIG003', name: 'Infocity Circle, Gandhinagar', lat: 23.2156, lng: 72.6369 },
  { signalId: 'SIG004', name: 'Alkapuri, Vadodara', lat: 22.3100, lng: 73.1700 },
  { signalId: 'SIG005', name: 'Athwa Gate, Surat', lat: 21.1858, lng: 72.8095 },
  { signalId: 'SIG006', name: 'Kalawad Road, Rajkot', lat: 22.3039, lng: 70.8022 }
];

const PARKING_ZONES = [
  { zoneId: 'ZONE-1', zone: 'S.G. Highway - Thaltej Parking, Ahmedabad', count: 50, pricePerHour: 60, lat: 23.0507, lng: 72.5110 },
  { zoneId: 'ZONE-2', zone: 'Infocity Circle Parking, Gandhinagar', count: 40, pricePerHour: 50, lat: 23.2156, lng: 72.6369 },
  { zoneId: 'ZONE-3', zone: 'Alkapuri Parking, Vadodara', count: 35, pricePerHour: 70, lat: 22.3100, lng: 73.1700 },
  { zoneId: 'ZONE-4', zone: 'Athwa Gate Parking, Surat', count: 50, pricePerHour: 60, lat: 21.1858, lng: 72.8095 },
  { zoneId: 'ZONE-5', zone: 'Varachha Road Parking, Surat', count: 45, pricePerHour: 50, lat: 21.2134, lng: 72.8755 },
  { zoneId: 'ZONE-6', zone: 'Kalawad Road Parking, Rajkot', count: 40, pricePerHour: 45, lat: 22.3039, lng: 70.8022 },
  { zoneId: 'ZONE-7', zone: 'Ghogha Circle Parking, Bhavnagar', count: 30, pricePerHour: 40, lat: 21.7645, lng: 72.1519 },
  { zoneId: 'ZONE-8', zone: 'Bedi Road Parking, Jamnagar', count: 35, pricePerHour: 45, lat: 22.4707, lng: 70.0577 }
];

export async function initializeTrafficSimulation(io) {
  // ── Cleanup all old legacy zones and spots so only Gujarat hubs exist ──
  const validZoneIds = PARKING_ZONES.map(z => z.zoneId);
  const validZoneNames = PARKING_ZONES.map(z => z.zone);
  await ParkingZone.deleteMany({ name: { $nin: validZoneNames } });
  await ParkingSpot.deleteMany({ zone: { $nin: validZoneNames } });
  console.log('🧹 Cleaned up ALL legacy non-Gujarat parking data');

  // ── Initialize traffic signals ──────────────────────────────────────────────
  for (const intersection of INTERSECTIONS) {
    const exists = await TrafficSignal.findOne({ signalId: intersection.signalId });
    if (!exists) {
      await TrafficSignal.create({
        signalId: intersection.signalId,
        name: intersection.name,
        location: {
          name: intersection.name,
          lat: intersection.lat,
          lng: intersection.lng
        },
        status: 'green',
        currentTimer: 30,
        timings: { green: 30, yellow: 5, red: 30 },
        vehicleCount: Math.floor(Math.random() * 50),
        congestionLevel: 'low',
        connectedSignals: INTERSECTIONS
          .filter(i => i.signalId !== intersection.signalId)
          .slice(0, 2)
          .map(i => i.signalId),
        mode: 'auto',
        isActive: true,
        lastUpdated: new Date()
      });
    }
  }

  // ── Initialize parking zones & spots ────────────────────────────────────────
  for (const zoneData of PARKING_ZONES) {
    // Create zone if it doesn't exist
    const zoneExists = await ParkingZone.findOne({ zoneId: zoneData.zoneId });
    if (!zoneExists) {
      await ParkingZone.create({
        zoneId: zoneData.zoneId,
        name: zoneData.zone,
        location: {
          name: zoneData.zone,
          lat: zoneData.lat,
          lng: zoneData.lng
        },
        totalSpots: zoneData.count,
        pricePerHour: zoneData.pricePerHour,
        currency: 'INR',
        isActive: true,
        stats: {
          available: zoneData.count,
          occupied: 0,
          reserved: 0,
          revenue: 0
        }
      });
    }

    // Create spots for the zone
    for (let i = 1; i <= zoneData.count; i++) {
      const spotId = `${zoneData.zoneId}-${String(i).padStart(3, '0')}`;
      const exists = await ParkingSpot.findOne({ spotId });
      if (!exists) {
        let type = 'regular';
        if (i <= 2) type = 'disabled';
        else if (i === 3) type = 'ev';

        await ParkingSpot.create({
          spotId,
          zoneId: zoneData.zoneId,
          zone: zoneData.zone,
          location: {
            name: `${zoneData.zone} Parking`,
            lat: zoneData.lat + (Math.random() - 0.5) * 0.002,
            lng: zoneData.lng + (Math.random() - 0.5) * 0.002
          },
          status: Math.random() > 0.3 ? 'available' : 'occupied',
          type,
          vehicleCategory: i <= (zoneData.count * 0.4) ? '2-wheeler' : '4-wheeler',
          floor: Math.floor(i / 20),
          pricePerHour: i <= (zoneData.count * 0.4) ? Math.floor(zoneData.pricePerHour * 0.5) : zoneData.pricePerHour,
          currency: 'INR',
          isActive: true
        });
      }
    }
  }

  // Ensure pricing is consistent across all spots
  await ParkingSpot.updateMany(
    { pricePerHour: { $exists: false } },
    { $set: { pricePerHour: 20, currency: 'INR' } }
  );

  // ── Start traffic simulation loop ────────────────────────────────────────────
  setInterval(async () => {
    try {
      const signals = await TrafficSignal.find({ mode: 'auto', isActive: true });

      for (const signal of signals) {
        const vehicleCount = Math.floor(Math.random() * 100);
        let congestionLevel = 'low';
        let timer = signal.timings?.green || 30;

        if (vehicleCount > 80) {
          congestionLevel = 'critical';
          timer = 90;
        } else if (vehicleCount > 60) {
          congestionLevel = 'high';
          timer = 60;
        } else if (vehicleCount > 35) {
          congestionLevel = 'medium';
          timer = 45;
        }

        const statuses = ['green', 'yellow', 'red'];
        const currentIndex = statuses.indexOf(signal.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];

        signal.vehicleCount = vehicleCount;
        signal.congestionLevel = congestionLevel;
        signal.currentTimer = timer;
        signal.status = nextStatus;
        signal.lastUpdated = new Date();

        await signal.save();
      }

      io.emit('traffic-update', signals);
    } catch (err) {
      // Silently handle simulation errors — don't crash the server
      console.error('Traffic simulation error:', err.message);
    }
  }, 5000);

  console.log('✅ Traffic simulation initialized with 8 parking zones and 6 signals');
}
