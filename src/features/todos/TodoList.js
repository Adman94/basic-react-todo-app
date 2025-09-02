import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "../api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUpload,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  // State to manage the currently edited todo item's ID
  const [editTodoId, setEditTodoId] = useState(null);
  // State to manage the input value of the edited todo's title
  const [editTodoTitle, setEditTodoTitle] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const handleEditClick = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoTitle(todo.title);
  };

  const handleUpdateClick = (todo) => {
    updateTodo({ ...todo, title: editTodoTitle });
    setEditTodoId(null);
    setEditTodoTitle("");
  };

  const newItemSection = (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
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
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            {/* Conditional rendering for the todo title and edit field */}
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
            {/* Conditional rendering for the edit/update button */}
            {editTodoId === todo.id ? (
              <button
                className="confirm"
                onClick={() => handleUpdateClick(todo)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            ) : (
              <button className="edit" onClick={() => handleEditClick(todo)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}
            <button
              className="trash"
              onClick={() => deleteTodo({ id: todo.id })}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
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
