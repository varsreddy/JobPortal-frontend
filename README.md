# 💼 Job Portal Web Application

A modern full-stack Job Portal web application where users can register, view, and apply for jobs, and admins can post and manage job listings and company profiles.

🌐 **Live Demo**: [https://job-portal-frontend-six-lime.vercel.app/](https://job-portal-frontend-six-lime.vercel.app/)

---

## 🚀 Features

### 👥 User Features:
- Sign up, log in, and view profile
- Upload resume & update skills
- Apply to jobs with a single click
- View all applied jobs and application status

### 🧑‍💼 Admin Features:
- Post, update, and manage job listings
- Create and edit company profiles
- View applicants for specific jobs
- Search and filter jobs and companies

---

## 🛠️ Tech Stack

| Layer        | Technology                         |
|--------------|----------------------------------|
| Frontend     | React, TailwindCSS, Shadcn/UI    |
| State Mgmt   | Redux Toolkit                    |
| Routing      | React Router                    |
| Backend      | Node.js, Express.js              |
| Database     | MongoDB                         |
| Notifications| Sonner (toast alerts)            |
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## 📂 Repository Links

- **Frontend**: [https://github.com/varsreddy/JobPortal-frontend](https://github.com/varsreddy/JobPortal-frontend)
- **Backend**: [https://github.com/varsreddy/JobPortal-backend](https://github.com/varsreddy/JobPortal-backend)

---

## 🖥️ Deployment Links

- **Frontend**: [https://job-portal-frontend-six-lime.vercel.app/](https://job-portal-frontend-six-lime.vercel.app/)
- **Backend**: [https://vercel.com/varsreddys-projects/job-portal-backend/deployments](https://vercel.com/varsreddys-projects/job-portal-backend/deployments)

---

## 🧩 Folder Structure (Frontend)

```bash
├── components/
│   ├── auth/                # Login, Signup components
│   ├── admin/               # Admin views: jobs, companies, applicants
│   ├── shared/              # Navbar and reusable components
│   ├── ui/                  # Shadcn/ui styled components
│   └── hooks/               # Custom React hooks
├── redux/                   # Redux slices and store
├── utils/                   # Constants, API endpoints
├── App.jsx                  # Main app component with routing
└── main.jsx                 # React entry point



## 🧩 Folder Structure (Backend)

```bash
├── controllers/             # Request handlers for jobs, users, companies
├── models/                  # Mongoose schemas
├── routes/                  # Express routes
├── middleware/              # Auth and error handling middleware
├── utils/                   # Helper functions, constants
├── server.js                # Main server file
└── config/                  # DB connection and config files



# 🔧 Installation & Setup
## Frontend
git clone https://github.com/varsreddy/JobPortal-frontend.git
cd JobPortal-frontend
npm install
npm run dev


## Backend
git clone https://github.com/varsreddy/JobPortal-backend.git
cd JobPortal-backend
npm install


### Create a .env file with the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### Start the backend server:

npm run dev

👩‍💻 Author
Varshitha Karri
🔗 LinkedIn [https://www.linkedin.com/in/varshitha-karri-3a486825b](https://www.linkedin.com/in/varshitha-karri-3a486825b)
📧 varshithak809@example.com
