import React from "react";
import "@mantine/core/styles.css";
import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
