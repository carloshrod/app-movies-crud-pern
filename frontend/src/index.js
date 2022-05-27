import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import Navbar from "./components/Navbar";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<App screen="Listado de Películas" />} />
        <Route path="/create" element={<App screen="Crear Película" />} />
        <Route path="/edit/:id" element={<App screen="Editar Película" />} />
      </Routes>
    </Router>
    <ToastContainer position="top-center" newestOnTop transition={Flip}/>
  </React.StrictMode>

);
