export type DeviceType = 'android' | 'ios' | 'tv' | 'stb' | 'console' | 'desktop';

export interface Session {
  id: string;
  startedAt: number;
  owner?: string;
}

export interface Device {
  id: string;
  type: DeviceType;
  osVersion: string;
  label: string;
  ip: string;        // simulated IP
  online: boolean;   // simulated health
  lastSeen: number;  // epoch ms
  session?: Session;
}
