import {createSignal, onMount} from "solid-js";
import Counter from "~/components/Counter";
import CreateTodo from "~/components/todos/CreateTodo";
import GeneralInfo from "~/components/todos/GeneralInfo";
import TodosList from "~/components/todos/TodosList";
import {getTodosFromStorage, setTodosToLocalStorage} from "~/utils";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Home = () => {
  const [todos, setTodos] = createSignal<Array<Todo>>([]);
  const [newTodo, setNewTodo] = createSignal("");

  onMount(() => {
    setTodos(getTodosFromStorage("todos") || []);
  });

  const addTodo = () => {
    if (!newTodo()) return;
    setTodos((prev) => [...prev, {id: Date.now(), completed: false, text: newTodo()}]);
    setNewTodo("");
    setTodosToLocalStorage(todos());
  };

  const toggleStatus = (id: number) => {
    setTodos((prev) => {
      return prev.map((todo) => (todo.id !== id ? todo : {...todo, completed: !todo.completed}));
    });
    setTodosToLocalStorage(todos());
  };

  const deleteAll = () => {
    setTodos([]);
    setTodosToLocalStorage(todos());
  };

  const deleteCompleted = (ids: number[]) => {
    setTodos((prev) => prev.filter((todo) => !ids.includes(todo.id)));
    setTodosToLocalStorage(todos());
  };

  return (
    <main>
      <h1>Todo App Solid.js</h1>
      <CreateTodo newTodo={newTodo} setNewTodo={setNewTodo} onAddTodo={addTodo} />
      <GeneralInfo todos={todos} />
      <TodosList
        todos={todos}
        toggleStatus={toggleStatus}
        onDeleteAll={deleteAll}
        onDeleteCompleted={deleteCompleted}
      />

      {/* <Counter /> */}
    </main>
  );
};

export default Home;
