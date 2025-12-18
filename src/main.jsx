import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root/Root.jsx';
import Home from './Home/Home.jsx';
import Login from './Login.jsx';
import JoinEmployee from './JoinEmployee.jsx';
import JoinHr from './JoinHr.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import ErrorPage from './ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path: '*',
        element: <ErrorPage></ErrorPage>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/join-employee',
        element: <JoinEmployee></JoinEmployee>
      },
      {
        path: '/join-hr',
        element: <JoinHr></JoinHr>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
