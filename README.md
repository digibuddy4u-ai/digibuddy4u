# DigiBuddy4U — Digital Marketing Agency Platform

Complete full-stack MERN agency platform featuring:
- **`client/`** — Public-facing responsive agency website (React 19, Tailwind CSS 3.4, Lucide Icons, React Router DOM 7)
- **`server/`** — Production-grade Node.js/Express REST API with MongoDB & JWT authentication
- **`admin/`** — Secure agency administration dashboard for managing enquiries, services, portfolio, pricing, FAQs, and settings

---

## 1. Port & Service Architecture

| Application | Technology | Local Port | URL |
| :--- | :--- | :--- | :--- |
| **Website Frontend** | React + Vite | `3000` | [http://localhost:3000](http://localhost:3000) |
| **Admin Dashboard** | React + Vite | `3001` | [http://localhost:3001](http://localhost:3001) |
| **Backend REST API** | Express + Node.js | `5000` | [http://localhost:5000/api](http://localhost:5000/api) |
| **Database** | MongoDB Atlas | Cloud | `cluster0.4pdhwme.mongodb.net` |

---

## 2. Environment Variables Configuration

### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
# Replace <db_username> with your Atlas Database user name (e.g. digibuddy_user)
MONGODB_URI=mongodb+srv://<db_username>:RW4hGvYQ6JwUgkpY@cluster0.4pdhwme.mongodb.net/digibuddy4u?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=digibuddy4u_secure_jwt_secret_token_key_production_grade_2026_99x
JWT_EXPIRES_IN=7d

# CORS Allowed Origins
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://localhost:5173,http://localhost:5174

# Initial Admin Credentials (used by `npm run seed`)
INITIAL_ADMIN_NAME=DigiBuddy Admin
INITIAL_ADMIN_EMAIL=admin@digibuddy4u.com
INITIAL_ADMIN_PASSWORD=Admin@DigiBuddy4U#2026
```

### Admin Dashboard (`admin/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_WEBSITE_URL=http://localhost:3000
```

### Client Website (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 3. Quick Start Guide

### Step 1: Database Seeding & Admin Setup
In the `server/` folder, run the automated seed script. This initializes the superadmin account, the 6 core digital marketing services, RotiWala portfolio showcase, pricing packages, FAQs, and agency contact settings:

```bash
cd D:\DigiBuddy4u\server
npm run seed
```

*Default Admin Credentials:*
- **Email**: `admin@digibuddy4u.com`
- **Password**: `Admin@DigiBuddy4U#2026`

---

### Step 2: Start the Backend Server
```bash
cd D:\DigiBuddy4u\server
npm run dev
```
Server starts on port **5000**. Health check: `http://localhost:5000/api/health`.

---

### Step 3: Start the Admin Dashboard
Open a new terminal window:
```bash
cd D:\DigiBuddy4u\admin
npm run dev
```
Dashboard opens at **http://localhost:3001**. Log in with your admin credentials.

---

### Step 4: Start the Public Client Website
Open a third terminal window:
```bash
cd D:\DigiBuddy4u\client
npm run dev
```
Website opens at **http://localhost:3000**.

---

## 4. Key Functional Features

### Public Website (`client/`)
1. **Interactive Contact Form**: Submits enquiries directly to `POST /api/enquiries`. If the server is offline or unreachable, it gracefully displays an honest offline state with pre-filled WhatsApp (`+91 63524 78028`) and Email (`info@digibuddy4u.com`) one-click forwarding triggers.
2. **Featured Client Spotlight**: Authentic showcase for **RotiWala** with verified scope and client data notices.
3. **Responsive Navigation & WhatsApp CTAs**: Persistent and floating WhatsApp triggers with pre-populated messages.

### Admin Dashboard (`admin/`)
1. **Dashboard Overview**: Key metrics (Total Enquiries, New Leads, Active Services, Projects) and recent lead activity.
2. **Lead Management**: Filter by status (*New*, *In Progress*, *Contacted*, *Closed*), search by lead name/email, update internal notes, and launch direct WhatsApp chats with leads.
3. **Services & Portfolio Management**: Full CRUD operations with dynamic deliverables and transparent data notices.
4. **Website Settings**: Live updates for business name, email, phone, and WhatsApp numbers.
