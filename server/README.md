# DigiBuddy4U — Backend API Server

Production-ready Express.js and MongoDB REST API for the DigiBuddy4U digital marketing agency platform and admin dashboard.

## Tech Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs password hashing
- **Security**: Helmet, CORS origin validation, Rate Limiting, Centralized Error Handling

---

## Environment Variables (`.env`)

Create a `.env` file in `server/` with the following variables:

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection String
# Replace <DB_USERNAME> and <DB_PASSWORD> with your actual MongoDB Atlas database user credentials
MONGODB_URI=mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@cluster0.4pdhwme.mongodb.net/digibuddy4u?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
JWT_EXPIRES_IN=7d

# CORS Allowed Origins
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Seed Initial Admin
INITIAL_ADMIN_NAME=DigiBuddy Admin
INITIAL_ADMIN_EMAIL=admin@digibuddy4u.com
INITIAL_ADMIN_PASSWORD=Admin@DigiBuddy4U#2026
```

---

## Commands

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Seed Initial Database Data
Seeds the superadmin user, 6 marketing services, RotiWala portfolio, pricing packages, FAQs, and website settings:
```bash
npm run seed
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Start Production Server
```bash
npm start
```

---

## API Documentation

### Authentication
- `POST /api/auth/login` — Admin login (returns JWT token and admin info)
- `POST /api/auth/logout` — Admin logout
- `GET /api/auth/me` — Get authenticated admin profile
- `PATCH /api/auth/profile` — Update admin name and email
- `PATCH /api/auth/change-password` — Change admin password

### Contact Enquiries
- `POST /api/enquiries` — Public enquiry submission (with rate limiting & validation)
- `GET /api/enquiries` — List enquiries (Admin only, supports `?status=new` and `?search=`)
- `GET /api/enquiries/:id` — View enquiry detail (Admin only)
- `PATCH /api/enquiries/:id` — Update status or internal notes (Admin only)
- `DELETE /api/enquiries/:id` — Delete enquiry (Admin only)

### Services
- `GET /api/services` — Public published services listing
- `GET /api/services/:idOrSlug` — Public service detail
- `GET /api/services/admin/all` — All services including unpublished (Admin only)
- `POST /api/services` — Create service (Admin only)
- `PUT /api/services/:id` — Update service (Admin only)
- `DELETE /api/services/:id` — Delete service (Admin only)

### Portfolio
- `GET /api/portfolio` — Public published portfolio projects
- `GET /api/portfolio/:idOrSlug` — Public project detail
- `GET /api/portfolio/admin/all` — All projects (Admin only)
- `POST /api/portfolio` — Create project (Admin only)
- `PUT /api/portfolio/:id` — Update project (Admin only)
- `DELETE /api/portfolio/:id` — Delete project (Admin only)

### Case Studies
- `GET /api/case-studies` — Public case studies
- `GET /api/case-studies/admin/all` — Admin case studies
- `POST /api/case-studies` — Create case study (Admin only)
- `PUT /api/case-studies/:id` — Update case study (Admin only)
- `DELETE /api/case-studies/:id` — Delete case study (Admin only)

### Pricing
- `GET /api/pricing` — Public pricing packages
- `GET /api/pricing/admin/all` — Admin pricing packages
- `POST /api/pricing` — Create package (Admin only)
- `PUT /api/pricing/:id` — Update package (Admin only)
- `DELETE /api/pricing/:id` — Delete package (Admin only)

### FAQs
- `GET /api/faqs` — Public FAQs
- `GET /api/faqs/admin/all` — Admin FAQs
- `POST /api/faqs` — Create FAQ (Admin only)
- `PUT /api/faqs/:id` — Update FAQ (Admin only)
- `DELETE /api/faqs/:id` — Delete FAQ (Admin only)

### Website Settings
- `GET /api/settings` — Public contact info and social links
- `GET /api/settings/admin` — Admin full settings view
- `PUT /api/settings` — Update settings (Admin only)

### Dashboard Overview
- `GET /api/dashboard/overview` — Enquiries count, services count, project count, recent enquiries (Admin only)
