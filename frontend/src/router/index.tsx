import {
  createBrowserRouter,
} from "react-router-dom";
import { lazy } from "react";

const Register = lazy(() => import('../pages/register'));
const Login = lazy(() => import('../pages/login'));
const Dashboard = lazy(() => import('../pages/dashboard'));

const router = createBrowserRouter([
  {
    path: '/reister',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

export default router;