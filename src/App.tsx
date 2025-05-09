import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import PostIt from './pages/PostIt';
import Notepad from './pages/Notepad';
import UpdateNotification from './components/UpdateNotification';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/" style={{ color: 'black' }}>Home</Link>
                    </li>
                    <li>
                        <Link to="/todos" style={{ color: 'black' }}>Todo List</Link>
                    </li>
                    <li>
                        <Link to="/postit" style={{ color: 'black' }}>포스트잇</Link>
                    </li>
                    <li>
                        <Link to="/notepad" style={{ color: 'black' }}>메모장</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/postit" element={<PostIt />} />
                <Route path="/notepad" element={<Notepad />} />
            </Routes>
            <UpdateNotification />
        </Router>
    );
}

export default App;