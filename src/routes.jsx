import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SliderPage from './pages/NewsSlidersPage';
import BusinessPage from './pages/BusinessPage';
import VirtualAccountPage from './pages/VirtualAccountPage';
import TransactionPage from './pages/TransactionPage';
import ResetDevUrPage from './pages/ResetDevUrPage';
import SettingPage from './pages/SettingsPage';

// ----------------------------------------------------------------------

export default function Router() {
  const token = localStorage.getItem('token');

  // Check Token terlebih dahulu untuk menentukan Routes

  if (token !== null) {
    const routes = useRoutes([
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          { element: <Navigate to="/dashboard/app" />, index: true },
          { path: 'app', element: <DashboardAppPage /> },
          { path: 'user', element: <UserPage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'slider', element: <SliderPage /> },
          { path: 'business', element: <BusinessPage /> },
          { path: 'virtual-account', element: <VirtualAccountPage /> },
          { path: 'transaction', element: <TransactionPage /> },
          { path: 'setting-account', element: <SettingPage /> },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
        index: true,
      },
      {
        path: '/reset',
        element: <ResetDevUrPage />,
      },
      {
        element: <SimpleLayout />,
        children: [
          { element: <Navigate to="/dashboard/app" />, index: true },
          { path: '404', element: <Page404 /> },
          { path: '*', element: <Navigate to="/404" /> },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ]);

    return routes;
  } else {
    const routes = useRoutes([
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '/reset',
        element: <ResetDevUrPage />,
      },
      {
        element: <SimpleLayout />,
        children: [
          { element: <Navigate to="/dashboard/app" />, index: true },
          { path: '404', element: <Page404 /> },
          { path: '*', element: <Navigate to="/login" /> },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ]);

    return routes;
  }
}
