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

// ----------------------------------------------------------------------

export default function Router() {
  return (
  <Routes>

    <Route element={<RequireAuthLayout allowedRoles={[1,2]}/>}> { /* we want to protect this route */}
      <Route path="/" element={<DashboardAppPage />} />
    </Route>

    <Route path="/login" element={ <LoginPage />} />

    <Route element={<PersistLogin />}> 
      <Route path="/dashboard" element={ <RequireAuthLayout allowedRoles={[1,2]}/>}>  { /* we want to protect this route */}
        <Route index element={<Navigate to="app" />} />
        <Route path="app" element={<DashboardAppPage />}/>
        <Route path="user" element={<UserPage /> }/>
        <Route path="products" element={<ProductsPage />}/>
        <Route path="blog" element={<BlogPage />}/>    
      </Route>
    </Route>
   

    <Route element={ <SimpleLayout />}>
      <Route path="/404" element={<Page404 />}/>
      <Route path="/*" element={<Page404 />}/>
    </Route>
    
  </Routes>
  );
}







  // const routes = useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <DashboardLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: 'app', element: <DashboardAppPage /> },
  //       { path: 'user', element: <UserPage /> },
  //       { path: 'products', element: <ProductsPage /> },
  //       { path: 'blog', element: <BlogPage /> },
  //     ],
  //   },
  //   {
  //     path: 'login',
  //     element: <LoginPage />,
  //   },
  //   {
  //     element: <SimpleLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: '404', element: <Page404 /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   {
  //     path: '*',
  //     element: <Navigate to="/404" replace />,
  //   },
  // ]);
