# Memorials Exporter — Full‑Stack Starter

A ready‑to‑run memorial headstones exporter website:

- **Backend:** Java 17 + Spring Boot 3 (REST + H2 DB)
- **Frontend:** React + Vite + Tailwind (responsive)
- **Images:** Pluggable storage — **LOCAL** (default) or **AWS S3**
- **Admin:** `/admin` page with product creation, protected by **X-Admin-Token** (DEV mode).

## Local Run

### Backend
```bash
cd backend
mvn spring-boot:run
```
- DB at `backend/data/`
- LOCAL uploads under `backend/uploads/`
- Change admin token in `src/main/resources/application.properties`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Optional `.env`:
```
VITE_API_BASE=http://localhost:8080
```

## Deploy (high level)
- Build backend JAR on EC2, run behind Nginx
- Build frontend (`npm run build`), serve Nginx static
- Switch `app.storage.mode=S3`, set bucket/region and give EC2 IAM role S3 perms

See comments in code for upgrading auth to Cognito/JWT.
