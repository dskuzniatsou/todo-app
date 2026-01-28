import { List } from "@mui/material";
import { TaskItem } from "./TaskItem";
import type {Todolist} from "./App.tsx";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}:Props) => {
    const {id, filter} = todolist


    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.completed)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.completed)
    }
    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => {
                        return (
                            <TaskItem key={task.id} task={task} todoId={id}/>
                        )
                    })}
                </List>
            )}
        </>
    );
};
