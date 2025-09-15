import { readFileSync, writeFileSync } from 'fs';
import { Device } from '../src/types';
import { startSession, stopSession } from '../src/controller';

const devices: Device[] = JSON.parse(readFileSync('data/devices.json','utf-8'));
const sample = devices.slice(0, 20);
sample.forEach(d=> startSession(d, 'demo'));
writeFileSync('data/devices.json', JSON.stringify(devices, null, 2));
console.log('Started sessions on', sample.length, 'devices');

setTimeout(()=>{
  sample.forEach(d=> stopSession(d));
  writeFileSync('data/devices.json', JSON.stringify(devices, null, 2));
  console.log('Stopped sessions on', sample.length, 'devices');
}, 1000);
