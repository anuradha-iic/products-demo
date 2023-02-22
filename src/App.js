// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProductList from './ProductList';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct'
import UploadFile from './components/UploadFile'
import Notes from './components/Notes'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path='/list' element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path='/edit/:id' element={<UpdateProduct />} />
          <Route path='/upload' element={<UploadFile />} />
          <Route path='/notes' element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
