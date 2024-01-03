import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import AddPost from "./Components/AddPost";
import Alluser from "./Components/Alluser";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostDetail from "./Components/PostDetail";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/alluser" element={<Alluser />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
