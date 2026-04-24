# 📦 Zip Seft — Parcel Delivery Management System

A full-stack parcel delivery web application built with the MERN stack. Users can send parcels, track deliveries in real-time, and make payments online. Admins manage riders and users, while riders handle their assigned deliveries.

---

## ✨ Features

### 👤 User
- Register & Login with Email/Password or Google
- Send parcels with dynamic region → district → area selection
- View all personal parcels with status tracking
- Online payment via **Stripe**
- Real-time parcel tracking with timeline view
- Payment history

### 🛡️ Admin
- Manage all users and assign roles (user / rider / admin)
- Approve or reject rider applications
- Assign riders to parcels
- View dashboard with parcel status overview

### 🚴 Rider
- Apply to become a rider
- Accept or reject assigned deliveries
- Update delivery status step by step (Assigned → On The Way → Picked Up → Delivered)
- View personal earnings and payout dashboard

### 🌍 General
- Fully responsive — mobile & desktop
- Protected routes based on user role
- JWT-based authentication
- Auto logout on token expiry

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Styling |
| DaisyUI v5 | UI Components |
| TanStack Query | Server state management |
| Axios | HTTP requests |
| Firebase | Authentication |
| Stripe.js | Payment integration |
| Recharts | Dashboard charts |
| React Hook Form | Form management |
| SweetAlert2 | Alert dialogs |
| Framer Motion | Animations |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Stripe | Payment processing |
| Firebase Admin | Token verification |
| JWT | Authentication |
| dotenv | Environment variables |

---

## 📁 Project Structure

```
zip-seft/
├── zip-seft-client/        # React Frontend
│   ├── src/
│   │   ├── Assets/
│   │   ├── Components/
│   │   ├── Hooks/
│   │   ├── Layouts/
│   │   ├── Pages/
│   │   └── Routes/
│   └── ...
│
└── zip-seft-server/        # Express Backend
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── routes/
    └── index.js
```

---

## ⚙️ Installation
### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project
- Stripe account

### Clone the repository
```bash
git clone https://github.com/your-username/zip-seft.git
cd zip-seft
```

### Backend setup
```bash
cd zip-seft-server
npm install
```



```bash
npm run dev
```

### Frontend setup
```bash
cd zip-seft-client
npm install
```


```bash
npm run dev
```

---

## 👥 User Roles

| Role | Access |
|------|--------|
| **User** | Send parcels, make payments, track deliveries |
| **Rider** | View & manage assigned deliveries |
| **Admin** | Full access — manage users, riders, parcels |

---

## 📞 Contact
**Sabbir Ahmed**
- Email: sabbirahmed.info33@gmail.com