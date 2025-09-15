import { Device, DeviceType } from './types';

const TYPES: DeviceType[] = ['android','ios','tv','stb','console','desktop'];

function randomIp() {
  return `10.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}`;
}
function randomOs(type: DeviceType) {
  switch(type) {
    case 'android': return `Android ${9 + Math.floor(Math.random()*6)}`;
    case 'ios':     return `iOS ${13 + Math.floor(Math.random()*6)}`;
    case 'tv':      return `tvOS ${13 + Math.floor(Math.random()*6)}`;
    case 'stb':     return `Linux ${3 + Math.floor(Math.random()*3)}.${Math.floor(Math.random()*10)}`;
    case 'console': return `FW ${1+Math.floor(Math.random()*5)}.${Math.floor(Math.random()*10)}`;
    default:        return `macOS 14.${Math.floor(Math.random()*6)}`;
  }
}

export function generateDevices(count = 250): Device[] {
  const arr: Device[] = [];
  for (let i=0;i<count;i++){
    const type = TYPES[i % TYPES.length];
    arr.push({
      id: `dev-${i.toString().padStart(3,'0')}`,
      type,
      osVersion: randomOs(type),
      label: `${type}-${i}`,
      ip: randomIp(),
      online: true,
      lastSeen: Date.now()
    });
  }
  return arr;
}
