import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProjectWizard from "./pages/ProjectWizard";
import { TestimonialsProvider } from "./context/TestimonialsContext";

function App() {
  return (
    <div className="App">
      <TestimonialsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/start-project" element={<ProjectWizard />} />
          </Routes>
        </BrowserRouter>
      </TestimonialsProvider>
    </div>
  );
}

export default App;


