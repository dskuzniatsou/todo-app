import * as React from "react";
import styles from './Todolist.module.css'
import {AddTaskForm} from "./AddTaskForm.tsx";
import {TaskItem} from "./TaskItem.tsx";
import {useEffect, useState} from "react";
import {useTodoProgress} from "./hooks/useTodoProgress.ts";
import {useTaskFilter} from "./hooks/useTaskFilter.ts";
import {FilterButtons} from "./components/FilterButtons.tsx";

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
// type TaskFilter = 'all' | 'active' | 'completed'


type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddTask: (todoId: string, text: string) => void;
    onUpdateTitle: (todoId: string, text: string) => void;
    onToggleTask: (todoId: string, taskId: string) => void;
    onDeleteTask: (todoId: string, taskId: string) => void;
    onUpdateTask: (todoId:string, taskId: string, text: string) => void;
};

export const TodoItem = React.memo(({
                                        todo, onToggle, onDelete, onUpdateTitle,
                                        onAddTask, onToggleTask, onDeleteTask, onUpdateTask
                                    }: Props) => {
    console.log("TodoItem render:", todo.text);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.text);

    // useEffect(() => {
    //     setTitle(todo.text);
    // }, [todo.text]);
    useEffect(() => {
        if (!isEditing) {
            setTitle(todo.text);
        }
    }, [todo.text, isEditing]);
    // const handleSave = () => {
    //     const trimmed = title.trim();
    //
    //     if (trimmed) {
    //         onUpdateTitle(todo.id, trimmed);
    //     } else {
    //         setTitle(todo.text); // откат если пусто
    //     }
    //
    //     setIsEditing(false);
    // };
    //
    // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         handleSave();
    //     }
    //     if (e.key === 'Escape') {
    //         setTitle(todo.text);
    //         setIsEditing(false);
    //     }
    // };

    const {
        filter,
        visibleTasks,
        setFilter
    } = useTaskFilter(todo.tasks);

    // const [filterTask, setFilterTask] = useState<TaskFilter>('all')
    // const visibleTasks = useMemo(() => {
    //     return todo.tasks.filter(task => {
    //         if (filterTask === 'all') return true;
    //         if (filterTask === 'active') return !task.completed;
    //         if (filterTask === 'completed') return task.completed;
    //         return true;
    //     });
    // }, [todo.tasks, filterTask]);
// вынесли логику в хук useTodoProgress
    const {
        progress,
        completedTasks,
        totalTasks,
        hasTasks
    } = useTodoProgress(todo);

    // const totalTasks = todo.tasks.length;
    // const completedTasks = todo.tasks.filter(t => t.completed).length;
    //
    //
    // const progress = useMemo(() => {
    //
    //     const totalTasks = todo.tasks.length;
    //
    //     if (totalTasks === 0) {return todo.completed ? 100 : 0 }
    //
    //     const completedTasks = todo.tasks.filter(t => t.completed).length;
    //
    //    return  Math.round((completedTasks / totalTasks) * 100)
    //
    // }, [todo.tasks, todo.completed]);

    const startEdit = () => {
        setTitle(todo.text);
        setIsEditing(true);
    };

    const finishEdit = () => {
        const trimmed = title.trim();
        if (trimmed) {
            onUpdateTitle(todo.id, trimmed);
        }
        console.log('finishEdit');
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setTitle(todo.text);
        setIsEditing(false);
    };
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') finishEdit();
        if (e.key === 'Escape') cancelEdit();
    };


    return (<div className={styles.todoItem}>
            <div>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    disabled={hasTasks}
                    onChange={() => onToggle(todo.id)}
                />


                {isEditing ? (
                    <input
                        value={title}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={finishEdit}
                        onKeyDown={onKeyDown}
                    />
                ) : (
                    <span onDoubleClick={startEdit}>
                         {todo.text}
                    </span>
                )}
                <button onClick={() => onDelete(todo.id)}>X</button>
            </div>
            <div className={styles.progress}>
                <div className={styles.progressFill} style={{width: `${progress}%`}}>
                </div>
            </div>

            {hasTasks && <div style={{fontSize: '12px', color: '#666'}}>
                {completedTasks} / {totalTasks}
            </div>}
            <AddTaskForm onAddTask={onAddTask} todoId={todo.id}/>

            {visibleTasks.map(task => (<TaskItem key={task.id}
                                                 todoId={todo.id}
                                                 task={task}
                                                 onToggle={onToggleTask}
                                                 onDelete={onDeleteTask}
                                                 onUpdateTask={onUpdateTask}
                />
            ))}

            <FilterButtons
                value={filter}
                onChange={setFilter}
            />
            {/*<div style={{marginBottom: '10px'}}>*/}
            {/*    <button*/}
            {/*        onClick={() => setFilter('all')}*/}
            {/*        style={{fontWeight: filter === 'all' ? 'bold' : 'normal'}}*/}
            {/*    >*/}
            {/*        All*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        onClick={() => setFilter('active')}*/}
            {/*        style={{fontWeight: filter === 'active' ? 'bold' : 'normal'}}*/}
            {/*    >*/}
            {/*        Active*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        onClick={() => setFilter('completed')}*/}
            {/*        style={{fontWeight: filter === 'completed' ? 'bold' : 'normal'}}*/}
            {/*    >*/}
            {/*        Completed*/}
            {/*    </button>*/}
            {/*</div>*/}


        </div>

    );
});