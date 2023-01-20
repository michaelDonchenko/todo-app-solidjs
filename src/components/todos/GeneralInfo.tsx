import {Accessor} from "solid-js";
import {Todo} from "~/routes/(home)";
import styles from "./TodoList.module.scss";

interface GeneralInfoProps {
  todos: Accessor<Todo[]>;
}

const completedTodos = (todos: Accessor<Todo[]>) => {
  return todos().filter((todo) => todo.completed).length;
};

const GeneralInfo = (props: GeneralInfoProps) => {
  const {todos} = props;

  return (
    <div class={styles.generalInfoContainer}>
      <h2>Total todos: {todos().length}</h2>
      <h2>Completed todos: {completedTodos(todos)}</h2>
    </div>
  );
};

export default GeneralInfo;
