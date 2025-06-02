// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import UpdateNotification from "./components/UpdateNotification";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import PostIt from "./pages/PostIt";
import Notepad from "./pages/Notepad";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* nav 가 fixed 이므로, 위 공간만큼 padding-top을 줍니다 (h-16) */}
        <div className="pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todos" element={<TodoList />} />
              <Route path="/postit" element={<PostIt />} />
              <Route path="/notepad" element={<Notepad />} />
            </Routes>
          </div>
        </div>

        <UpdateNotification />
      </div>
    </Router>
  );
};

export default App;
