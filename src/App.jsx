import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Ambil data dari backend
  useEffect(() => {
    axios.get("http://localhost:5000/todos").then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (task.trim() === "") return;
    axios.post("http://localhost:5000/todos", { text: task }).then((res) => {
      setTodos([...todos, res.data]);
      setTask("");
    });
  };

  const toggleTodo = (id) => {
    axios.put(`http://localhost:5000/todos/${id}`).then((res) => {
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-[400px]">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          ✅ To-Do List (MongoDB)
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Tambah tugas..."
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            +
          </button>
        </div>

        {/* List */}
        <ul className="space-y-3">
          {todos.length === 0 && (
            <p className="text-gray-400 text-center">Belum ada tugas 🙌</p>
          )}

          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow-sm hover:bg-gray-100 transition"
            >
              <span
                onClick={() => toggleTodo(todo._id)}
                className={`cursor-pointer select-none ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700 transition"
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
