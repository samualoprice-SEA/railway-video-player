import { writeFileSync, mkdirSync } from 'fs';
import { generateDevices } from '../src/devices';

mkdirSync('data', { recursive: true });
const devices = generateDevices(250);
writeFileSync('data/devices.json', JSON.stringify(devices, null, 2));
console.log('Seeded data/devices.json with', devices.length, 'devices');
