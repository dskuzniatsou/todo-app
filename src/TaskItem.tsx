import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import { Checkbox, IconButton, ListItem} from "@mui/material";
import { TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "./EditableSpan.tsx";
import type {Task} from "./App.tsx";
import {deleteTaskAC, toggleTaskAC, updateTitleTaskAC} from "./model/tasks-reducer.ts";

type Props = {
    task: Task;
    todoId: string;
};
export const TaskItem = React.memo ( ({task, todoId}:Props) => {
    console.log('TaskItem render', task.title)
    const dispatch = useAppdispatch()


    const deleteTask = useCallback((todoId: string, taskId: string) => {
        dispatch(deleteTaskAC(todoId, taskId));
    }, []);

    const toggleTask = useCallback((todoId: string, taskId: string) => {
        dispatch(toggleTaskAC(todoId, taskId));
    }, []);

    const updateTask = useCallback((todoId: string, taskId: string, text: string) => {
        dispatch(updateTitleTaskAC(todoId, taskId, text));
    }, []);

    return (
        //material ui
        <ListItem>

            <div>
                <Checkbox checked={task.completed} onChange={toggleTask}/>
                <EditableSpan value={task.title} onChange={updateTask}/>
            </div>
            <IconButton onClick={deleteTask} >
                <DeleteIcon/>
            </IconButton>
        </ListItem>
// HTML
        // <div >
        //
        //     <input
        //         type="checkbox"
        //         checked={task.completed}
        //         onChange={()=>{onToggle(todoId, task.id)}}
        //     />
        //     {isEditing ? (
        //         <input
        //             autoFocus
        //             value={value}
        //             onChange={e => setValue(e.target.value)}
        //             onBlur={finishEdit}
        //             onKeyDown={e => {
        //                 if (e.key === "Enter") finishEdit();
        //                 if (e.key === "Escape") cancelEdit();
        //             }}
        //         />
        //     ) : (
        //         <span onDoubleClick={() => setIsEditing(true)}>
        //                 {task.text}
        //             </span>
        //     )}
        //     <IconButton aria-label="delete" onClick={()=>{onDelete(todoId,task.id)}}>
        //         <DeleteIcon />
        //     </IconButton>
        //         {/*<button onClick={()=>{onDelete(todoId,task.id)}}>Delete</button>*/}
        //
        // </div>
    );
});
