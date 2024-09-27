import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </>
  );
}

export default App;
