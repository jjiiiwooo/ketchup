import React from "react";
import { useState, useEffect } from "react";
import Splash from "../pages/Splash";
import Main from "../pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuList from "../pages/MenuList";
import MenuDetail from "../pages/MenuDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/main" element={<Main />} />
            <Route path="/main/menulist/:id" element={<MenuList />} />
            <Route
              path="/main/menulist/:id/:Food_id"
              element={<MenuDetail />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
