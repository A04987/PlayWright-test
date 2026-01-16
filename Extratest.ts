// testWithExtras.ts
import { test as base, expect } from '@playwright/test'; // ✅ จาก Playwright

export const test = base.extend({
  apiLogger: async ({ page }, use, testInfo) => {
    page.on('response', async (res) => {
      if (res.url().includes('/api') && res.status() >= 400) {
        const body = await res.text();

        await testInfo.attach('API Failure', {
          contentType: 'application/json',
          body: JSON.stringify(
            {
              url: res.url(),
              status: res.status(),
              response: body,
            },
            null,
            2
          ),
        });
      }
    });

    await use(null);
  },
});

export { expect }; // re-export ให้ใช้เหมือนเดิม
