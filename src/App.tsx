import { Route, Routes, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import Root from "./components/Root/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddMouse from "./pages/AddMouse";
import Compare from "./pages/Compare";
import MouseFinder from "./pages/MouseFinder";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login-my-secret-panel" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="compare" element={<Compare />} />
        <Route path="finder" element={<MouseFinder/>} />
        <Route path="add" element={<Login />} />
        <Route
          path="add-mouse"
          element={
            <ProtectedRoute>
              <AddMouse />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;