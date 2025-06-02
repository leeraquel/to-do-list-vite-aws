// src/App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { initGA, logPageview } from "@/lib/analytics";
import { Navigation } from "@/components/Navigation";
import UpdateNotification from "@/components/UpdateNotification";
import Home from "@/pages/Home";
import TodoList from "@/pages/TodoList";
import PostIt from "@/pages/PostIt";
import Notepad from "@/pages/Notepad";

function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    logPageview(location.pathname + location.search);
  }, [location]);

  return null;
}

const App: React.FC = () => {
  // 앱 마운트 시 한 번 GA 초기화
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Router>
      <RouteChangeTracker />

      <div className="min-h-screen bg-gray-50">
        <Navigation />

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
