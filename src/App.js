import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    if (todos.length !== 0)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1>BASIC TODO APP</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div className="controls">
        <input
          ref={todoNameRef}
          id="outlined-basic"
          placeholder="ENTER TODO HERE"
          variant="outlined"
        />
        <Button onClick={handleAddTodo} variant="outlined">
          Add Todo
        </Button>
        <Button onClick={handleClearTodos} variant="outlined">
          Clear Completed Todos
        </Button>
      </div>

      <div className="todo-left">
        {todos.filter((todo) => !todo.complete).length} left to do
      </div>
    </div>
  );
}

export default App;
