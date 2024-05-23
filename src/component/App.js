import React from "react";
import { useState, useEffect } from "react";
import Splash from "../pages/Splash";
import Main from "../pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuList from "../pages/MenuList";
import MenuDetail from "../pages/MenuDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { AuthProvider } from "../Context/AuthContext";
import ReviewWrite from "../pages/ReviewWrite";
import ReviewList from "../pages/ReviewList";
import UserPicture from "../pages/UserPicture";
import MenuRestructure from "../pages/MenuRestructure";
import ReviewUpdate from "../pages/ReviewUpdate";

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
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="/main" element={<Main />} />
              <Route path="/main/picture/" element={<UserPicture />} />
              <Route
                path="/main/picture/resutucture"
                element={<MenuRestructure />}
              />
              <Route path="/main/menulist/:id" element={<MenuList />} />
              <Route
                path="/main/menulist/:id/:Food_id"
                element={<MenuDetail />}
              />
              <Route
                path="/main/menulist/:id/reviewList"
                element={<ReviewList />}
              />
              <Route
                path="/main/menulist/:id/reviewList/write"
                element={<ReviewWrite />}
              />
              <Route
                path="/main/menulist/:id/reviewList/update"
                element={<ReviewUpdate />}
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      )}
    </>
  );
}

export default App;
