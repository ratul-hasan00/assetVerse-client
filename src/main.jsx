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
import MyAssets from './Dashboard/EmployeeDashoard/MyAsset.jsx';
import RequestAsset from './Dashboard/EmployeeDashoard/RequestAsset.jsx';
import MyTeam from './Dashboard/EmployeeDashoard/MyTeam.jsx';
import EmployeeProfile from './Dashboard/EmployeeDashoard/EmployeeProfile.jsx';
import Asset from './Dashboard/HRdashboard/Asset.jsx';
import AddAsset from './Dashboard/HRdashboard/AddAsset.jsx';
import Request from './Dashboard/HRdashboard/AllRequests.jsx';
import Employees from './Dashboard/HRdashboard/Employees.jsx';
import HRprofile from './Dashboard/HRdashboard/HRprofile.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
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
      },
      {
        path: '/dashboard/my-assets',
        element: <MyAssets></MyAssets>
      },
      {
        path: '/dashboard/request-asset',
        element: <RequestAsset></RequestAsset>
      },
      {
        path: '/dashboard/my-team',
        element: <MyTeam></MyTeam>
      },
      {
        path: '/dashboard/employeeProfile',
        element: <EmployeeProfile></EmployeeProfile>
      },
      {
        path: '/dashboard/assets',
        element: <Asset></Asset>
      },
      {
        path: '/dashboard/add-asset',
        element: <AddAsset></AddAsset>
      },
      {
        path: '/dashboard/Allrequests',
        element: <Request></Request>
      },
      {
        path: '/dashboard/employees',
        element: <Employees></Employees>
      },
      {
        path: '/dashboard/HRprofile',
        element: <HRprofile></HRprofile>
      },
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
