import * as React from "react";
import {useEffect, useState} from "react";
import { Checkbox, IconButton, ListItem} from "@mui/material";
import { TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


export type  Task = {
    id: string;
    text: string;
    completed: boolean;
}

type Props = {
    task: Task
    todoId: string;
    onToggle: (todoId: string, taskId: string) => void;
    onDelete: (todoId: string, taskId: string) => void;
    onUpdateTask: (todoId:string, taskId: string, text: string) => void;
};
export const TaskItem = React.memo ( ({task, todoId, onToggle,  onDelete, onUpdateTask }:Props) => {
    console.log('TaskItem render', task.text)
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task.text);
    useEffect(() => {
        if (!isEditing) {
            setValue(task.text);
        }
    }, [task.text, isEditing]);

    const finishEdit = () => {
        const trimmed = value.trim();
        if (trimmed) {
            onUpdateTask(todoId, task.id, trimmed);
        }
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setValue(task.text);
        setIsEditing(false);
    };

    return (
        //material ui
        <ListItem
            dense
            secondaryAction={
                <IconButton edge="end" onClick={() => onDelete(todoId, task.id)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <Checkbox
                checked={task.completed}
                onChange={() => onToggle(todoId, task.id)}
            />
                {isEditing ? (
                    <TextField
                        autoFocus
                        value={value}
                        size="small"
                        variant="standard"
                        onChange={e => setValue(e.target.value)}
                        onBlur={finishEdit}
                        onKeyDown={e => {
                            if (e.key === "Enter") finishEdit();
                            if (e.key === "Escape") cancelEdit();
                        }}
                        inputProps={{ maxLength: 30 }}
                        sx={{ ml: 1 }}
                    />
                ) : (
                    <Typography
                        onDoubleClick={() => setIsEditing(true)}
                        sx={{
                            cursor: "pointer",
                            userSelect: "none",
                            textDecoration: task.completed ? "line-through" : "none",
                            opacity: task.completed ? 0.6 : 1,
                        }}
                    >
                        {task.text}
                    </Typography>
                )}
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
