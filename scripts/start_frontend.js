#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const frontendDir = path.join(__dirname, '../frontend');

console.log('[Frontend Setup] Installing dependencies...');

// First install dependencies
const npm = spawn('npm', ['install'], {
  cwd: frontendDir,
  stdio: 'inherit',
});

npm.on('close', (code) => {
  if (code !== 0) {
    console.error(`[Frontend Setup] npm install failed with code ${code}`);
    process.exit(1);
  }

  console.log('\n[Frontend Setup] Starting Next.js development server on port 3000...');
  console.log('[Frontend Setup] Server will be available at http://localhost:3000');
  console.log('=====================================\n');

  // Then start the dev server
  const nextDev = spawn('npm', ['run', 'dev'], {
    cwd: frontendDir,
    stdio: 'inherit',
  });

  nextDev.on('close', (code) => {
    process.exit(code);
  });
});
