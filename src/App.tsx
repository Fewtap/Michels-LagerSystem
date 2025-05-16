import { useEffect, useState } from 'react';
import { Article } from './Classes/Article';
import { Conversion } from './Classes/Conversion';

import './App.css'
import DatabaseClient from './SUPABASE/DatabaseClient';
import Navbar from './Components/Navbar/Navbar';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Inventory } from './Pages/Inventory/Inventory';
import type { Database } from './Interfaces/types';


function App() {
  



     
      
      
 

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/inventory" element={<Inventory/>} />
        <Route path="/orders" element={<h1>Orders</h1>} />
        <Route path="/suppliers" element={<h1>Suppliers</h1>} />
        <Route path="/reports" element={<h1>Reports</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
        <Route path="/articles" element={<h1>Articles</h1>} />
        <Route path="/articles/:id" element={<h1>Article Details</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
