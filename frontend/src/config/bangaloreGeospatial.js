/**
 * Frontend Bangalore Geospatial Intelligence Configuration
 * Provides Bangalore geographic bounds, landmark coordinates, visual categories, and color palettes.
 */

export const BANGALORE_CENTER = {
  lat: 22.2587,
  lng: 71.1924,
  zoom: 7
};

export const CONGESTION_CATEGORIES = {
  GREEN: {
    label: 'Normal Flow',
    colorHex: '#10B981',
    bgClass: 'bg-emerald-500',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-300',
    minSpeed: 35,
    description: 'Free flow conditions (> 35 km/h)'
  },
  YELLOW: {
    label: 'Moderate Traffic',
    colorHex: '#F59E0B',
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-300',
    minSpeed: 25,
    description: 'Slowing traffic (25-35 km/h)'
  },
  ORANGE: {
    label: 'Heavy Congestion',
    colorHex: '#F97316',
    bgClass: 'bg-orange-500',
    textClass: 'text-orange-700',
    borderClass: 'border-orange-300',
    minSpeed: 15,
    description: 'Heavy volume backlog (15-25 km/h)'
  },
  RED: {
    label: 'Severe Congestion',
    colorHex: '#EF4444',
    bgClass: 'bg-red-500',
    textClass: 'text-red-700',
    borderClass: 'border-red-300',
    minSpeed: 8,
    description: 'Severe bottleneck & queueing (8-15 km/h)'
  },
  DARK_RED: {
    label: 'Critical Gridlock Hotspot',
    colorHex: '#881337',
    bgClass: 'bg-rose-950',
    textClass: 'text-rose-900',
    borderClass: 'border-rose-800',
    minSpeed: 0,
    description: 'Critical gridlock (< 8 km/h) / Multi-Incident block'
  }
};

export const BANGALORE_LANDMARKS = [
  { id: 'GJ-AHM-01', name: 'S.G. Highway - Thaltej, Ahmedabad', lat: 23.0507, lng: 72.5110, defaultLevel: 'DARK_RED' },
  { id: 'GJ-AHM-02', name: 'Ashram Road - Income Tax Circle, Ahmedabad', lat: 23.0365, lng: 72.5684, defaultLevel: 'RED' },
  { id: 'GJ-GNR-03', name: 'Infocity Circle, Gandhinagar', lat: 23.2156, lng: 72.6369, defaultLevel: 'ORANGE' },
  { id: 'GJ-GNR-04', name: 'Akshardham Road, Gandhinagar', lat: 23.2168, lng: 72.6470, defaultLevel: 'YELLOW' },
  { id: 'GJ-VAD-05', name: 'Alkapuri, Vadodara', lat: 22.3100, lng: 73.1700, defaultLevel: 'ORANGE' },
  { id: 'GJ-VAD-06', name: 'Sama Savli Road, Vadodara', lat: 22.3410, lng: 73.1810, defaultLevel: 'YELLOW' },
  { id: 'GJ-SRT-07', name: 'Athwa Gate, Surat', lat: 21.1858, lng: 72.8095, defaultLevel: 'RED' },
  { id: 'GJ-SRT-08', name: 'Varachha Road, Surat', lat: 21.2134, lng: 72.8755, defaultLevel: 'ORANGE' },
  { id: 'GJ-RAJ-09', name: 'Kalawad Road, Rajkot', lat: 22.3039, lng: 70.8022, defaultLevel: 'YELLOW' },
  { id: 'GJ-BHV-10', name: 'Ghogha Circle, Bhavnagar', lat: 21.7645, lng: 72.1519, defaultLevel: 'GREEN' },
  { id: 'GJ-JMN-11', name: 'Bedi Road, Jamnagar', lat: 22.4707, lng: 70.0577, defaultLevel: 'RED' },
  { id: 'GJ-BRC-12', name: 'Zadeshwar Chowkdi, Bharuch', lat: 21.7051, lng: 72.9959, defaultLevel: 'GREEN' }
];
