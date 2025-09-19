import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await axios.post("http://localhost:5000/todos", { text });
    setTodos([...todos, res.data]);
    setText("");
  };

  const toggleTodo = async (id) => {
    const res = await axios.put(`http://localhost:5000/todos/${id}`);
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-600 drop-shadow-sm">
          ✅ To-Do List
        </h1>

        {/* Input Section */}
        <div className="flex mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow border border-gray-300 px-4 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            placeholder="Tambah tugas..."
          />
          <button
            onClick={addTodo}
            className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white px-6 py-3 rounded-r-xl transition duration-200 shadow-md"
          >
            Add
          </button>
        </div>

        {/* List Section */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-white hover:bg-indigo-50 transition-all px-4 py-3 rounded-xl shadow-sm border border-gray-200"
            >
              <div
                className="flex items-center gap-3 cursor-pointer select-none"
                onClick={() => toggleTodo(todo._id)}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="w-5 h-5 accent-indigo-500 cursor-pointer"
                />
                <span
                  className={`text-lg transition ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700 font-medium"
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700 transition text-lg"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
