#!/bin/bash

# Strict error handling
set -euo pipefail

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Error trap handler
error_handler() {
    local line_number=$1
    echo ""
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}Deployment failed at line ${line_number}${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo -e "${YELLOW}Common issues and solutions:${NC}"
    echo ""
    echo -e "${YELLOW}1. Invalid naming (underscores in canister names):${NC}"
    echo -e "   ${NC}Fix: Edit dfx.json and replace underscores with hyphens${NC}"
    echo -e "   ${NC}Example: 'gen-z-nexus-solution' instead of 'gen-z_nexus_solution'${NC}"
    echo -e "   ${NC}Then delete canister_ids.json and rerun this script${NC}"
    echo ""
    echo -e "${YELLOW}2. Network connectivity issues:${NC}"
    echo -e "   ${NC}Check your internet connection and try again${NC}"
    echo ""
    echo -e "${YELLOW}3. Insufficient cycles:${NC}"
    echo -e "   ${NC}Ensure your wallet has enough cycles for deployment${NC}"
    echo ""
    echo -e "${YELLOW}After fixing the issue, rerun:${NC}"
    echo -e "   ${GREEN}bash frontend/scripts/retry-deploy.sh${NC}"
    echo ""
    exit 1
}

# Set up error trap
trap 'error_handler ${LINENO}' ERR

echo ""
echo -e "${BLUE}==========================================${NC}"
echo -e "${BLUE}Deterministic Deployment Retry${NC}"
echo -e "${BLUE}==========================================${NC}"
echo ""

# Step 0: Validate naming
echo -e "${BLUE}Step 0: Validating deployment names...${NC}"
echo -e "${BLUE}==========================================${NC}"
if command -v node &> /dev/null; then
    node frontend/scripts/validate-deploy-names.mjs
    echo -e "${GREEN}✓ Name validation passed${NC}"
else
    echo -e "${YELLOW}⚠ Node.js not found, skipping preflight validation${NC}"
fi
echo ""

# Step 1: Clean frontend artifacts
echo -e "${BLUE}Step 1: Cleaning frontend build artifacts...${NC}"
echo -e "${BLUE}==========================================${NC}"
if [ -d "frontend/dist" ]; then
    rm -rf frontend/dist
    echo -e "${GREEN}✓ Removed frontend/dist${NC}"
fi
if [ -d "frontend/node_modules/.vite" ]; then
    rm -rf frontend/node_modules/.vite
    echo -e "${GREEN}✓ Removed frontend/node_modules/.vite${NC}"
fi
echo -e "${GREEN}✓ Frontend artifacts cleaned${NC}"
echo ""

# Step 2: Clean dfx state (optional but recommended)
echo -e "${BLUE}Step 2: Cleaning dfx local state...${NC}"
echo -e "${BLUE}==========================================${NC}"
if [ -d ".dfx" ]; then
    echo -e "${YELLOW}Found .dfx directory, cleaning...${NC}"
    rm -rf .dfx
    echo -e "${GREEN}✓ dfx state cleaned${NC}"
else
    echo -e "${YELLOW}No .dfx directory found, skipping${NC}"
fi
echo ""

# Step 3: Deploy
echo -e "${BLUE}Step 3: Running deployment...${NC}"
echo -e "${BLUE}==========================================${NC}"
dfx deploy
echo -e "${BLUE}==========================================${NC}"
echo ""

# Success message
echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
echo -e "${GREEN}==========================================${NC}"
echo ""
echo -e "${GREEN}Next steps:${NC}"
echo -e "  ${NC}• Test your application in the browser${NC}"
echo -e "  ${NC}• Verify all features work as expected${NC}"
echo -e "  ${NC}• Check the deployment URLs in the output above${NC}"
echo ""
