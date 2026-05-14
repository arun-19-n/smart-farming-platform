# Smart Farming Platform - Backend Server

Simple Express + SQLite backend for the Smart Farming Platform.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:3001`

## Directory Structure

```
server/
├── server.js              # Main Express app
├── db.js                  # SQLite database setup and utilities
├── auth.js                # Authentication and JWT utilities
├── package.json           # Dependencies
├── .env.example          # Environment variables template
├── farm.db               # SQLite database (auto-created)
└── routes/
    ├── auth.js           # Authentication endpoints
    ├── farms.js          # Farm CRUD operations
    ├── crops.js          # Crop reference data
    ├── expenses.js       # Expense tracking
    ├── payments.js       # Revenue/payment tracking
    ├── farmHistory.js    # Historical crop records
    ├── recommendations.js # Crop recommendations
    ├── admin.js          # Admin statistics
    └── chatbot.js        # Chatbot query logging
```

## Environment Variables

```env
PORT=3001                              # Server port
JWT_SECRET=your_secret_key_here        # JWT signing secret
NODE_ENV=development                   # development or production
```

## API Endpoints

See [MIGRATION_GUIDE.md](../MIGRATION_GUIDE.md) for full API documentation.

## Development

For auto-reload during development:

```bash
npm run dev
```

Requires `nodemon` to be installed.

## Database

SQLite database file: `server/farm.db`

- Automatically created on first run
- Pre-populated with sample crop data
- All tables created automatically

To reset database:
```bash
rm server/farm.db
npm start
```

## Authentication

- JWT tokens stored in localStorage on client
- Tokens included in `Authorization: Bearer <token>` header
- Token expires are not enforced (can be added later)
- Passwords hashed with bcryptjs

## Notes

- CORS is enabled for all origins
- All endpoints return JSON
- Error responses include descriptive error messages
- Database operations are promise-based
