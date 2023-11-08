import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'


const router = createBrowserRouter([
  {
    path: "",
    element: <LoginPage />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
]);

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
