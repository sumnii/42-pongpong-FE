import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "@main/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          {/* TODO: 경로 일치하지 않으면 404 NON FOUND 페이지 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
