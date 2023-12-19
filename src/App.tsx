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
            <li key={todo.id}>{todo.inputValue}</li>
          ))}
        </ul>
      </div>
    </ThemeProvider>
  );
}

export default App;
