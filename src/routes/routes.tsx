import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/Home';
import TodoList from '../pages/TodoList';
import PostIt from '../pages/PostIt';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/todos">Todo List</Link>
                    </li>
                    <li>
                        <Link to="/postit">포스트잇</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/postit" element={<PostIt />} />
            </Routes>
        </Router>
    );
}

export default App;
