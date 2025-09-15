import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { Device } from './types';
import { startSession, stopSession, reboot } from './controller';
import { ping } from './health';
import { availability, activeSessions } from './metrics';

const app = express();
app.use(cors());
app.use(express.json());

// load materialized device list
let devices: Device[] = JSON.parse(readFileSync('data/devices.json','utf-8'));

// list
app.get('/api/devices', (_req,res)=> res.json(devices));

// get by id
app.get('/api/devices/:id', (req,res)=>{
  const d = devices.find(x=>x.id===req.params.id);
  if (!d) return res.status(404).json({error:'not found'});
  res.json(d);
});

// start/stop session
app.post('/api/devices/:id/session/start', (req,res)=>{
  const d = devices.find(x=>x.id===req.params.id);
  if (!d) return res.status(404).json({error:'not found'});
  startSession(d, req.body?.owner);
  res.json(d);
});
app.post('/api/devices/:id/session/stop', (req,res)=>{
  const d = devices.find(x=>x.id===req.params.id);
  if (!d) return res.status(404).json({error:'not found'});
  stopSession(d);
  res.json(d);
});

// reboot
app.post('/api/devices/:id/reboot', (req,res)=>{
  const d = devices.find(x=>x.id===req.params.id);
  if (!d) return res.status(404).json({error:'not found'});
  reboot(d);
  res.json({status:'rebooting'});
});

// run a health pass over all devices
app.post('/api/health/run', (_req,res)=>{
  devices.forEach(d=> ping(d));
  writeFileSync('data/health-log.json', JSON.stringify({ ts: Date.now(), devices }, null, 2));
  res.json({ ok: true, availability: availability(devices), activeSessions: activeSessions(devices) });
});

// metrics
app.get('/api/metrics', (_req,res)=>{
  res.json({
    ts: Date.now(),
    availability: availability(devices),
    activeSessions: activeSessions(devices)
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Device Lab API on http://localhost:${PORT}`));
