import React from "react";
import Crud from "./Crud"; // Import the Crud component
import SongsCrud from "./songsCrud";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Crud />} />
          <Route path="/songs" element={<SongsCrud />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
