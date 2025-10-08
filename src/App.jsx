import { Button } from "@/components/ui/button"
import { Children } from "react"
import AppLayout from "./layouts/app-layout"
import LandingPage from "./Pages/LandingPage"
import JobPage from "./Pages/job"
import jobListing from "./Pages/job-listing"
import Onboarding from "./Pages/Onboarding"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import PostJob from "./Pages/post-job"
import savedJob from "./Pages/saved-job"
import MyJobs from "./Pages/my-jobs"

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
     {
        path:'/onboarding',
        element:<Onboarding/>
      },
     {
        path:'/jobs',
        element:<jobListing/>
      },
     {
        path:'/job/:id',
        element:<JobPage/>
      },
     {
        path:'/post-job',
        element:<PostJob/>
      },

      {
        path:'/saved-job',
        element:<savedJob/>
      },

      {
        path:'/my-jobs',
        element:<MyJobs/>
      },
    ]

  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App