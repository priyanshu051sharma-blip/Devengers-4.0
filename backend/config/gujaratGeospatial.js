const gujaratPlaces = [
  ['GJ-AHM-01', 'S.G. Highway - Thaltej', 23.0507, 72.5110, 'S.G. Highway / Thaltej Road'],
  ['GJ-AHM-02', 'Ashram Road - Income Tax Circle', 23.0365, 72.5684, 'Ashram Road'],
  ['GJ-GNR-03', 'Infocity Circle', 23.2156, 72.6369, 'Infocity Road'],
  ['GJ-GNR-04', 'Akshardham Road', 23.2168, 72.6470, 'Gandhinagar Capital Road'],
  ['GJ-VAD-05', 'Alkapuri', 22.3100, 73.1700, 'RC Dutt Road'],
  ['GJ-VAD-06', 'Sama Savli Road', 22.3410, 73.1810, 'Sama Savli Road'],
  ['GJ-SRT-07', 'Athwa Gate', 21.1858, 72.8095, 'Athwa Gate / Ring Road'],
  ['GJ-SRT-08', 'Varachha Road', 21.2134, 72.8755, 'Varachha Main Road'],
  ['GJ-RAJ-09', 'Kalawad Road', 22.3039, 70.8022, 'Kalawad Road'],
  ['GJ-BHV-10', 'Ghogha Circle', 21.7645, 72.1519, 'Ghogha Road'],
  ['GJ-JMN-11', 'Bedi Road', 22.4707, 70.0577, 'Bedi Road'],
  ['GJ-BRC-12', 'Zadeshwar Chowkdi', 21.7051, 72.9959, 'Zadeshwar Road']
];

const levels = ['GREEN', 'YELLOW', 'ORANGE', 'RED', 'DARK_RED'];

export const GUJARAT_ZONES = gujaratPlaces.map(([zone_id, name, latitude, longitude, road], index) => {
  const congestion_level = levels[index % levels.length];
  const average_speed = congestion_level === 'DARK_RED' ? 6 : congestion_level === 'RED' ? 12 : congestion_level === 'ORANGE' ? 20 : congestion_level === 'YELLOW' ? 30 : 42;
  const current_vehicle_density = 420 + index * 115;
  return {
    zone_id,
    name,
    latitude,
    longitude,
    road,
    current_vehicle_density,
    average_speed,
    road_condition: 'Live Gujarat traffic monitoring zone',
    congestion_level,
    risk_level: congestion_level === 'DARK_RED' ? 'CRITICAL' : congestion_level === 'RED' ? 'HIGH' : 'MEDIUM',
    noise_level: 72 + index,
    incident_count: index % 3,
    prediction_5min: { queue_m: 180 + index * 35, speed: Math.max(average_speed - 2, 4), trend: 'STABLE' },
    prediction_10min: { queue_m: 240 + index * 40, speed: Math.max(average_speed - 3, 4), trend: 'INCREASING' },
    prediction_15min: { queue_m: 320 + index * 45, speed: Math.max(average_speed - 4, 3), trend: 'INCREASING' },
    prediction_30min: { queue_m: 420 + index * 55, speed: Math.max(average_speed - 5, 3), trend: 'INCREASING' },
    last_updated: new Date().toISOString(),
    incidents: [],
    infrastructure_issue: null,
    noise_hotspot: { is_hotspot: congestion_level === 'RED' || congestion_level === 'DARK_RED', noise_db: 72 + index, classification: 'traffic_volume', exposure_risk: 'MEDIUM' },
    emergency_corridor: { active: false, vehicle_id: null, target_eta_min: null },
    signal_junction: { name: `${name} Signal`, status: index % 2 ? 'Green' : 'Red', timer: 30 + index, mode: 'adaptive' },
    recommendation: { action: 'Optimize signal timing and monitor queue growth', expected_delay_reduction_percent: 28, confidence: 0.9, primary_cause: 'Peak-hour traffic volume' }
  };
});

export const GUJARAT_CORRIDORS = [
  { id: 'GJ-AHM-GNR', name: 'Ahmedabad - Gandhinagar Corridor', zones: ['GJ-AHM-01', 'GJ-AHM-02', 'GJ-GNR-03', 'GJ-GNR-04'] },
  { id: 'GJ-VAD-SRT', name: 'Vadodara - Surat Corridor', zones: ['GJ-VAD-05', 'GJ-VAD-06', 'GJ-SRT-07', 'GJ-SRT-08'] },
  { id: 'GJ-SOUR', name: 'Saurashtra Urban Corridor', zones: ['GJ-RAJ-09', 'GJ-BHV-10', 'GJ-JMN-11'] }
];
