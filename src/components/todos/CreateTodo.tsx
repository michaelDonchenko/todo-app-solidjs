import {Accessor, Setter} from "solid-js";
import styles from "./TodoList.module.scss";

interface CreateTodoProps {
  newTodo: Accessor<string>;
  setNewTodo: Setter<string>;
  onAddTodo: () => void;
}

const CreateTodo = (props: CreateTodoProps) => {
  const {newTodo, onAddTodo, setNewTodo} = props;

  return (
    <div class={styles.inputContainer}>
      <input
        class={styles.textInput}
        value={newTodo()}
        onInput={(event) => setNewTodo(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onAddTodo();
          }
        }}
        type="text"
      />
      <button class={styles.button} onClick={() => onAddTodo()}>
        Add
      </button>
    </div>
  );
};

export default CreateTodo;
