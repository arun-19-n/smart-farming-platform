#!/bin/bash
# SmartFarmAI Deploy Script for Bash/Zsh

TARGET=${1:-railway}

case "$TARGET" in
  railway)
    echo "🚀 Railway Deployment"
    echo "Visit: https://railway.app"
    echo "Import GitHub repo: https://github.com/arun-19-n/smart-farming-platform"
    echo "Backend Dockerfile: Dockerfile.backend"
    echo "Frontend Dockerfile: Dockerfile.frontend"
    ;;
  vercel)
    echo "🚀 Vercel Deployment"
    echo "Visit: https://vercel.com/import"
    echo "Project Name: smartfarmai"
    echo "GitHub: https://github.com/arun-19-n/smart-farming-platform"
    ;;
  render)
    echo "🚀 Render Deployment"
    echo "Visit: https://dashboard.render.com"
    echo "Import GitHub repo: https://github.com/arun-19-n/smart-farming-platform"
    ;;
  *)
    echo "Usage: $0 {railway|vercel|render}"
    exit 1
    ;;
esac
