import React from "react";
import "./App.css";

function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div className="todo">
      <label htmlFor={`todo-${todo.id}`}>
        <input
          className="checkbox"
          type="checkbox"
          id={`todo-${todo.id}`} // Unique ID for the checkbox
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        <span className={todo.complete ? 'completed' : ''}>
          {todo.name}
        </span>
      </label>
    </div>
  );
}

export default Todo;
