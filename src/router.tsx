import React from "react";

import { Routes, Route } from "react-router-dom";

import * as Pages from "./pages";
import PrivateRoute from "./components/PrivateRoute";

export const Router: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  return (
    <Routes>
      <Route path="/" element={<Pages.Signin />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Pages.Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Router;
