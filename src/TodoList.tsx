import {TodoItem} from "./TodoItem.tsx";
import styles from "./Todolist.module.css"

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
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddTask: (todoId: string, text: string) => void;
    onToggleTask: (todoId: string, taskId: string) => void;
    onDeleteTask: (todoId: string, taskId: string) => void;
    onUpdateTitle: (todoId:string, text: string) => void;
    onUpdateTask: (todoId:string, taskId: string, text: string) => void;
};

export const TodoList = ({todos, onToggle, onDelete, onUpdateTitle, onAddTask, onDeleteTask, onToggleTask, onUpdateTask}: Props) => {
    console.log("TodoList render");
    return (
        <div className={styles.todolist}>
            {todos.map(todo => (
                <TodoItem todo={todo} key={todo.id} onToggle={onToggle} onDelete={onDelete} onUpdateTitle={onUpdateTitle}
                          onAddTask={onAddTask} onDeleteTask={onDeleteTask} onToggleTask={onToggleTask} onUpdateTask={onUpdateTask}/>
            ))}
        </div>
    );
};