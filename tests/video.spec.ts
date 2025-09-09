import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('video renders and plays', async ({ page }) => {
  await page.goto('/');

  const video = page.locator('video#player');
  await expect(video).toBeVisible();

  // Wait for metadata so duration/currentTime are available
  await page.waitForFunction(() => {
    const v = document.querySelector('video#player') as HTMLVideoElement | null;
    return !!v && !isNaN(v.duration) && v.duration > 0;
  }, { timeout: 45000 });

  // Improve autoplay reliability in headless
  await page.evaluate(() => {
    const v = document.querySelector('video#player') as HTMLVideoElement;
    v.muted = true;
    return v.play();
  });

  const t0 = await page.evaluate(() => {
    const v = document.querySelector('video#player') as HTMLVideoElement;
    return v.currentTime;
  });

  // Wait up to ~3s for time to advance
  let advanced = false;
  for (let i = 0; i < 6; i++) {
    await page.waitForTimeout(500);
    const t1 = await page.evaluate(() => {
      const v = document.querySelector('video#player') as HTMLVideoElement;
      return v.currentTime;
    });
    if (t1 > t0) { advanced = true; break; }
  }
  expect(advanced).toBeTruthy();
});
