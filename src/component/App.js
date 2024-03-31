import React from "react";
import { useState, useEffect } from "react";
import Splash from "../pages/Splash";
import Main from "../pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
            <Route index element={<Main />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
