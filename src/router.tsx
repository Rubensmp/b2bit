import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import * as Pages from "./pages";
import PrivateRoute from "./components/PrivateRoute";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Pages.Profile />} />
      </Route>
      <Route path="/signin" element={<Pages.Signin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;
