import { test, expect } from '@playwright/test';

test('device session lifecycle + metrics', async ({ request, baseURL }) => {
  const list = await request.get(`${baseURL}/api/devices`);
  expect(list.ok()).toBeTruthy();
  const devices = await list.json() as any[];
  expect(devices.length).toBeGreaterThan(100);

  const id = devices[0].id;

  // start session
  let r = await request.post(`${baseURL}/api/devices/${id}/session/start`, { data: { owner: 'ci' } });
  expect(r.ok()).toBeTruthy();

  // run health
  r = await request.post(`${baseURL}/api/health/run`);
  expect(r.ok()).toBeTruthy();
  const stats = await r.json();
  expect(stats.availability).toBeGreaterThan(80);

  // stop session
  r = await request.post(`${baseURL}/api/devices/${id}/session/stop`);
  expect(r.ok()).toBeTruthy();

  // metrics
  r = await request.get(`${baseURL}/api/metrics`);
  expect(r.ok()).toBeTruthy();
  const m = await r.json();
  expect(m.activeSessions).toBeGreaterThanOrEqual(0);
});
