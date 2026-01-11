import * as React from "react";
import styles from './Todolist.module.css'
import {AddTaskForm} from "./AddTaskForm.tsx";

type  Task = {
    id: string;
    text: string;
    completed: boolean;
}
type Todo = {
    id: string;
    text: string;
    completed: boolean;
    tasks: Task[]
};

type Props = {

    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddTask: (todoId: string, text: string) => void;
};

export const TodoItem = React.memo (({ todo, onToggle,onDelete, onAddTask }: Props) => {
    console.log("TodoItem render:", todo.text);

    return (<>
            <div className={styles.todoItem}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={()=>onToggle(todo.id)}
                />
                <span>{todo.text}</span>
                <button onClick={()=>onDelete(todo.id)}>Delete</button>

                    <AddTaskForm onAddTask={onAddTask} todoId={todo.id}/>
                <div >
                    {todo.tasks.map(task => (<>


                            <span>{task.text}</span>

                    </>

                    ))}
                </div>

            </div>
    </>

    );
});