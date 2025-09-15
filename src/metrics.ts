import { Device } from './types';

export function availability(devs: Device[]): number {
  const up = devs.filter(d => d.online).length;
  return Math.round((up/devs.length)*10000)/100; // percentage with 2 decimals
}

export function activeSessions(devs: Device[]): number {
  return devs.filter(d => d.session).length;
}
