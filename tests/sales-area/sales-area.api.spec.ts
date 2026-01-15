import { test, expect } from '@playwright/test';


//201=สร้างสำเร็จ
//200= request client
//400= request ผิดพลาด

test.describe('Sales Area - API Only', () => {

  test('API_001: สร้างข้อมูลเขตขายสำเร็จ', async ({ request }) => {
    const res = await request.post('/api/sales-area', {
      data: {
        name: 'เขตเหนือ',
        code: 'NTH01',
        status: true
      }
    });

    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body.name).toBe('เขตเหนือ');
    expect(body.code).toBe('NTH01');
  });

  test('API_002: สร้างข้อมูลเขตขายไม่สำเร็จเมื่อไม่ระบุชื่อ', async ({ request }) => {
    const res = await request.post('/api/sales-area', {
      data: {
        code: 'ERR01'
      }
    });

    expect(res.status()).toBe(400);
  });

  test('API_003: สร้างข้อมูลเขตขายไม่สำเร็จเมื่อไม่ระบุรหัส', async ({ request }) => {
    const res = await request.post('/api/sales-area', {
      data: {
        name: 'เขตใต้'
      }
    });

    expect(res.status()).toBe(400);
  });

});
