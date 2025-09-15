import { readFileSync, writeFileSync } from 'fs';
import { ping } from '../src/health';
import { availability } from '../src/metrics';
import { Device } from '../src/types';

const devices: Device[] = JSON.parse(readFileSync('data/devices.json','utf-8'));
devices.forEach(d=> ping(d));
writeFileSync('data/health-log.json', JSON.stringify({ ts: Date.now(), devices }, null, 2));
console.log('Availability:', availability(devices), '%');
