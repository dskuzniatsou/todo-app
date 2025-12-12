import * as React from "react";
import styles from './Todolist.module.css'

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export const TodoItem = React.memo (({ todo, onToggle,onDelete }: Props) => {
    console.log("TodoItem render:", todo.text);
    return (
        <div className={styles.todoItem}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={()=>onToggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={()=>onDelete(todo.id)}>Delete</button>
        </div>
    );
});