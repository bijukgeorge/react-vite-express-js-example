import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/layouts/Layout.tsx';
import Home from '@/pages/Home';
import About from '@/pages/About';
import ProductListPage from '@/pages/ProductListPage';
import ProductAddPage from '@/pages/ProductAddPage';
import NotFound from '@/pages/NotFound';
import { AppRoutes } from '@/AppRoutes.ts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={AppRoutes.Home} element={<Home />} />
          <Route path={AppRoutes.About} element={<About />} />
          <Route path={AppRoutes.Products} element={<ProductListPage />} />
          <Route path={AppRoutes.ProductAdd} element={<ProductAddPage />} />
          <Route path={AppRoutes.NotFound} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
