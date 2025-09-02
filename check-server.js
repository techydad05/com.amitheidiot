// check-server.js - Test server functionality
import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

console.log('Starting dev server...');

const server = spawn('npm', ['run', 'dev'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: process.cwd()
});

let serverReady = false;
let hasErrors = false;

server.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('STDOUT:', output);
  
  if (output.includes('ready in')) {
    serverReady = true;
    console.log('✅ Server is ready!');
  }
});

server.stderr.on('data', (data) => {
  const error = data.toString();
  console.error('STDERR:', error);
  hasErrors = true;
});

server.on('error', (error) => {
  console.error('Server error:', error);
  hasErrors = true;
});

// Wait for server to start
await setTimeout(10000);

if (serverReady && !hasErrors) {
  console.log('🎉 Server started successfully!');
  
  // Test a simple HTTP request
  try {
    const response = await fetch('http://localhost:5173/');
    console.log('✅ HTTP request successful, status:', response.status);
  } catch (error) {
    console.error('❌ HTTP request failed:', error.message);
  }
} else if (hasErrors) {
  console.log('❌ Server had errors during startup');
} else {
  console.log('⏰ Server startup timeout');
}

// Clean up
server.kill();
process.exit(0);