# Project Structure

```
expense-gst-backend/
│
├── src/
│   ├── config/
│   │   ├── database.ts         # Prisma client instance
│   │   ├── redis.ts            # Redis connection
│   │   └── aws.ts              # S3 configuration
│   │
│   ├── models/                 # Prisma schema (prisma/schema.prisma)
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── business.controller.ts
│   │   ├── expense.controller.ts
│   │   ├── vendor.controller.ts
│   │   ├── category.controller.ts
│   │   ├── report.controller.ts
│   │   └── dashboard.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── business.service.ts
│   │   ├── expense.service.ts
│   │   ├── vendor.service.ts
│   │   ├── category.service.ts
│   │   ├── ocr.service.ts
│   │   ├── gst.service.ts
│   │   ├── report.service.ts
│   │   ├── storage.service.ts      # Pre-signed URLs (S3/Supabase)
│   │   └── export.service.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts     # JWT verification
│   │   ├── validate.middleware.ts  # Request validation
│   │   └── error.middleware.ts     # Global error handler
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── business.routes.ts
│   │   ├── expense.routes.ts
│   │   ├── vendor.routes.ts
│   │   ├── category.routes.ts
│   │   ├── report.routes.ts
│   │   └── dashboard.routes.ts
│   │
│   ├── utils/
│   │   ├── jwt.util.ts
│   │   ├── hash.util.ts
│   │   ├── validation.util.ts
│   │   └── date.util.ts
│   │
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── expense.types.ts
│   │   └── report.types.ts
│   │
│   ├── jobs/
│   │   ├── monthlyReport.job.ts
│   │   └── receiptReminder.job.ts
│   │
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Server entry point
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Migration files
│   └── seed.ts                 # Seed data
│
├── uploads/                    # Local file storage (dev)
│
├── tests/                      # Test files (future)
│
├── .env                        # Environment variables
├── .env.example                # Example env file
├── .gitignore
├── tsconfig.json
├── package.json
├── README.md
├── SETUP.md
└── PROJECT_STRUCTURE.md
```

## Folder Responsibilities

### `/src/config`
Database, Redis, and external service configurations

### `/src/controllers`
Handle HTTP requests/responses, call services, return results

### `/src/services`
Business logic, data processing, external API calls

### `/src/middleware`
Authentication, validation, error handling

### `/src/routes`
API endpoint definitions

### `/src/utils`
Helper functions, utilities

### `/src/types`
TypeScript type definitions and interfaces

### `/src/jobs`
Background job definitions

### `/prisma`
Database schema and migrations
