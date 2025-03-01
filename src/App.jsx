import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import FolderList from "./Pages/FolderList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/folder-list"} element={<FolderList />} />
      </Routes>
    </>
  );
}

export default App;
