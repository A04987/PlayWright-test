import { test, expect } from '@playwright/test';

test.describe('Create Sales Area Page', () => {

  test.beforeEach(async ({ page }) => {
    // 1. ไปหน้ารายการเขตขาย
    await page.goto('/sales-area');

    // 2. ต้องกดปุ่ม "สร้าง" ก่อนถึงเข้าหน้านี้ได้
    await page.getByRole('button', { name: 'สร้าง' }).click();

    // 3. ตรวจสอบว่าเข้าหน้าสร้างแล้ว
    await expect(page).toHaveURL(/create/);
  });

  test('TC-001: ปุ่มสร้างต้อง disabled เมื่อยังไม่กรอกข้อมูล', async ({ page }) => {
    const createButton = page.getByRole('button', { name: 'สร้าง' });

    await expect(createButton).toBeDisabled();
  });

  test('TC-002: กรอกเฉพาะชื่อเขตขาย ปุ่มยัง disabled', async ({ page }) => {
    await page.getByPlaceholder('กรุณาระบุชื่อเขตขาย').fill('เขตกรุงเทพ');

    await expect(
      page.getByRole('button', { name: 'สร้าง' })
    ).toBeDisabled();
  });

  test('TC-003: กรอกเฉพาะรหัสเขตขาย ปุ่มยัง disabled', async ({ page }) => {
    await page.getByPlaceholder('กรุณาระบุรหัสเขตขาย').fill('BKK01');

    await expect(
      page.getByRole('button', { name: 'สร้าง' })
    ).toBeDisabled();
  });

  test('TC-004: กรอกข้อมูลครบ ปุ่มสร้างต้อง enable', async ({ page }) => {
    await page.getByPlaceholder('กรุณาระบุชื่อเขตขาย').fill('เขตกรุงเทพ');
    await page.getByPlaceholder('กรุณาระบุรหัสเขตขาย').fill('BKK01');

    const createButton = page.getByRole('button', { name: 'สร้าง' });

    await expect(createButton).toBeEnabled();
  });

  test('TC-005: เปลี่ยนสถานะ แล้วปุ่มสร้างยังใช้งานได้', async ({ page }) => {
    await page.getByPlaceholder('กรุณาระบุชื่อเขตขาย').fill('เขตเหนือ');
    await page.getByPlaceholder('กรุณาระบุรหัสเขตขาย').fill('NTH01');

    // toggle สถานะ
    await page.getByRole('switch').click();

    await expect(
      page.getByRole('button', { name: 'สร้าง' })
    ).toBeEnabled();
  });

  test('TC_SALES_AREA_006: กดสร้างเมื่อข้อมูลครบ', async ({ page }) => {
    await page.getByPlaceholder('กรุณาระบุชื่อเขตขาย').fill('เขตใต้');
    await page.getByPlaceholder('กรุณาระบุรหัสเขตขาย').fill('STH01');

    await page.getByRole('button', { name: 'สร้าง' }).click();

    await expect(page).toHaveURL(/sales-area/);
    await expect(page.getByText('สร้างเขตขายสำเร็จ')).toBeVisible();
  });
  

  test('TC_SALES_AREA_007: กดปุ่มยกเลิก', async ({ page }) => {
    await page.getByRole('button', { name: 'ยกเลิก' }).click();

    await expect(page).toHaveURL(/sales-area/);
  });

});
