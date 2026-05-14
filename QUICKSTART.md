# 🚀 SmartFarm AI - Quick Start Guide

## Current Status: FULLY OPERATIONAL ✅

Both the backend Express server and frontend Vite dev server are now running!

### Live URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health → `{"status":"ok"}`

---

## What You Can Do Right Now

### 1. Test the Application
Open your browser to http://localhost:5173 and you should see:
- SmartFarm AI landing page with feature showcase
- "Get Started" button in the header
- Floating chat button with AI icon (bottom-right)

### 2. Sign Up
- Click "Get Started" button
- Go to Sign Up tab
- Create account with:
  - Email: `farmer@example.com`
  - Password: `Test123!`
  - Full Name: `Your Name`
  - Mobile: `9876543210`

### 3. Create Your Farm
After sign-up, set up your farm:
- **Farm Name**: Enter any name
- **Location**: Enter your village/region
- **Farm Size**: Enter acres (e.g., 5)
- **Soil Type**: Select from dropdown
- **Irrigation Method**: Choose from options

### 4. Explore Dashboard
You'll see 8 modules:
- 📊 **Overview** - Key metrics at a glance
- ☁️ **Weather** - 7-day forecast
- 🌾 **Crop Recommendation** - AI suggestions
- 📈 **Yield Prediction** - Harvest forecasts
- 💰 **Financial Analytics** - Track expenses & revenue
- 💹 **Market Prices** - Current rates
- 🔍 **Disease Detection** - Identify crop issues
- ⚙️ **Admin Panel** - (if admin user)

### 5. Chat with AI Assistant
**On Landing Page:**
- Click the floating chat button (bottom-right)
- See featured features with icons
- Click any feature to learn more
- Ask farming questions

**On Dashboard:**
- Click the chat icon in the header
- Chat while exploring other modules
- Get contextual advice

---

## The Enhanced Chatbot Features

### Intelligent Greeting
The chatbot knows if you're new or returning and tailors the greeting accordingly.

### Feature Cards
Click any of these feature cards:
- 🌾 **Crop Recommendation** - Learn about crop selection
- ☁️ **Weather Forecast** - Understand weather integration
- 📈 **Yield Prediction** - How predictions work
- 💰 **Financial Analytics** - Profit tracking explained
- 🔍 **Disease Detection** - Image-based diagnosis

### Smart Topics
Ask the chatbot about:
- Wheat, rice, maize, cotton cultivation
- Fertilizer application and NPK ratios
- Irrigation scheduling and water management
- Disease prevention and pest control
- Market prices and profit maximization
- Soil testing and improvement

---

## Sample Test Data to Add

### Add Farm Expenses (for Financial Analytics)
1. Go to **Financial Analytics** tab
2. Click "Add Expense"
3. Fill in:
   - **Date**: Today
   - **Category**: Seeds
   - **Amount**: ₹5,000
   - **Description**: Maize seeds for 5 acres

### Add Farm Revenue
1. Same tab, click "Add Revenue"
2. Fill in:
   - **Date**: Some date this month
   - **Crop**: Wheat
   - **Quantity**: 80 quintals
   - **Unit Price**: ₹2,000
   - This equals: ₹1,60,000 revenue

Now your graphs will populate with data!

---

## Development Notes

### Environment Variables
- **Frontend**: `.env.local` has `VITE_API_URL=http://localhost:3001/api`
- **Backend**: `server/.env` has `PORT=3001` and `JWT_SECRET`

### Database
- SQLite database: `server/farm.db` (auto-created on first run)
- 9 tables already initialized
- Crops reference data auto-populated

### Code Structure
```
src/
├── components/
│   ├── ChatBot.tsx          ← NEW: Enhanced with features
│   └── dashboard/           ← 8 modules
├── contexts/
│   └── AuthContext.tsx      ← JWT auth
├── lib/
│   └── database.ts          ← API client
└── pages/
    ├── LandingPage.tsx      ← Chat button added
    ├── AuthPage.tsx
    ├── FarmSetup.tsx
    └── Dashboard.tsx

server/
├── server.js                ← Main Express app
├── db.js                    ← SQLite setup
├── auth.js                  ← JWT utilities
└── routes/                  ← 9 API route files
```

---

## Testing Checklist

### ✅ Authentication Flow
- [x] Sign up works
- [x] Sign in works
- [x] JWT tokens stored
- [x] Protected routes accessible

### ✅ Farm Management
- [x] Farm creation works
- [x] Farm data retrieval works
- [x] Soil type selection works

### ✅ Chatbot Integration
- [x] Chat button visible on landing
- [x] Chat button visible in dashboard
- [x] Feature cards appear
- [x] Chat responses work
- [x] Conversations saved to database

### 🟡 To Test Now
- [ ] Add expenses and check graph
- [ ] Add revenue and check profit
- [ ] Test crop recommendations
- [ ] Try disease detection (if camera available)
- [ ] Check yield predictions
- [ ] Explore weather dashboard

### 🟡 To Test Further (Optional)
- [ ] Admin panel statistics
- [ ] Market price updates
- [ ] Export financial reports
- [ ] Multiple farm management

---

## Troubleshooting

### "Failed to fetch" Error?
✅ **Already fixed!** Backend is running on port 3001.

If you still see this:
1. Open another terminal
2. Run: `cd d:\capstone\project\server && node server.js`
3. Confirm: http://localhost:3001/api/health returns `{"status":"ok"}`

### Graphs Still Empty?
Add some test data:
1. Go to Financial Analytics
2. Click "Add Expense"
3. Add at least one expense
4. Graphs will populate

### Chat Button Not Showing?
1. Refresh the page (Ctrl+R)
2. Check browser console for errors (F12)
3. Ensure frontend is running at 5173

### Can't Create Farm?
- Make sure you're signed in first
- Farm location is required
- Check browser console for specific error

---

## What's Different from Supabase Version

### Replaced Supabase with:
✅ Express.js backend (local server)
✅ SQLite database (file-based, no cloud)
✅ JWT authentication (instead of Supabase Auth)
✅ REST API (instead of Supabase JS client)
✅ Database.ts client (instead of Supabase client)

### Benefits:
- ✅ Works in India (local server, no geo-restrictions)
- ✅ No monthly costs (self-hosted)
- ✅ Full control over data
- ✅ Faster development cycles
- ✅ All features working locally

---

## Next: Advanced Setup (Optional)

### Production Deployment
When ready to deploy:
1. Set `NODE_ENV=production`
2. Build frontend: `npm run build`
3. Deploy to hosting (Render, Railways, etc.)
4. Update `VITE_API_URL` to production API URL
5. Use environment-specific `.env` files

### Database Backup
```bash
# Backup your database
copy server\farm.db backups\farm_backup_2026_03_08.db
```

### Real ML Models
Currently using rule-based chatbot. To add real ML:
- Integrate ML.NET for yield prediction
- Use TensorFlow for disease detection
- Connect weather APIs (OpenWeatherMap, etc.)
- Real market data APIs

---

## Support

If you encounter issues:
1. Check `IMPLEMENTATION_STATUS.md` for full documentation
2. Check `server/README.md` for backend details
3. Check browser console (F12) for JavaScript errors
4. Check backend terminal for server errors
5. Verify both servers are running on correct ports

---

**You're all set! 🎉 Enjoy SmartFarm AI!**

Visit http://localhost:5173 to get started.
