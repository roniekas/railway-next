# DNS Validation App

A web application that periodically checks and validates DNS records (SPF, DKIM, DMARC) for given domains, displays the results in a paginated and searchable table, and provides filter options.

## Features

- **DNS Record Validation**: Checks SPF, DKIM, and DMARC records for domains.
- **Periodic Scheduling**: Optionally, can be set to run at regular intervals to re-check DNS records.
- **Search and Filters**: Search domains and filter results by record validity.
- **Sorting**: Sort by date in ascending or descending order.
- **Pagination**: Supports adjustable page sizes and easy navigation between pages.
- **Dynamic Filtering and Sorting**: Filter results by each record type with dropdown options.

## Tech Stack

- **Frontend**: Next.js (with React and TypeScript)
- **Backend**: Next.js API Routes
- **Database**: Prisma with PostgreSQL
- **Styling**: Tailwind CSS
- **Debouncing**: lodash.debounce

---

## Prerequisites

1. **Node.js**: Make sure you have Node.js (version 18 or above) installed.
2. **PostgreSQL**: Install PostgreSQL and set up a database for this app.
3. **Environment Variables**: Create a `.env` file in the root directory of the project with the following environment variables:

   ```plaintext
   DATABASE_URL="postgresql://your_user:your_password@your_host:your_port/your_db_name"
4. **Install Dependencies**: Install all the dependencies by run : 
```plaintext
npm install
```
5. **Prisma Setup**: Setup prisma by running : 
```plaintext
    npx prisma migrate dev --name init
    npx prisma generate
```

6. **Finally**: RUN THE SERVER :
```plaintext
npm run dev
```

you can change the cronJob setting at the cronJobs.js at the root of the directory, currently its running every 12 hours,
if you want to make it running every minutes just make it 
```plaintext
* * * * *
```

## Project Structure
- **/pages**: Contains Next.js pages 
- **/app**: Contains and API routes for handling DNS validation. 
- **/components**: UI components such as SearchInput, TableHeader, PaginationControls, etc.
- **/hooks**: Custom hooks like useValidationData for data fetching and state management.
- **/prisma**: Prisma schema file (schema.prisma) for database structure.
