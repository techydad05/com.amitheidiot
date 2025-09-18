# Database Migration to SQLite

This document outlines the migration from Supabase to SQLite for self-hosting.

## Changes Made

### Dependencies

- **Removed**: `@supabase/supabase-js`, `pg`
- **Added**: `better-sqlite3`

### Database Configuration

- **Old**: Supabase client with remote database
- **New**: Local SQLite database with better-sqlite3

### Database Location

- **Development**: `amitheidiot.db` (in project root)
- **Production**: `/data/amitheidiot.db`

### Schema

The SQLite database includes these tables:

- `citizenship_questions` - Quiz questions with options and correct answers
- `quiz_settings` - Configuration for number of questions and time limits
- `quiz_results` - User quiz results and scores

## Setup Instructions

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Seed the database** (optional, for sample questions):

   ```bash
   npm run seed
   ```

3. **Start the application**:
   ```bash
   npm run dev
   ```

The database will be automatically created and initialized when the application starts.

## Data Migration

If you need to migrate existing data from Supabase:

1. Export your data from Supabase
2. Create a custom migration script to insert the data into SQLite
3. Run the migration script before starting the application

## Production Deployment

For production deployment:

- Ensure the `/data` directory exists and is writable
- The SQLite database file will be created at `/data/amitheidiot.db`
- Consider setting up regular backups of the database file

## Benefits of SQLite

- **Self-hosted**: No external dependencies
- **Simple**: Single file database
- **Fast**: Excellent performance for read-heavy workloads
- **Reliable**: ACID compliant with WAL mode enabled
- **Cost-effective**: No monthly database fees
