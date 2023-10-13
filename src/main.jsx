import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AuthProvider from "./contexts/AuthProvider";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Sell from "./components/Sell";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Property from "./components/Property";
import EditProperty from "./components/EditProperty";
import Profile from "./components/Profile";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/sell"
              element={
                <PrivateRoute>
                  <Sell />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/property/:id"
              element={
                <PrivateRoute>
                  <EditProperty />
                </PrivateRoute>
              }
            />
            <Route path="/property/:id" element={<Property />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
