import { defineConfig, devices } from '@playwright/test';

/**
 * ดูรายละเอียดการตั้งค่าเพิ่มเติมได้ที่:
 * https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 1. ระบุโฟลเดอร์ที่เก็บไฟล์ Test (ย้ายไฟล์ .spec.ts ไปไว้ที่นี่)
  testDir: './tests',

  // 2. รัน Test พร้อมกันหลายอันเพื่อความรวดเร็ว
  fullyParallel: true,

  // 3. ถ้า Test พังใน CI ให้ลองรันใหม่ได้สูงสุด 2 ครั้ง
  retries: process.env.CI ? 1 : 0,

  // 4. จำกัดจำนวนคนช่วยรัน (Workers)
  workers: process.env.CI ? 1 : undefined,


  // 5. รูปแบบ Report (เปิดดูใน Browser ได้)
  reporter: [
    ['html'],                                                    // 1. HTML Report
    ['json', { outputFile: 'test-results/results.json' }],      // 2. JSON
    ['junit', { outputFile: 'test-results/results.xml' }],      // 3. XML
  ],

  // 6. การตั้งค่าพื้นฐานสำหรับทุกลำดับการทดสอบ
  use: {
    // กำหนด URL เริ่มต้น (Base URL) จะได้ไม่ต้องพิมพ์ยาวๆ ใน page.goto()
    baseURL: 'http://localhost:3000',

    // เก็บวิดีโอหรือรูปภาพเมื่อ Test พัง
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // 7. เลือก Browser ที่ต้องการรัน
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* สำหรับทดสอบบนมือถือ (Optional) */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],
});