import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import DashBoard from "./pages/DashBoard";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import FooterBar from "./components/FooterBar";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<DashBoard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="create-post" element={<CreatePost />} />
          <Route path="update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="projects" element={<Projects />} />
        <Route path="search" element={<Search />} />
        <Route path="posts/:postSlug" element={<PostPage/>} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
      <FooterBar />
    </BrowserRouter>
  );
}

export default App;
