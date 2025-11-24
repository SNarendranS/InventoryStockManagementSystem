import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Layouts/Header";
import Body from "./Layouts/Body";
import Login from "./Pages/Login";
import RequireAuth from "./Auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <RequireAuth>
              <Header />
              <Body />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
