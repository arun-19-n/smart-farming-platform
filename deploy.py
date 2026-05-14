#!/usr/bin/env python3
"""
SmartFarmAI One-Click Deploy Helper
Generates deployment URLs and instructions for Railway, Vercel, Render.
"""

import sys
import webbrowser
import json
from datetime import datetime

REPO = "https://github.com/arun-19-n/smart-farming-platform"
RAILWAY_URL = "https://railway.app"
VERCEL_URL = "https://vercel.com/import"
RENDER_URL = "https://dashboard.render.com"
NETLIFY_URL = "https://app.netlify.com/start"

def print_header(text):
    print(f"\n{'='*70}")
    print(f"  {text}")
    print(f"{'='*70}\n")

def deploy_railway():
    print_header("🚀 RAILWAY DEPLOYMENT (Recommended)")
    print(f"1. Go to: {RAILWAY_URL}")
    print(f"2. Click 'New Project' → 'Deploy from GitHub'")
    print(f"3. Select: {REPO}")
    print(f"4. Create two services:")
    print(f"   a) Backend: Dockerfile.backend")
    print(f"   b) Frontend: Dockerfile.frontend")
    print(f"5. Set environment variable on frontend:")
    print(f"   VITE_API_URL = https://smartfarmai-backend.railway.app/api")
    print(f"\n✅ Expected URLs:")
    print(f"   Frontend: https://smartfarmai-frontend.railway.app")
    print(f"   Backend:  https://smartfarmai-backend.railway.app")
    input("\nPress Enter to open Railway in browser...")
    webbrowser.open(RAILWAY_URL)

def deploy_vercel():
    print_header("🚀 VERCEL DEPLOYMENT")
    print(f"1. Go to: {VERCEL_URL}")
    print(f"2. Paste GitHub URL: {REPO}")
    print(f"3. Configure:")
    print(f"   Project Name: smartfarmai")
    print(f"   Build Cmd: npm run build")
    print(f"   Output Dir: dist")
    print(f"4. Environment Variable:")
    print(f"   VITE_API_URL = your-backend-url/api")
    print(f"\n✅ Expected URL: https://smartfarmai.vercel.app")
    input("\nPress Enter to open Vercel in browser...")
    webbrowser.open(VERCEL_URL)

def deploy_render():
    print_header("🚀 RENDER DEPLOYMENT")
    print(f"1. Go to: {RENDER_URL}")
    print(f"2. New Web Service → Connect GitHub → {REPO}")
    print(f"3. Backend Service:")
    print(f"   Name: smartfarmai-backend")
    print(f"   Build: npm install --prefix server")
    print(f"   Start: node server/server.js")
    print(f"4. Frontend Service:")
    print(f"   Name: smartfarmai-frontend")
    print(f"   Build: npm run build && npm install -g serve")
    print(f"   Start: serve -s dist -l 3000")
    print(f"5. Env var: VITE_API_URL = https://smartfarmai-backend.onrender.com/api")
    print(f"\n✅ Expected URLs:")
    print(f"   Frontend: https://smartfarmai-frontend.onrender.com")
    print(f"   Backend:  https://smartfarmai-backend.onrender.com")
    input("\nPress Enter to open Render in browser...")
    webbrowser.open(RENDER_URL)

def deploy_netlify():
    print_header("🚀 NETLIFY DEPLOYMENT (Frontend Only)")
    print(f"1. Go to: {NETLIFY_URL}")
    print(f"2. Connect GitHub → {REPO}")
    print(f"3. Build settings:")
    print(f"   Build Cmd: npm run build")
    print(f"   Publish Dir: dist")
    print(f"4. Environment: VITE_API_URL = your-backend-url/api")
    print(f"\n✅ Expected URL: https://smartfarmai.netlify.app")
    input("\nPress Enter to open Netlify in browser...")
    webbrowser.open(NETLIFY_URL)

def main():
    print_header("SmartFarmAI Deploy Helper")
    print("Select a deployment platform:\n")
    print("1. Railway    (Recommended - All-in-one)")
    print("2. Vercel     (Frontend) + Render (Backend)")
    print("3. Render     (Both services)")
    print("4. Netlify    (Frontend only)")
    print("5. Docker     (Local testing)\n")
    
    choice = input("Enter choice (1-5): ").strip()
    
    if choice == "1":
        deploy_railway()
    elif choice == "2":
        deploy_vercel()
    elif choice == "3":
        deploy_render()
    elif choice == "4":
        deploy_netlify()
    elif choice == "5":
        print_header("🐳 DOCKER COMPOSE (Local)")
        print("Run: docker-compose up")
        print("Frontend: http://localhost:3000")
        print("Backend:  http://localhost:3001")
    else:
        print("❌ Invalid choice")
        sys.exit(1)

if __name__ == "__main__":
    main()
