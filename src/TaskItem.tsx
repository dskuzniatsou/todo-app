import * as React from "react";


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

};
export const TaskItem = React.memo ( ({task, todoId, onToggle,  onDelete }:Props) => {
    console.log('TaskItem render', task.text)
    return (
        <div >
            <input
                type="checkbox"
                checked={task.completed}
                onChange={()=>{onToggle(todoId, task.id)}}
            />
            <span >{task.text}</span>
                <button onClick={()=>{onDelete(todoId,task.id)}}>Delete</button>

        </div>
    );
});
