import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { CartProvider } from './context/CartContext';
import theme from './theme/theme';
import HomePage from './pages/HomePage';
import NutritionJourneyPage from './pages/NutritionJourneyPage';
import ProductPage from './pages/ProductPage';
import AlwaysHappyPage from './pages/AlwaysHappyPage';
import BlogDetailPage from './pages/BlogDetailPage';
import QRProductDetailPage from './pages/QRProductDetailPage';
import QRProductDetailPage2 from './pages/QRProductDetailPage2';
import QRProductDetailPage3 from './pages/QRProductDetailPage3';
import QRProductDetailPage4 from './pages/QRProductDetailPage4';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          '--font-standard-regular': "'VNM Sans Std', sans-serif",
        }}
      >
        <CartProvider>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/san-pham' element={<ProductPage />} />
              <Route path='/hanh-trinh-dinh-duong' element={<NutritionJourneyPage />} />
              <Route path='/luon-vui-khoe' element={<AlwaysHappyPage />} />
              <Route path='/blog/:blogId' element={<BlogDetailPage />} />
              <Route path='/qr-product/1' element={<QRProductDetailPage />} />
              <Route path='/qr-product/2' element={<QRProductDetailPage2 />} />
              <Route path='/qr-product/3' element={<QRProductDetailPage3 />} />
              <Route path='/qr-product/4' element={<QRProductDetailPage4 />} />
            </Routes>
          </Router>
        </CartProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
