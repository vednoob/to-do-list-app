import axios from "axios";
import { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddTodo = (title) => {
    axios
      .post("http://localhost:3000/jobs", { title })
      .then((res) => setTodos([...todos, res.data]))
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
        ))}
      </ul>
    </div>
  );
}

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim()) {
      onAddTodo(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

function TodoItem({ todo, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      axios
        .delete(`http://localhost:3000/jobs/${todo.id}`)
        .then(() => onDelete(todo.id))
        .catch((err) => console.log(err));
    }
  };

  return (
    <li>
      {todo.title}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TodoList;
