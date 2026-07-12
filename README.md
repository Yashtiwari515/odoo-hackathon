# 🚚 TransitOps - Smart Transport Management System

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge)
![Hackathon](https://img.shields.io/badge/Hackathon-Project-orange?style=for-the-badge)

### Smart Fleet & Transport Management Platform

Manage Vehicles • Drivers • Trips • Fuel • Maintenance • Expenses • Reports

</div>

---

# 📌 Overview

**TransitOps** is a full-stack Transport Management System developed during a hackathon to simplify fleet operations.

The platform enables organizations to efficiently manage their entire transportation workflow from a single dashboard.

It provides modules for

- 🚚 Vehicle Management
- 👨‍✈️ Driver Management
- 🛣 Trip Tracking
- ⛽ Fuel Logs
- 🔧 Maintenance Records
- 💰 Expense Management
- 📊 Dashboard Analytics
- 📈 Reports

---

# ✨ Features

## 🔐 Authentication

- Secure Login
- JWT Authentication
- Password Hashing using bcrypt
- Role Based Access

---

## 🚚 Vehicle Management

- Add Vehicle
- Update Vehicle
- Delete Vehicle
- Vehicle Status

---

## 👨‍✈️ Driver Management

- Add Driver
- Update Driver
- Delete Driver
- Driver Availability

---

## 🛣 Trip Management

- Create Trip
- Assign Vehicle
- Assign Driver
- Track Trip Status
- Trip History

---

## 🔧 Maintenance

- Schedule Maintenance
- Maintenance Cost
- Maintenance Status

---

## ⛽ Fuel Management

- Fuel Logs
- Fuel Cost
- Odometer Tracking

---

## 💰 Expense Management

- Add Expenses
- Expense Categories
- Vehicle Expenses

---

## 📊 Dashboard

- Total Vehicles
- Total Drivers
- Active Trips
- Fuel Expenses
- Other Expenses
- Maintenance Overview

---

## 📈 Reports

- Total Trips
- Distance Covered
- Fuel Consumption
- Maintenance Cost
- Expense Summary

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Chart.js

---

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

---

# 📂 Project Structure

```text
TransitOps
│
├── client
│   ├── assets
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── services
│   └── App.jsx
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── prisma
│   ├── config
│   └── utils
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/transitops.git
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

## Backend

```bash
cd server

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the server folder.

```env
DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_secret_key
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Vehicles

```
GET /api/vehicles

POST /api/vehicles

PUT /api/vehicles/:id

DELETE /api/vehicles/:id
```

---

## Drivers

```
GET /api/drivers

POST /api/drivers

PUT /api/drivers/:id

DELETE /api/drivers/:id
```

---

## Trips

```
GET /api/trips

POST /api/trips

PUT /api/trips/:id

DELETE /api/trips/:id
```

---

## Maintenance

```
GET /api/maintenance

POST /api/maintenance

PUT /api/maintenance/:id

DELETE /api/maintenance/:id
```

---

## Fuel

```
GET /api/fuel

POST /api/fuel

PUT /api/fuel/:id

DELETE /api/fuel/:id
```

---

## Expenses

```
GET /api/expenses

POST /api/expenses

PUT /api/expenses/:id

DELETE /api/expenses/:id
```

---

## Dashboard

```
GET /api/dashboard
```

---

## Reports

```
GET /api/reports
```

---

# 🎯 Future Improvements

- Live GPS Tracking
- Route Optimization
- Driver Performance Analytics
- Email Notifications
- PDF Report Export
- Mobile Application
- AI Route Suggestions
- Predictive Maintenance

---

# 👥 Team

| Member | Responsibility |
|---------|----------------|
| Member 1 | Authentication UI, Dashboard, Layout |
| Member 2 | Vehicle, Driver, Trip, Fuel, Maintenance, Expense & Reports UI |
| Member 3 | Authentication APIs, Vehicle APIs, Driver APIs |
| Member 4 | Trip APIs, Maintenance APIs, Fuel APIs, Expense APIs, Dashboard APIs, Report APIs |

---

# ⭐ Highlights

- Full Stack Application
- RESTful APIs
- MVC Architecture
- JWT Authentication
- Prisma ORM
- PostgreSQL Database
- Responsive UI
- Clean Folder Structure
- Hackathon Optimized

---

<div align="center">

## 🚚 TransitOps

### Smart Transport. Smarter Operations.

⭐ If you like this project, don't forget to star the repository!

Made with ❤️ for Odoo Hackathon 2026

</div>
