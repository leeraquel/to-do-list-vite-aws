import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="w-full p-2 mb-2 rounded border border-gray-300"
      />
      <Button
        onClick={addTodo}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        추가
      </Button>
      <ul className="list-disc pl-5">
        {todos.map((todo, index) => (
          <li key={index} className="mb-2">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
