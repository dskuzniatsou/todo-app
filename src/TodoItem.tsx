import * as React from "react";
import styles from './Todolist.module.css'
import {AddTaskForm} from "./AddTaskForm.tsx";
import {TaskItem} from "./TaskItem.tsx";
import {useMemo, useState} from "react";

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
type TaskFilter = 'all' | 'active' | 'completed'


type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddTask: (todoId: string, text: string) => void;
    onToggleTask: (todoId: string, taskId: string) => void;
    onDeleteTask: (todoId: string, taskId: string) => void;
};

export const TodoItem = React.memo (({ todo, onToggle,onDelete,
                                                                            onAddTask, onToggleTask,onDeleteTask}: Props) => {
    console.log("TodoItem render:", todo.text);
    const [filterTask, setFilterTask] = useState<TaskFilter>('all')
    const visibleTasks = useMemo(() => {
        return todo.tasks.filter(task => {
            if (filterTask === 'all') return true;
            if (filterTask === 'active') return !task.completed;
            if (filterTask === 'completed') return task.completed;
            return true;
        });
    }, [todo.tasks, filterTask]);
    return (<div className={styles.todoItem}>
            <div >
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={()=>onToggle(todo.id)}

                />
                <span>{todo.text}</span>
                <button onClick={()=>onDelete(todo.id)}>X</button>
            </div>
                    <AddTaskForm onAddTask={onAddTask} todoId={todo.id}/>

                    {visibleTasks.map(task => (<TaskItem key={task.id}
                                                       todoId={todo.id}
                                                        task={task}
                                                        onToggle={onToggleTask}
                                                        onDelete={onDeleteTask}/>
                    ))}
            <div style={{ marginBottom: '10px' }}>
                <button
                    onClick={() => setFilterTask('all')}
                    style={{ fontWeight: filterTask === 'all' ? 'bold' : 'normal' }}
                >
                    All
                </button>
                <button
                    onClick={() => setFilterTask('active')}
                    style={{ fontWeight: filterTask === 'active' ? 'bold' : 'normal' }}
                >
                    Active
                </button>
                <button
                    onClick={() => setFilterTask('completed')}
                    style={{ fontWeight: filterTask === 'completed' ? 'bold' : 'normal' }}
                >
                    Completed
                </button>
            </div>


    </div>

    );
});