import { Device } from './types';

// Simulate ping with ~5% failure rate
export function ping(d: Device): boolean {
  const fail = Math.random() < 0.05;
  if (!fail) d.lastSeen = Date.now();
  d.online = !fail;
  return d.online;
}
