import { Device } from './types';

export function startSession(d: Device, owner = 'automation'): Device {
  if (!d.session) {
    d.session = {
      id: `sess-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      startedAt: Date.now(),
      owner
    };
  }
  return d;
}

export function stopSession(d: Device): Device {
  if (d.session) delete d.session;
  return d;
}

export function reboot(d: Device): Device {
  // simulate a short reboot
  d.online = false;
  setTimeout(() => {
    d.online = true;
    d.lastSeen = Date.now();
  }, 500);
  return d;
}
