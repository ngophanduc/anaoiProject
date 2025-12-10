import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import NutritionJourneyPage from './pages/NutritionJourneyPage';
import ProductPage from './pages/ProductPage';
import AlwaysHappyPage from './pages/AlwaysHappyPage';
import BlogDetailPage from './pages/BlogDetailPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/san-pham' element={<ProductPage />} />
          <Route path='/hanh-trinh-dinh-duong' element={<NutritionJourneyPage />} />
          <Route path='/luon-vui-khoe' element={<AlwaysHappyPage />} />
          <Route path='/blog/:blogId' element={<BlogDetailPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
