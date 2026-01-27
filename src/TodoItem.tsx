import * as React from "react";

import {AddTaskForm} from "./AddTaskForm.tsx";
import {TaskItem} from "./TaskItem.tsx";
import {useEffect, useState} from "react";
import {useTodoProgress} from "./hooks/useTodoProgress.ts";
import {useTaskFilter} from "./hooks/useTaskFilter.ts";
import {FilterButtons} from "./components/FilterButtons.tsx";
import {Checkbox, IconButton, Stack, TextField, Typography, LinearProgress, Paper, Box} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import {AddForm} from "./AddForm.tsx";

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
    tasks: Task[];
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

    useEffect(() => {
        if (!isEditing) {
            setTitle(todo.text);
        }
    }, [todo.text, isEditing]);

    const {
        filter,
        visibleTasks,
        setFilter
    } = useTaskFilter(todo.tasks);
// вынесли логику в хук useTodoProgress
    const {
        progress,
        completedTasks,
        totalTasks,
        hasTasks
    } = useTodoProgress(todo);

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
    const getProgressColor = (value: number) => {
        if (value < 40) return "#f44336";   // red
        if (value < 80) return "#ff9800";   // orange
        return "#4caf50";                   // green
    };

    return (<Paper elevation={2} sx={{ p: 2, mr:2, mb:2,
            // width: 'fit-content',    // Ширина под контент
            height: 'fit-content',   // Высота под контент
            alignSelf: 'flex-start' }}>
            <Stack direction="row" alignItems="center" justifyContent='space-between'>

                <Checkbox

                    checked={todo.completed}
                    disabled={hasTasks}
                    onChange={() => onToggle(todo.id)}
                />

                {isEditing ? (
                    <TextField
                        value={title}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={finishEdit}
                        onKeyDown={onKeyDown}
                        sx={{ ml: 1, textAlign:"center" }}
                    />
                ) : (
                    <Typography onDoubleClick={startEdit}
                                sx={{
                                    cursor: "pointer",
                                    userSelect: "none",
                                    textDecoration: todo.completed ? "line-through" : "none",
                                    opacity: todo.completed ? 0.6 : 1,
                                }}>
                         {todo.text}
                    </Typography>
                )}
                <IconButton aria-label="delete" onClick={()=>{onDelete(todo.id)}}>
                           <DeleteIcon />
                         </IconButton>

            </Stack>
            <Box mt={1}>
                <LinearProgress variant="determinate" value={progress} sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:'lightgray',
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: getProgressColor(progress),
                        transition: "all 0.3s ease",
                    },
                }} />
                {hasTasks && <Typography variant="caption" color="text.success">
                    {completedTasks} / {totalTasks}
                </Typography>}
            </Box>
            <Box mt={2}>

                <AddTaskForm onAddTask={onAddTask} todoId={todo.id} />
            </Box>
            {/*<AddTaskForm onAddTask={onAddTask} todoId={todo.id}/>*/}

            {visibleTasks.map(task => (
                                            <TaskItem key={task.id}
                                                 todoId={todo.id}
                                                      task={task}
                                                 onToggle={onToggleTask}
                                                 onDelete={onDeleteTask}
                                                 onUpdateTask={onUpdateTask}
                />


            ))}
        <Box mt={2}>
            <FilterButtons
                value={filter}
                onChange={setFilter}
            />
        </Box>
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


        </Paper>

    );
});