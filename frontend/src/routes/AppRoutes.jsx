import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Resource from '../screens/Resource';
import Save  from '../screens/Save';
import Update from '../screens/update';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/save" element={<Save />} />
        <Route path="/update" element={<Update />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
