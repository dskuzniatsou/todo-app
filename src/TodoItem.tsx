import * as React from "react";

import {AddTaskForm} from "./AddTaskForm.tsx";
import {TaskItem} from "./TaskItem.tsx";
import {useCallback, useEffect, useState} from "react";
import {useTodoProgress} from "./hooks/useTodoProgress.ts";
import {useTaskFilter} from "./hooks/useTaskFilter.ts";
import {FilterButtons} from "./components/FilterButtons.tsx";
import {Checkbox, IconButton, Stack, TextField, Typography, LinearProgress, Paper, Box} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import {AddForm} from "./AddForm.tsx";
import {TodolistTitle} from "./TodolistTitle.tsx";
import type {Todolist} from "./App.tsx";
import {Tasks} from "./Tasks.tsx";
import {addTaskAC} from "./model/tasks-reducer.ts";
import {toggleTodoAC} from "./model/todolists-reducer.ts";

type Props = {
    todolist: Todolist
}
export const TodoItem = React.memo(({todolist}: Props) => {
    console.log("TodoItem render:", todolist.title);



// вынесли логику в хук useTodoProgress
    const {
        progress,
        completedTasks,
        totalTasks,
        hasTasks
    } = useTodoProgress(todo);
    const addTask = useCallback((todoId: string, text: string) => {
        dispatch(addTaskAC(todoId, text));
    }, []);
    // const startEdit = () => {
    //     setTitle(todo.text);
    //     setIsEditing(true);
    // };

    // const finishEdit = () => {
    //     const trimmed = title.trim();
    //     if (trimmed) {
    //         onUpdateTitle(todo.id, trimmed);
    //     }
    //     console.log('finishEdit');
    //     setIsEditing(false);
    // };
    //
    // const cancelEdit = () => {
    //     setTitle(todo.text);
    //     setIsEditing(false);
    // };
    // const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') finishEdit();
    //     if (e.key === 'Escape') cancelEdit();
    // };
    const toggleTodo = useCallback((id: string) => {
        dispatchTodo(toggleTodoAC(id));
    }, []);

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
                    checked={todolist.filter}
                    disabled={hasTasks}
                    onChange={() => onToggle(todo.id)}
                />

                {/*{isEditing ? (*/}
                {/*    <TextField*/}
                {/*        value={title}*/}
                {/*        autoFocus*/}
                {/*        onChange={(e) => setTitle(e.target.value)}*/}
                {/*        onBlur={finishEdit}*/}
                {/*        onKeyDown={onKeyDown}*/}
                {/*        sx={{ ml: 1, textAlign:"center" }}*/}
                {/*    />*/}
                {/*) : (*/}
                {/*    <Typography onDoubleClick={startEdit}*/}
                {/*                sx={{*/}
                {/*                    cursor: "pointer",*/}
                {/*                    userSelect: "none",*/}
                {/*                    textDecoration: todo.completed ? "line-through" : "none",*/}
                {/*                    opacity: todo.completed ? 0.6 : 1,*/}
                {/*                }}>*/}
                {/*         {todo.text}*/}
                {/*    </Typography>*/}
                {/*)}*/ }

                <TodolistTitle todolist={todolist}/>
                <AddForm onAddItem={addTask}/>
                <Tasks todolist={todolist}/>
                <FilterButtons value={filter}
                               onChange={setFilter} />
            </Stack>
            {/*<Box mt={1}>*/}
            {/*    <LinearProgress variant="determinate" value={progress} sx={{*/}
            {/*        height: 6,*/}
            {/*        borderRadius: 3,*/}
            {/*        backgroundColor:'lightgray',*/}
            {/*        "& .MuiLinearProgress-bar": {*/}
            {/*            backgroundColor: getProgressColor(progress),*/}
            {/*            transition: "all 0.3s ease",*/}
            {/*        },*/}
            {/*    }} />*/}
            {/*    {hasTasks && <Typography variant="caption" color="text.success">*/}
            {/*        {completedTasks} / {totalTasks}*/}
            {/*    </Typography>}*/}
            {/*</Box>*/}
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