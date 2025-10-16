# Quiz Builder

Full-stack Quiz Builder application using:

- **Backend:** NestJS (with Prisma ORM)  
- **Frontend:** Next.js  
- **Database:** PostgreSQL (via Docker Compose)  
- **Features:** Create quizzes with multiple types of questions (`boolean`, `input`, `checkbox`)

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone <your-repo-url>
```
### 2. Run Docker compose db server
Don`t forget to create .env with needed data for db:
- POSTGRES_PASSWORD
- POSTGRES_USER
- POSTGRES_DB

```bash
docker-compose up -d
```
### 3. Backend Setup (NestJS)
```bash
cd backend
npm install

```
## Create .env
```bash
DATABASE_URL=postgresql://user:password@localhost:51425/db?schema=public
PORT=5200
```
##Run migrations
```bash
npx prisma migrate dev
```
### 4. Frontend Setup (Next.js)
```bash
cd frontend
npm install
#Start frontend
npm run dev
```
## Create .env
bash```
NEXT_PUBLIC_API_URL=http://localhost:5200
```

