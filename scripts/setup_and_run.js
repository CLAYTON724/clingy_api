const { spawn } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
};

console.log(`${colors.yellow}Starting Clingy API HR Portal...${colors.reset}\n`);

// Start Django backend
console.log(`${colors.blue}Starting Django backend on http://localhost:8000${colors.reset}`);
const djangoProcess = spawn('python', ['manage.py', 'runserver', '0.0.0.0:8000'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: true,
});

// Wait a bit then start the frontend
setTimeout(() => {
  console.log(`\n${colors.blue}Starting Next.js frontend on http://localhost:3000${colors.reset}\n`);
  const nextProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '..', 'frontend'),
    stdio: 'inherit',
    shell: true,
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log(`\n${colors.yellow}Shutting down servers...${colors.reset}`);
    djangoProcess.kill();
    nextProcess.kill();
    process.exit(0);
  });
}, 3000);

// Log URLs when ready
setTimeout(() => {
  console.log(`\n${colors.green}✓ Application is ready!${colors.reset}`);
  console.log(`${colors.green}✓ Frontend: http://localhost:3000${colors.reset}`);
  console.log(`${colors.green}✓ API: http://localhost:8000/api${colors.reset}\n`);
}, 5000);
