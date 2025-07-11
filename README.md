# 💼 Job Portal Web Application

A modern full-stack Job Portal web application where users can register, view, and apply for jobs, and admins can post and manage job listings and company profiles.

🌐 **Live Demo**: [https://job-portal-frontend-six-lime.vercel.app/](https://job-portal-frontend-six-lime.vercel.app/)

---

## 🚀 Features

### 👥 User Features:
- Sign up, log in, and view profile
- Upload resume & update skills
- Apply to jobs in one click
- View all applied jobs

### 🧑‍💼 Admin Features:
- Post, update, and manage job listings
- Create and edit company profiles
- View applicants for a specific job
- Search/filter jobs and companies

---

## 🛠️ Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React, TailwindCSS, Shadcn/UI       |
| State Mgmt   | Redux Toolkit                       |
| Routing      | React Router                        |
| Backend      | Node.js, Express.js                 |
| Database     | MongoDB                             |
| Notifications| Sonner (toast alerts)               |
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## 🧩 Folder Structure

```bash
├── components/
│   ├── auth/                # Login, Signup
│   ├── admin/               # Admin views (jobs, companies, applicants)
│   ├── shared/              # Navbar, Reusable components
│   ├── ui/                  # Shadcn/ui styled elements
│   └── hooks/               # Custom React hooks
├── redux/                   # Redux slices and store
├── utils/                   # Constants, API endpoints
├── App.jsx                  # Main app component with router
└── main.jsx                 # Entry point



# 🔧 Installation


# 1. Clone the repo
git clone https://github.com/varsreddy/job-portal.git
cd job-portal

# 2. Install dependencies
npm install

# 3. Create a `.env` file for backend (if using locally)
# Add your MongoDB URI and JWT secret

# 4. Run development server
npm run dev




### 👩‍💻 Author
Varshitha Karri
🔗 LinkedIn [https://www.linkedin.com/in/varshitha-karri-3a486825b](https://www.linkedin.com/in/varshitha-karri-3a486825b)
📧 varshithak809@example.com
