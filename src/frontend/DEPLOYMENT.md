# Deployment Guide

This guide provides step-by-step instructions for deploying your application to the Internet Computer.

## Prerequisites

Before deploying, ensure you have:

1. **dfx installed**: The DFINITY Canister SDK
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

2. **Node.js and npm**: For building the frontend
   ```bash
   node --version  # Should be v18 or higher
   npm --version
   ```

3. **Cycles**: Sufficient cycles in your wallet for deployment
   - For local development: Not required
   - For mainnet: You'll need cycles (ICP tokens converted to cycles)

## Internet Computer Naming Rules

**IMPORTANT**: All canister names must follow these rules:

- **Length**: 5-50 characters
- **Allowed characters**: lowercase letters (a-z), numbers (0-9), hyphens (-)
- **NOT allowed**: underscores (_), uppercase letters, special characters

### Example of Valid Names
✓ `gen-z-nexus-solution`
✓ `my-app-backend`
✓ `frontend-canister`

### Example of Invalid Names
✗ `gen-z_nexus_solution` (contains underscore)
✗ `My-App` (contains uppercase)
✗ `app` (too short, less than 5 characters)

## Standard Deployment

For a clean, first-time deployment:

