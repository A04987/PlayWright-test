import { test, expect } from '@playwright/test';


// describe ใช้จัดกลุ่ม test
test.describe('Login Feature', () => {
test('Login สำเร็จ', async ({ page }) => {
await page.goto('https://example.com/login');
});


test('Login ไม่สำเร็จ', async ({ page }) => {
await page.goto('https://example.com/login');
});

});