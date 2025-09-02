import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUpload,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    const newId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos([{ id: newId, title: newTodo, completed: false }, ...todos]);
    setNewTodo("");
  };

  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditClick = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoTitle(todo.title);
  };

  const handleUpdateClick = (todo) => {
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...t, title: editTodoTitle } : t))
    );
    setEditTodoId(null);
    setEditTodoTitle("");
  };

  const newItemSection = (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input">
        <input
          className="addtodo"
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (todos.length === 0) {
    content = <p>No tasks yet. Add a new one!</p>;
  } else {
    content = todos.map((todo) => (
      <article key={todo.id}>
        <div className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            id={todo.id}
            onChange={() => handleToggleCompleted(todo.id)}
          />
          {editTodoId === todo.id ? (
            <input
              type="text"
              value={editTodoTitle}
              onChange={(e) => setEditTodoTitle(e.target.value)}
            />
          ) : (
            <label
              htmlFor={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </label>
          )}
        </div>
        <div className="actions-container">
          {editTodoId === todo.id ? (
            <button className="confirm" onClick={() => handleUpdateClick(todo)}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          ) : (
            <button className="edit" onClick={() => handleEditClick(todo)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
          <button className="trash" onClick={() => handleDeleteTodo(todo.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </article>
    ));
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
