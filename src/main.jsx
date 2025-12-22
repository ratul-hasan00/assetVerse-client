import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root/Root.jsx';
import Home from './Home/Home.jsx';
import Login from './Login.jsx';
import JoinEmployee from './JoinEmployee.jsx';
import JoinHr from './JoinHr.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import ErrorPage from './ErrorPage.jsx';
import RequestAsset from './Dashboard/EmployeeDashoard/RequestAsset.jsx';
import MyTeam from './Dashboard/EmployeeDashoard/MyTeam.jsx';
import Asset from './Dashboard/HRdashboard/Asset.jsx';
import Request from './Dashboard/HRdashboard/AllRequests.jsx';
import Employees from './Dashboard/HRdashboard/Employees.jsx';
import HRprofile from './Dashboard/HRdashboard/HRprofile.jsx';
import MyAssets from './Dashboard/EmployeeDashoard/MyAssets.jsx';
import EmployeeProfile from './Dashboard/EmployeeDashoard/EmployeeProfile.jsx';
import AddAsset from './Dashboard/HRdashboard/AddAsset.jsx';
import EmployeeEditProfile from './Dashboard/EmployeeDashoard/EmployeeEditProfile.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import UpgradePackage from './Dashboard/HRdashboard/UpgradePackage.jsx';
import UpgradeSuccess from './Dashboard/HRdashboard/UpgradeSuccess.jsx';
import UpgradeCancel from './Dashboard/HRdashboard/UpgradeCancel.jsx';



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
        element: <PrivateRoute><MyAssets></MyAssets></PrivateRoute>
      },
      {
        path: '/dashboard/request-asset',
        element: <PrivateRoute><RequestAsset></RequestAsset></PrivateRoute>
      },
      {
        path: '/dashboard/my-team',
        element: <PrivateRoute><MyTeam></MyTeam></PrivateRoute>
      },
      {
        path: '/dashboard/employeeProfile',
        element: <PrivateRoute><EmployeeProfile></EmployeeProfile></PrivateRoute>
      },
      {
        path: '/employeeEditProfile',
        element: <PrivateRoute><EmployeeEditProfile></EmployeeEditProfile></PrivateRoute>
      },
      {
        path: '/dashboard/asset',
        element: <PrivateRoute><Asset></Asset></PrivateRoute>
      },
      {
        path: '/dashboard/add-asset',
        element: <PrivateRoute><AddAsset></AddAsset></PrivateRoute>
      },
      {
        path: '/dashboard/Allrequests',
        element: <PrivateRoute><Request></Request></PrivateRoute>
      },
      {
        path: '/dashboard/employees',
        element: <PrivateRoute><Employees></Employees></PrivateRoute>
      },
      {
        path: '/dashboard/upgrade',
        element: <PrivateRoute><UpgradePackage></UpgradePackage></PrivateRoute>
      },
      {
        path: '/dashboard/upgrade-success',
        element: <PrivateRoute><UpgradeSuccess></UpgradeSuccess></PrivateRoute>
      },
      {
        path: '/dashboard/upgrade-cancelled',
        element: <PrivateRoute><UpgradeCancel></UpgradeCancel></PrivateRoute>
      },
      {
        path: '/dashboard/HRprofile',
        element: <PrivateRoute><HRprofile></HRprofile></PrivateRoute>
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
