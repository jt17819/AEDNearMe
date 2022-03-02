import React from "react";
import { Route, Routes, Outlet } from 'react-router-dom';
import Home from "./pages/Home/Home";
import AEDhowto from "./pages/AED/AEDhowto";
import CPRhowto from "./pages/CPR/CPRhowto";
import Quiz from "./pages/Quiz/Quiz";
import Choking from "./pages/Choking/Choking";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Upload from "./pages/Upload/Upload";
import FAQ from "./pages/FAQ/FAQ";

import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer.js";

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/aedhowto' element={<AEDhowto />} />
          <Route path='/cprhowto' element={<CPRhowto />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/choking' element={<Choking />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/faq' element={<FAQ />} />
   
          <Route path='*' element={<p>nothing to see here, move on mate.</p>} />
      </Routes>

      <Footer />

      <Outlet />
    </div>
  );
}

export default App;
