#!/usr/bin/env node

/**
 * Preflight validation script for Internet Computer deployment naming rules.
 * 
 * IC naming requirements:
 * - Length: 5-50 characters
 * - Characters: lowercase letters (a-z), numbers (0-9), and hyphens (-) only
 * - No underscores allowed
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateName(name, context) {
  const errors = [];
  
  // Check length
  if (name.length < 5 || name.length > 50) {
    errors.push(`Length must be between 5 and 50 characters (current: ${name.length})`);
  }
  
  // Check for underscores
  if (name.includes('_')) {
    errors.push('Underscores are not allowed (use hyphens instead)');
  }
  
  // Check for invalid characters
  const validPattern = /^[a-z0-9-]+$/;
  if (!validPattern.test(name)) {
    errors.push('Only lowercase letters (a-z), numbers (0-9), and hyphens (-) are allowed');
  }
  
  // Check for uppercase letters specifically
  if (/[A-Z]/.test(name)) {
    errors.push('Uppercase letters are not allowed (use lowercase only)');
  }
  
  return { valid: errors.length === 0, errors };
}

function checkDfxJson() {
  const dfxJsonPath = join(projectRoot, 'dfx.json');
  
  if (!existsSync(dfxJsonPath)) {
    log('Warning: dfx.json not found, skipping validation', 'yellow');
    return true;
  }
  
  try {
    const dfxConfig = JSON.parse(readFileSync(dfxJsonPath, 'utf8'));
    let hasErrors = false;
    
    log('\nValidating dfx.json canister names...', 'blue');
    
    if (dfxConfig.canisters) {
      for (const [canisterName, config] of Object.entries(dfxConfig.canisters)) {
        const result = validateName(canisterName, `Canister name`);
        
        if (!result.valid) {
          hasErrors = true;
          log(`\n✗ Invalid canister name: "${canisterName}"`, 'red');
          result.errors.forEach(error => log(`  - ${error}`, 'red'));
          log(`\n  Fix: Rename this canister in dfx.json to use only lowercase letters, numbers, and hyphens.`, 'yellow');
          log(`  Example: "gen-z-nexus-solution" instead of "gen-z_nexus_solution"`, 'yellow');
        } else {
          log(`✓ Canister name "${canisterName}" is valid`, 'green');
        }
      }
    }
    
    return !hasErrors;
  } catch (error) {
    log(`Error reading dfx.json: ${error.message}`, 'red');
    return false;
  }
}

function checkCanisterIds() {
  const canisterIdsPath = join(projectRoot, 'canister_ids.json');
  
  if (!existsSync(canisterIdsPath)) {
    log('\nNo canister_ids.json found (this is normal for first deployment)', 'blue');
    return true;
  }
  
  try {
    const canisterIds = JSON.parse(readFileSync(canisterIdsPath, 'utf8'));
    let hasErrors = false;
    
    log('\nValidating canister_ids.json...', 'blue');
    
    for (const [canisterName] of Object.entries(canisterIds)) {
      const result = validateName(canisterName, `Canister ID entry`);
      
      if (!result.valid) {
        hasErrors = true;
        log(`\n✗ Invalid canister name in canister_ids.json: "${canisterName}"`, 'red');
        result.errors.forEach(error => log(`  - ${error}`, 'red'));
        log(`\n  Fix: This file is auto-generated. Fix the name in dfx.json and delete canister_ids.json, then redeploy.`, 'yellow');
      } else {
        log(`✓ Canister ID entry "${canisterName}" is valid`, 'green');
      }
    }
    
    return !hasErrors;
  } catch (error) {
    log(`Error reading canister_ids.json: ${error.message}`, 'red');
    return false;
  }
}

// Main execution
log('\n========================================', 'blue');
log('IC Deployment Name Validation', 'blue');
log('========================================\n', 'blue');

log('Internet Computer naming rules:', 'blue');
log('  • Length: 5-50 characters', 'blue');
log('  • Allowed: lowercase letters (a-z), numbers (0-9), hyphens (-)', 'blue');
log('  • NOT allowed: underscores (_), uppercase letters, special characters\n', 'blue');

const dfxJsonValid = checkDfxJson();
const canisterIdsValid = checkCanisterIds();

log('\n========================================', 'blue');

if (dfxJsonValid && canisterIdsValid) {
  log('✓ All deployment names are valid!', 'green');
  log('========================================\n', 'blue');
  process.exit(0);
} else {
  log('✗ Validation failed!', 'red');
  log('========================================\n', 'blue');
  log('Next steps:', 'yellow');
  log('  1. Fix the invalid names in dfx.json (replace underscores with hyphens)', 'yellow');
  log('  2. Delete canister_ids.json if it exists', 'yellow');
  log('  3. Run: bash frontend/scripts/retry-deploy.sh', 'yellow');
  log('', 'reset');
  process.exit(1);
}
