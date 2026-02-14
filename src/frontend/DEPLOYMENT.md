# Deployment Guide

This guide covers deploying your application to the Internet Computer.

## Prerequisites

- dfx CLI installed and configured
- Internet Computer wallet with cycles
- Valid canister names (see naming rules below)

## IC Canister Naming Rules

Canister names must follow these strict rules:
- **Length**: 5-50 characters
- **Characters**: lowercase letters (a-z), numbers (0-9), and hyphens (-) only
- **No underscores**: Replace `_` with `-`
- **No uppercase**: Convert to lowercase

### Common Issues

❌ Invalid: `My_App`, `test_canister`, `APP123`  
✅ Valid: `my-app`, `test-canister`, `app123`

## Deployment Steps

### 1. Validate Canister Names

Before deploying, run the validation script:

