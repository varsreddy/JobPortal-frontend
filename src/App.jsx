import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import AdminJobs from './components/admin/AdminJobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import Jobs from './components/Jobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },

  //admin routes
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies/></ProtectedRoute> 
  },
  {
    path: '/admin/companies/create',
    element:<ProtectedRoute> <CompanyCreate/></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element:<ProtectedRoute> <CompanySetup/></ProtectedRoute>
  },
    {
    path: '/admin/jobs',
    element:<ProtectedRoute> <AdminJobs/></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path: '/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  }
])




function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
