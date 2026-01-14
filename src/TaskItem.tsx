import * as React from "react";
import {useEffect, useState} from "react";


type  Task = {
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
        <div >
            <input
                type="checkbox"
                checked={task.completed}
                onChange={()=>{onToggle(todoId, task.id)}}
            />
            {isEditing ? (
                <input
                    autoFocus
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={finishEdit}
                    onKeyDown={e => {
                        if (e.key === "Enter") finishEdit();
                        if (e.key === "Escape") cancelEdit();
                    }}
                />
            ) : (
                <span onDoubleClick={() => setIsEditing(true)}>
                        {task.text}
                    </span>
            )}
                <button onClick={()=>{onDelete(todoId,task.id)}}>Delete</button>

        </div>
    );
});
