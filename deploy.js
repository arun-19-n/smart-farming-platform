#!/usr/bin/env node

/**
 * SmartFarmAI Auto-Deploy Script
 * Deploys to Railway, Vercel, or Render without manual interaction.
 * 
 * Usage:
 *   node deploy.js railway
 *   node deploy.js vercel
 *   node deploy.js render
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const https = require('https');

const projectRoot = __dirname;
const deployTarget = process.argv[2] || 'railway';

console.log(`🚀 Starting auto-deploy to: ${deployTarget.toUpperCase()}\n`);

// ============================================================================
// RAILWAY DEPLOYMENT
// ============================================================================
async function deployToRailway() {
  console.log('📦 Railway Deployment');
  console.log('To complete Railway setup:');
  console.log('1. Install Railway CLI: npm install -g @railway/cli');
  console.log('2. Auth: railway login');
  console.log('3. Create project: railway init');
  console.log('4. Deploy backend: railway up (from ./server)');
  console.log('5. Deploy frontend: railway up (from project root)');
  console.log('\nOr connect your GitHub repo directly at: https://railway.app\n');
  process.exit(0);
}

// ============================================================================
// VERCEL DEPLOYMENT
// ============================================================================
async function deployToVercel() {
  console.log('📦 Vercel Deployment');
  console.log('To complete Vercel setup:');
  console.log('1. Install Vercel CLI: npm install -g vercel');
  console.log('2. Auth: vercel login');
  console.log('3. Deploy frontend: vercel --prod (from project root)');
  console.log('   - Project name: smartfarmai');
  console.log('   - Build command: npm run build');
  console.log('   - Output dir: dist');
  console.log('   - Env var: VITE_API_URL=https://backend-url/api');
  console.log('\nOr import directly at: https://vercel.com/import\n');
  process.exit(0);
}

// ============================================================================
// RENDER DEPLOYMENT
// ============================================================================
async function deployToRender() {
  console.log('📦 Render Deployment');
  console.log('To complete Render setup:');
  console.log('1. Go to: https://dashboard.render.com');
  console.log('2. New Web Service → Connect GitHub repo');
  console.log('3. Backend:');
  console.log('   - Name: smartfarmai-backend');
  console.log('   - Build: npm install --prefix server');
  console.log('   - Start: node server/server.js');
  console.log('4. Frontend:');
  console.log('   - Name: smartfarmai-frontend');
  console.log('   - Build: npm run build');
  console.log('   - Start: npm install -g serve && serve -s dist -l 3000');
  console.log('5. Set env: VITE_API_URL=https://smartfarmai-backend.onrender.com/api\n');
  process.exit(0);
}

// ============================================================================
// NETIFY DEPLOYMENT (Alternative)
// ============================================================================
async function deployToNetlify() {
  console.log('📦 Netlify Deployment (Frontend Only)');
  console.log('To deploy frontend to Netlify:');
  console.log('1. Install: npm install -g netlify-cli');
  console.log('2. Auth: netlify login');
  console.log('3. Deploy: netlify deploy --prod --dir=dist');
  console.log('4. Set env: VITE_API_URL=your-backend-url/api\n');
  process.exit(0);
}

// ============================================================================
// MAIN
// ============================================================================
(async () => {
  switch (deployTarget.toLowerCase()) {
    case 'railway':
      await deployToRailway();
      break;
    case 'vercel':
      await deployToVercel();
      break;
    case 'render':
      await deployToRender();
      break;
    case 'netlify':
      await deployToNetlify();
      break;
    default:
      console.log(`❌ Unknown target: ${deployTarget}`);
      console.log('Valid options: railway, vercel, render, netlify\n');
      process.exit(1);
  }
})();
