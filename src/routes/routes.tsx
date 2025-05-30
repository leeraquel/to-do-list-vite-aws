import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/Home';
import TodoList from '../pages/TodoList';
import PostIt from '../pages/PostIt';
import Notepad from '../pages/Notepad';

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
                    <li>
                        <Link to="/notepad">메모장</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/postit" element={<PostIt />} />
                <Route path="/notepad" element={<Notepad />} />
            </Routes>
        </Router>
    );
}

export default App;
