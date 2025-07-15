import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todolist.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Todolist() {
  const [todos, setTodos] = useState([
    { task: "sample-task", id: uuidv4(), status: false, due: "" },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState(null); 

  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState("all");

  const doneTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: true } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("fade-out");
    setTimeout(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, 300);
    toast.error("Task deleted!");
  };

const addNewTask = () => {
  if (newTodo.trim() === "") return;

  let dueString = dueDate ? dueDate.toISOString() : "";

  setTodos((prevTodos) => [
    ...prevTodos,
    { task: newTodo, id: uuidv4(), status: false, due: dueString },
  ]);
  setNewTodo("");
  setDueDate(null);
  toast.success("Task added!");
};

  const updateTaskValue = (e) => setNewTodo(e.target.value);
  const toggleMode = () => setDarkMode(!darkMode);

  const markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, status: true }))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "done") return todo.status;
    if (filter === "pending") return !todo.status;
  });

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <button onClick={toggleMode} className="btn mode-toggle">
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <input
        type="text"
        value={newTodo}
        placeholder="Enter task"
        onChange={updateTaskValue}
        className="input"
      />
      <DatePicker
  selected={dueDate}
  onChange={(date) => setDueDate(date)}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  dateFormat="Pp"
  placeholderText="Select due date & time"
  className="input"
/>
<br />
      <button onClick={addNewTask} className="btn add">
        Add Task
      </button>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("done")}>Done</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <h4 className="heading">Todo List</h4>
      <hr className="divider" />

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} id={todo.id} className="todo-item fade-in">
            <div>
              <span className={todo.status ? "task done" : "task"}>
                {todo.task}
              </span>
              <div className="due">
                {todo.due && (
                  <small>Due: {new Date(todo.due).toLocaleString()}</small>
                )}
              </div>
            </div>
            <div className="btn-group">
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn delete"
              >
                Delete
              </button>
              <button onClick={() => doneTodo(todo.id)} className="btn done">
                Done
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={markAllDone} className="btn mark-all">
        Mark All Done
      </button>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
