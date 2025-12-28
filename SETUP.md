# Setup Instructions

## Prerequisites

- Node.js (v18 or higher)
- Supabase Account (free tier works fine)
- Redis (for background jobs)
- npm or yarn

## Step-by-Step Setup

### 1. Initialize Project

```bash
npm init -y
```

### 2. Install Dependencies

```bash
# Core dependencies
npm install express cors dotenv
npm install bcryptjs jsonwebtoken
npm install @prisma/client
npm install google-auth-library
npm install multer aws-sdk
npm install bullmq ioredis
npm install exceljs pdfkit

# Dev dependencies
npm install -D typescript @types/node @types/express
npm install -D @types/bcryptjs @types/jsonwebtoken
npm install -D @types/cors @types/multer
npm install -D ts-node nodemon prisma
npm install -D @types/pdfkit
```

### 3. Configure TypeScript

Create `tsconfig.json` (will be provided)

### 4. Set Up Prisma

```bash
npx prisma init
```

### 5. Configure Environment Variables

Create `.env` file (see `.env.example`)

### 6. Create Database Schema

Update `prisma/schema.prisma` with models

### 7. Run Migrations

```bash
npx prisma migrate dev --name init
```

### 8. Generate Prisma Client

```bash
npx prisma generate
```

### 9. Start Development Server

```bash
npm run dev
```

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/expense_gst_db"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AWS S3 (optional)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="ap-south-1"
AWS_BUCKET_NAME="expense-receipts"

# Redis
REDIS_URL="redis://localhost:6379"

# Server
PORT=3000
NODE_ENV="development"
```

## Database Setup

```bash
# Create PostgreSQL database
createdb expense_gst_db

# Or using psql
psql -U postgres
CREATE DATABASE expense_gst_db;
```

## Verify Installation

```bash
# Check Node version
node --version

# Check PostgreSQL
psql --version

# Check Redis
redis-cli ping
```
