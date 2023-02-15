// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProductList from './ProductList';
import AddProduct from './components/AddProduct';
import UploadFile from './components/UploadFile'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path='/list' element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path='/upload' element={<UploadFile />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
