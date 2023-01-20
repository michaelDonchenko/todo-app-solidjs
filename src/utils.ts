import {Todo} from "./routes/(home)";

export const getTodosFromStorage = (key: string) => {
  if (typeof window === "undefined") return null;

  const todos = window.localStorage.getItem(key);

  if (todos) {
    return JSON.parse(todos) as Array<Todo>;
  } else {
    return null;
  }
};

export const setTodosToLocalStorage = (todos: Array<Todo>) => {
  if (typeof window === "undefined") return;

  const stringifiedTodos = JSON.stringify(todos);
  window.localStorage.setItem("todos", stringifiedTodos);
};
