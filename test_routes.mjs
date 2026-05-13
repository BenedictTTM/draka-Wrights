import fs from 'fs';

const BASE_URL = 'http://localhost:3000/api';

const mockAdminCookie = 'admin-session=' + encodeURIComponent(JSON.stringify({ email: "tester@example.com", name: "Tester" }));
const headers = {
  'Content-Type': 'application/json',
  'Cookie': mockAdminCookie
};

const REQUEST_TIMEOUT_MS = 10000;

async function runTests() {
  console.log("=== Starting API Tests ===");
  let passed = 0;
  let failed = 0;

  async function test(name, fetchPromise) {
    try {
      const start = Date.now();
      process.stdout.write(`Testing ${name}... `);
      const res = await fetchPromise;
      if (!res.ok) {
        const text = await res.text();
        console.log(`❌ FAILED (${res.status}) (${Date.now() - start}ms)\n   ${text}`);
        failed++;
      } else {
        const json = await res.json();
        console.log(`✅ PASSED (${Date.now() - start}ms)`);
        passed++;
        return json;
      }
    } catch (err) {
      console.log(`❌ FAILED (Network/Error)\n   ${err.message}`);
      failed++;
    }
  }

  function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    return fetch(url, { ...options, signal: controller.signal })
      .finally(() => clearTimeout(timeoutId));
  }

  await test('GET /settings/general', fetchWithTimeout(`${BASE_URL}/settings/general`, { headers }));
  await test('PATCH /settings/general', fetchWithTimeout(`${BASE_URL}/settings/general`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ orgName: "Test Org" })
  }));

  const newUser = await test('POST /users', fetchWithTimeout(`${BASE_URL}/users`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email: `test_${Date.now()}@test.com`, password: "pwd", name: "Test User" })
  }));

  await test('GET /users', fetchWithTimeout(`${BASE_URL}/users`, { headers }));

  if (newUser && newUser.id) {
    await test('PATCH /users/[id]', fetchWithTimeout(`${BASE_URL}/users/${newUser.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status: "Inactive" })
    }));
    await test('DELETE /users/[id]', fetchWithTimeout(`${BASE_URL}/users/${newUser.id}`, {
      method: 'DELETE',
      headers
    }));
  }

  await test('GET /search', fetchWithTimeout(`${BASE_URL}/search?q=test`, { headers }));

  await test('GET /notifications', fetchWithTimeout(`${BASE_URL}/notifications`, { headers }));

  const sessions = await test('GET /chat/sessions', fetchWithTimeout(`${BASE_URL}/chat/sessions`, { headers }));
  
  if (sessions && sessions.length > 0) {
    const threadId = sessions[0].id;
    await test('GET /chat/[threadId]', fetchWithTimeout(`${BASE_URL}/chat/${threadId}`, { headers }));
    await test('POST /chat/[threadId]', fetchWithTimeout(`${BASE_URL}/chat/${threadId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content: "This is a test message", is_internal: true })
    }));
  } else {
    console.log("⚠️ Skipping Chat thread tests (No active reports found in DB)");
  }

  console.log(`\n=== Tests Completed: ${passed} Passed, ${failed} Failed ===`);
}

runTests();
