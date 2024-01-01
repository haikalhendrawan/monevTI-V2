import { Navigate, useRoutes, createBrowserRouter, Routes, Route } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import RequireAuthLayout from "./layouts/auth/RequireAuthLayout";
import PersistLogin from "./layouts/auth/PersistLogin";

// Pages
import BlogPage from './pages/legacy/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/guard/Page404';
import ProductsPage from './pages/legacy/ProductsPage';
import DashboardAppPage from './pages/legacy/DashboardAppPage';
import IAssetPage from './pages/IAssetPage';
import WorksheetPage from './pages/WorksheetPage';
import MonitoringPage from './pages/MonitoringPage';
import LogBookPage from './pages/LogBookPage';
import TopologyPage from './pages/TopologyPage';
import ProfilePage from './pages/ProfilePage';
import GeneratePDFPage from './pages/GeneratePDFPage';
import HomePage from "./pages/HomePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminPage from "./pages/admin/AdminPage";
import UserRefPage from "./pages/admin/UserRefPage";
import WorksheetRefPage from "./pages/admin/WorksheetRefPage";
// ----------------------------------------------------------------------

export default function Router() {
  return (
  <Routes>
  
    <Route path="/login" element={ <LoginPage />} />
    <Route path="/resetpassword" element={ <ResetPasswordPage />} />
    
    <Route element={<PersistLogin />}> 
      <Route path="/" element={ <RequireAuthLayout allowedRoles={[1,2]}/>}>  { /* we want to protect this route */}
        <Route index element={<Navigate to="app" />} />
        <Route path="app" element={<HomePage />} />
        <Route path="worksheet" element={<WorksheetPage />} />
        <Route path="iasset" element={<IAssetPage />} />
        <Route path="monitoring" element={<MonitoringPage />} />  
        <Route path="topology" element={<TopologyPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Route>

    <Route element={<PersistLogin />}> 
      <Route path="/" element={ <RequireAuthLayout allowedRoles={[2]}/>}>  { /* we want to protect this route */}
        <Route index element={<Navigate to="app" />} />
        <Route path="logbook" element={<LogBookPage />} />  
      </Route>
    </Route>

    <Route element={<PersistLogin />}> 
      <Route path="/admin" element={ <RequireAuthLayout allowedRoles={[2]}/>}>  { /* we want to protect this route */}
        <Route index element={<Navigate to="user" />} />
        <Route path="user" element={<UserRefPage />} />
        <Route path="worksheet" element={<WorksheetRefPage />} />   
      </Route>
    </Route>
   
    <Route element={ <SimpleLayout />}>
      <Route path="/404" element={<Page404 />}/>
      <Route path="/*" element={<Page404 />}/>
    </Route>

    <Route element={<PersistLogin />}> 
      <Route path="/dashboard" element={ <RequireAuthLayout allowedRoles={[2]}/>}>  { /* we want to protect this route */}
        <Route index element={<Navigate to="app" />} /> 
        <Route path="user" element={<UserPage /> }/>
        <Route path="products" element={<ProductsPage />}/>
        <Route path="blog" element={<BlogPage />}/>
      </Route>
    </Route>

    <Route element={<PersistLogin />}> 
      <Route element={<RequireAuthLayout allowedRoles={[1,2]}/>}> { /* we want to protect this route */}
        <Route path="/" element={<DashboardAppPage />} />
      </Route>
    </Route>
    
  </Routes>
  );
}

