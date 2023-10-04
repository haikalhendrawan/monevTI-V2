import { Navigate, useRoutes, createBrowserRouter, Routes, Route } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import RequireAuthLayout from "./layouts/auth/RequireAuthLayout";
import PersistLogin from "./layouts/auth/PersistLogin";

// Pages
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import IAssetPage from './pages/IAssetPage';
import WorksheetPage from './pages/WorksheetPage';
import MonitoringPage from './pages/MonitoringPage';
import LogBookPage from './pages/LogBookPage';
import TopologyPage from './pages/TopologyPage';

// ----------------------------------------------------------------------

export default function Router() {
  return (
  <Routes>
    <Route path="/login" element={ <LoginPage />} />

    <Route element={<PersistLogin />}> 
      <Route element={<RequireAuthLayout allowedRoles={[1,2]}/>}> { /* we want to protect this route */}
        <Route path="/" element={<DashboardAppPage />} />
      </Route>
    </Route>

    <Route element={<PersistLogin />}> 
      <Route path="/dashboard" element={ <RequireAuthLayout allowedRoles={[1,2]}/>}>  { /* we want to protect this route */}
        <Route index element={<Navigate to="app" />} /> 
        <Route path="user" element={<UserPage /> }/>
        <Route path="products" element={<ProductsPage />}/>
        <Route path="blog" element={<BlogPage />}/>
      </Route>
    </Route>

    <Route element={<PersistLogin />}> 
      <Route path="/" element={ <RequireAuthLayout allowedRoles={[1,2]}/>}>  { /* we want to protect this route */}
        <Route index element={<Navigate to="app" />} />
        <Route path="app" element={<DashboardAppPage />}/>
        <Route path="worksheet" element={<WorksheetPage />}/>
        <Route path="iasset" element={<IAssetPage />}/>
        <Route path="monitoring" element={<MonitoringPage />}/> 
        <Route path="logbook" element={<LogBookPage />}/>   
        <Route path="topology" element={<TopologyPage />}/>      
      </Route>
    </Route>
   

    <Route element={ <SimpleLayout />}>
      <Route path="/404" element={<Page404 />}/>
      <Route path="/*" element={<Page404 />}/>
    </Route>
    
  </Routes>
  );
}

