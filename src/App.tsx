import React, { useState } from "react";
import "./App.css";
import MenuAppBar from "./components/Header";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MenuAppBar />
        <div className="top">
          <div className="top-left">
            <h1>
              Make your original todo list.<br></br>Start your great journey.
            </h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                className="inputText"
                value={inputValue} //これがないと追加後もテキストが入ったまま
              />
              <input
                type="submit"
                value="create"
                className="submitButton"
              ></input>
            </form>
          </div>
          <img
            src="./images/drawkit-transport-scene-1.svg"
            alt=""
            width="500px"
            className="top-img"
          />
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </ThemeProvider>
  );
}

export default App;
