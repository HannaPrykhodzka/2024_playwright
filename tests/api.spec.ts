import { test, expect } from '@playwright/test';

test.describe('API tests', () => {

  test('Verify post 100 content', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/100');
    const text = await response.text();
    expect(response.status()).toBe(200);
    // console.log(await response.json());
    expect(text).toContain('"userId": 10,');
    expect(text).toContain('"title": "at nam consequatur ea labore ea harum"');
  });

  test('Verify POST ToDo for User 5', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/users/5/todos', {
        data: {
            "id": 81,
            "title": "todo test",
            "completed": false,
            "userId": 5
        }
    });
    const text = await response.text();
    expect(response.status()).toBe(201);
    // console.log(await response.json());
    expect(text).toContain('"title": "todo test"');
    expect(text).toContain('"completed": false');
  });

  test('Verify PUT todo', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/todos/81', {
        data: {
            "id": 81,
            "title": "todo PUT test",
            "completed": true,
            "userId": 10
        }
    });
    const text = await response.text();
    expect(response.status()).toBe(200);
    // console.log(await response.json());
    expect(text).toContain('"title": "todo PUT test"');
    expect(text).toContain('"completed": true');
  });

});
