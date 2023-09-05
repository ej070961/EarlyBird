import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import FlockPage from "./Components/views/FlockPage/FlockPage";
import MainPage from "./Components/views/MainPage/MainPage";
import LoginPage from "./Components/views/LoginPage/LoginPage";
import RegisterPage from "./Components/views/RegisterPage/RegisterPage";
import MyPage from "./Components/views/MyPage/MyPage";
import PostDetail from "./Components/views/PostDetail/PostDetail";
import FlockDetail from "./Components/views/FlockPage/FlockDetail";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/flock" element={<FlockPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/post/:postId" element={<PostDetail/>}/>
          <Route path="/flock/:flockId" element={<FlockDetail/>}/>
          
        </Routes>
        <footer>&copy; {new Date().getFullYear()} Early Bird </footer>

    </BrowserRouter>
  );
}

export default App;
