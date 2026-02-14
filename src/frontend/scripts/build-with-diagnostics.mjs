#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runStep(stepName, command) {
  log(`\n${'='.repeat(60)}`, 'blue');
  log(`${stepName}`, 'blue');
  log(`${'='.repeat(60)}\n`, 'blue');
  
  try {
    execSync(command, {
      cwd: projectRoot,
      stdio: 'inherit',
      env: { ...process.env }
    });
    log(`\n✓ ${stepName} completed successfully\n`, 'green');
  } catch (error) {
    log(`\n✗ ${stepName} FAILED\n`, 'red');
    log(`Error: ${error.message}\n`, 'red');
    log(`Troubleshooting steps:`, 'yellow');
    log(`  1. Check the error output above for specific details`, 'yellow');
    log(`  2. If you see naming validation errors, fix canister names in dfx.json`, 'yellow');
    log(`     (replace underscores with hyphens)`, 'yellow');
    log(`  3. Run: bash frontend/scripts/retry-deploy.sh\n`, 'yellow');
    process.exit(1);
  }
}

log('\nStarting Frontend Build with Diagnostics\n', 'blue');

// Step 1: TypeScript type checking
runStep(
  'TypeScript Type Check',
  'cd frontend && npm run typescript-check'
);

// Step 2: Vite build
runStep(
  'Vite Bundle Build',
  'cd frontend && npm run build:skip-bindings'
);

log('\n✓ All build steps completed successfully!\n', 'green');
