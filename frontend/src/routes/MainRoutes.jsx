import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const BuyData = Loadable(lazy(() => import('pages/dashboard/BuyData')));
const SellData = Loadable(lazy(() => import('pages/dashboard/SellData')));
import ProtectedRoute from "../ProtectedRoute";

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/TotalInvestment')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <ProtectedRoute element={<Dashboard />} />, // Protect Dashboard
  children: [
    {
      path: "/",
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    // ✅ Add Buy Data Route
    {
      path: 'buy-data',
      element: <BuyData />
    },
    // ✅ Add Sell Data Route
    {
      path: 'sell-data',
      element: <SellData />
    }
  ]
};

export default MainRoutes;