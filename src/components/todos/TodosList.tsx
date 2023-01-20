import {Accessor, createEffect, createSignal, Index} from "solid-js";
import {Todo} from "~/routes/(home)";
import styles from "./TodoList.module.scss";

interface TodoListProps {
  todos: Accessor<Todo[]>;
  toggleStatus: (id: number) => void;
  onDeleteAll: () => void;
  onDeleteCompleted: (ids: number[]) => void;
}

const TodosList = (props: TodoListProps) => {
  const {todos, toggleStatus, onDeleteAll, onDeleteCompleted} = props;
  const [completedIds, setCompletedIds] = createSignal<number[]>([]);

  createEffect(() => {
    const completed: number[] = [];
    todos().forEach((todo) => {
      todo.completed ? completed.push(todo.id) : null;
    });

    setCompletedIds(completed);
  });

  return (
    <div>
      <div class={styles.actionsContainer}>
        <button class={styles.deleteButton} onclick={() => onDeleteCompleted(completedIds())}>
          Delete completed
        </button>
        <button class={styles.deleteButton} onClick={onDeleteAll}>
          Delete all
        </button>
      </div>
      <ul>
        <Index each={todos()}>
          {(todo, index) => (
            <li class={styles.todoItem}>
              <span class={todo().completed ? styles.completed : ""}>
                #{index + 1} {todo().text}
              </span>

              <button class={styles.toggleButton} onClick={() => toggleStatus(todo().id)}>
                toggle
              </button>
            </li>
          )}
        </Index>
      </ul>
    </div>
  );
};

export default TodosList;
