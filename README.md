# Expense & GST Compliance Tool - Backend

A comprehensive expense management and GST compliance system for Indian SMBs.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Google OAuth
- **File Storage**: AWS S3 / Local Storage
- **OCR**: Tesseract / Google Vision API
- **Background Jobs**: BullMQ + Redis
- **Export**: ExcelJS, PDFKit

## Architecture

MVC + Service Pattern:
- **Models**: Prisma schema
- **Controllers**: Request/response handling
- **Services**: Business logic
- **Middleware**: Auth, validation, error handling

## Features

### Phase 1: Foundation
- User authentication (Email + Google OAuth)
- Business management
- Manual expense entry
- Vendor & category CRUD

### Phase 2: Receipt Upload + OCR
- Receipt image upload
- OCR text extraction
- Auto-fill expense form
- User confirmation workflow

### Phase 3: GST Logic + Reporting
- Automatic GST calculation (CGST/SGST/IGST)
- Monthly expense summaries
- GST reports
- Excel/PDF export

### Phase 4: Dashboard + Polish
- Analytics dashboard
- Background jobs (reports, reminders)
- API documentation
- Demo data

## Getting Started

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for folder organization.

## API Documentation

Will be available at `/api/docs` after implementation.

## License

MIT
