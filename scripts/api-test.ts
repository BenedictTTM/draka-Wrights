import 'dotenv/config';

// --- Configuration ---
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const AUTH_TOKEN = process.env.AUTH_TOKEN || '';

// --- ANSI Colors for Terminal ---
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31;1m',
  green: '\x1b[32;1m',
  yellow: '\x1b[33;1m',
  cyan: '\x1b[36;1m',
  gray: '\x1b[90m',
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface TestCase {
  name: string;
  method: HttpMethod;
  endpoint: string;
  body?: any;
  expectedStatus: number;
}

// --- Define Test Cases Here ---
const tests: TestCase[] = [
  { name: 'Check Settings', method: 'GET', endpoint: '/api/settings/general', expectedStatus: 200 },
  { name: 'Check Users', method: 'GET', endpoint: '/api/users', expectedStatus: 200 },
  { name: 'Check Setup Status', method: 'GET', endpoint: '/api/setup', expectedStatus: 200 },
  { 
    name: 'Invalid Route Should 404', 
    method: 'GET', 
    endpoint: '/api/does-not-exist', 
    expectedStatus: 404 
  },
  { 
    name: 'Failing Auth Login Without Body', 
    method: 'POST', 
    endpoint: '/api/auth/login', 
    expectedStatus: 400 
  },
];

async function runTests() {
  console.log(`${colors.cyan}🚀 Starting API Tests against ${BASE_URL}...${colors.reset}\n`);
  
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const url = `${BASE_URL}${test.endpoint}`;
    
    // Setup Headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (AUTH_TOKEN) {
      headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
    }

    try {
      const startTime = performance.now();
      
      // Execute Request
      const response = await fetch(url, {
        method: test.method,
        headers,
        body: test.body ? JSON.stringify(test.body) : undefined,
      });
      
      const endTime = performance.now();
      const durationMs = (endTime - startTime).toFixed(2);
      
      // Verify Status Code
      if (response.status === test.expectedStatus) {
        console.log(`${colors.green}[PASS]${colors.reset} ${colors.yellow}${test.method.padEnd(6)}${colors.reset} ${test.endpoint.padEnd(30)} - Status ${response.status} ${colors.gray}(${durationMs}ms)${colors.reset}`);
        passed++;
      } else {
        console.log(`${colors.red}[FAIL]${colors.reset} ${colors.yellow}${test.method.padEnd(6)}${colors.reset} ${test.endpoint.padEnd(30)} - Expected ${test.expectedStatus}, got ${response.status} ${colors.gray}(${durationMs}ms)${colors.reset}`);
        failed++;
        
        try {
            const errorBody = await response.text();
            console.log(`       ${colors.gray}Response: ${errorBody.substring(0, 200)}${colors.reset}`);
        } catch(e) {}
      }
    } catch (error: any) {
      console.log(`${colors.red}[ERROR]${colors.reset} ${test.method.padEnd(6)} ${test.endpoint} - Network Error: ${error.message}`);
      failed++;
    }
  }

  // --- Print Summary ---
  console.log(`\n${colors.cyan}--- Test Summary ---${colors.reset}`);
  console.log(`${colors.green}✅ Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${failed}${colors.reset}`);
  
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
