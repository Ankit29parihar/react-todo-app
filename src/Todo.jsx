import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";


function Todo() {
  const [todos, setTodos] = useState([
    { id: uuidv4(), task: "Sample Task", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [error , setError] = useState("");



  // input change
  const changeHandler = (event) => {
    setNewTodo(event.target.value);
  };

  // add todo
  const formHandler = (e) => {
    e.preventDefault();

    if (newTodo.trim() === "") {
      setError("please enter first task and then submit")
      return;
    }



    if (editId !== null) {
      const updateTodos = todos.map((todo) => {
        return todo.id === editId ? { ...todo, task: newTodo } : todo;
      });

      setTodos(updateTodos);
      setEditId(null);
      setNewTodo("");
      setError("")
      console.log(updateTodos);
      return;
    }

    setTodos([...todos, { id: uuidv4(), task: newTodo, completed: false }]);

    setNewTodo(""); // ✅ input clear
     setError("")
  };

  // delete todo
  const deleteTodoHandler = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };

  // Update todo
  const startEdithandler = (todo) => {
    setEditId(todo.id);
    setNewTodo(todo.task);
  };

  // CheckBox
  const checkBoxHandler = (id) => {
    const updateTodos = todos.map((todo) => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });

    setTodos(updateTodos);
  };



  return (
    <div className="todo-page">
      <div className="todo-card">
        <header className="todo-header">
          <p className="todo-kicker">Everyday Flow</p>
          <h1>Add Your Todo</h1>
          <p className="todo-subtitle">
            Clean, focused, and fast. Keep your next action visible.
          </p>
        </header>

        <form className="todo-form" onSubmit={formHandler}>
          <label className="todo-label" htmlFor="task">
            Task
          </label>

          <div className="todo-input-row">
            <input
              className="todo-input"
              type="text"
              id="task"
              placeholder="Write your next task..."
              value={newTodo}
              onChange={changeHandler}
            />

            <button className="todo-add-btn">
              <IoIosAddCircleOutline className="todo-add-icon" />
              {editId !== null ? "Save" : "Add"}
            </button>
          </div>
          {error && (
            <p className="todo-error" role="alert">
              {error}
            </p>
          )}
        </form>

        <section className="todo-list-section">
          <div className="todo-list-header">
            <h2>List of todos</h2>
            <span className="todo-count">{todos.length}</span>
          </div>

          <ul className="todo-list">
            {todos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <span
                  className={`todo-text ${todo.completed ? "is-done" : ""}`}
                  style={{display: "flex" , alignItems: "center"}}
                >
                  <input
                    className="todo-checkbox"
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                      checkBoxHandler(todo.id);
                    }}
                  />
                  {todo.task}
                </span>

                <div className="todo-actions">
                      <button
                        className="todo-btn todo-btn-delete"
                        onClick={() => deleteTodoHandler(todo.id)}
                      >
                        Delete
                      </button>

                      <button
                        className="todo-btn todo-btn-edit"
                        onClick={() => startEdithandler(todo)}
                      >
                        Edit
                      </button>
                   
                  </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Todo;
