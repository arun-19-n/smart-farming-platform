# Smart Farming Platform - Database Migration Guide

## Overview
The project has been migrated from **Supabase** (disabled in India) to a **simple SQLite + Express backend** solution. This is a self-hosted, locally-controlled database system with no geo-restrictions.

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

This will install:
- **express** - Web framework
- **sqlite3** - Database
- **cors** - Cross-origin requests
- **bcryptjs** - Password hashing
- **jwt-simple** - Authentication tokens  
- **dotenv** - Environment variables

### 2. Configure Backend Environment

Create a `.env` file in the `server` directory:

```bash
cp server/.env.example server/.env
```

Update `server/.env` with your settings:
```env
PORT=3001
JWT_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
```

### 3. Configure Frontend Environment

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Update `.env.local`:
```env
VITE_API_URL=http://localhost:3001/api
```

For production, change to your server URL:
```env
VITE_API_URL=https://your-server.com/api
```

### 4. Start the Backend Server

```bash
cd server
npm start
```

The server will:
- Create `farm.db` SQLite database automatically
- Populate sample crop data
- Start listening on `http://localhost:3001`

### 5. Start the Frontend (in another terminal)

```bash
npm run dev
```

The frontend will connect to the backend API at the configured URL.

## Database Schema

The SQLite database includes the following tables:

- **farmers** - User accounts and profiles
- **farms** - Farm properties and details
- **crops_database** - Crop reference data (wheat, rice, corn, etc.)
- **farm_history** - Historical crop records for soil estimation
- **expenses** - Farm operating expenses
- **payments** - Crop sales and revenue tracking
- **crop_recommendations** - AI-generated crop suggestions
- **chatbot_queries** - Conversation history
- **soil_types** - Soil classification reference

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new farmer
- `POST /api/auth/signin` - Login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update profile

### Farms
- `POST /api/farms` - Create farm profile
- `GET /api/farms` - Get user's farm

### Crops
- `GET /api/crops/database` - Get all crops
- `GET /api/crops/by-season/:season` - Get crops by season

### Financial
- `POST /api/expenses` - Add farm expense
- `GET /api/expenses/farm/:farmId` - Get farm expenses
- `POST /api/payments` - Add payment/revenue
- `GET /api/payments/farm/:farmId` - Get farm payments

### Other
- `POST /api/farm-history/batch` - Save farm history
- `GET /api/farm-history/farm/:farmId` - Get farm history
- `POST /api/recommendations` - Save crop recommendation
- `GET /api/admin/stats` - Get admin statistics
- `GET /api/admin/farmers` - List all farmers
- `POST /api/chatbot` - Save chatbot query

## Key Changes from Supabase

### What Changed
1. **Authentication**: Now using JWT tokens stored in localStorage
2. **API Calls**: Direct fetch() calls instead of Supabase client SDK
3. **Database**: SQLite stored locally instead of Supabase PostgreSQL
4. **Dependencies**: Removed `@supabase/supabase-js`, added simple Express backend

### What Stayed the Same
- Same React frontend structure
- Same TypeScript types and interfaces
- Same feature set and UI

## Development vs Production

### Development
```bash
# Terminal 1 - Backend
cd server
npm run dev    # Uses nodemon for auto-reload

# Terminal 2 - Frontend
npm run dev
```

### Production
1. Build frontend: `npm run build`
2. Deploy backend to your server
3. Update `VITE_API_URL` to your server in environment variables
4. Serve built frontend files

## Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify Node.js is installed (v14+)
- Check JWT_SECRET in .env

### Frontend can't connect to backend
- Verify backend is running on correct port
- Check VITE_API_URL matches backend URL
- Check CORS is enabled in Express

### Database issues
- Delete `server/farm.db` to reset database
- Check write permissions in `server` directory
- Verify SQLite is installed: `sqlite3 --version`

## Performance Notes

- SQLite is suitable for single-server deployments with moderate traffic
- For high traffic, consider migrating to PostgreSQL
- Database file is stored locally (`server/farm.db`)

## Security Recommendations

For production deployment:
1. Change `JWT_SECRET` to a strong, random value
2. Add rate limiting middleware
3. Implement input validation
4. Use HTTPS
5. Add database backups
6. Consider adding password reset functionality
7. Add email verification for signups

## Future Enhancements

To scale this system:
1. Migrate SQLite to PostgreSQL
2. Add Redis caching
3. Implement message queues for async operations
4. Add file storage (for disease detection images)
5. Set up CI/CD pipeline
6. Add monitoring and logging

## Support

For issues or questions about the migration:
1. Check backend logs in terminal
2. Check browser console for frontend errors
3. Verify database file exists with `ls -la server/farm.db`
4. Test API directly: `curl http://localhost:3001/api/health`
