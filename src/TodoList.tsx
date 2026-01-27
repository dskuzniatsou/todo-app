import {TodoItem} from "./TodoItem.tsx";
import {Box, Grid, Stack} from "@mui/material";
import type {TasksState} from "./App.tsx";


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
    tasks: TasksState;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddTask: (todoId: string, text: string) => void;
    onToggleTask: (todoId: string, taskId: string) => void;
    onDeleteTask: (todoId: string, taskId: string) => void;
    onUpdateTitle: (todoId: string, text: string) => void;
    onUpdateTask: (todoId: string, taskId: string, text: string) => void;
};

export const TodoList = ({
                             todos,
                             tasks,
                             onToggle,
                             onDelete,
                             onUpdateTitle,
                             onAddTask,
                             onDeleteTask,
                             onToggleTask,
                             onUpdateTask
                         }: Props) => {
    console.log("TodoList render");
    return (
        <Box sx={{width: "100%", ml: "2rem", mt: '1rem'}}>
            <Grid container spacing={4}>
                {todos.map(todo => (
                    <Stack
                        direction="row"      // ← Горизонтальное направление
                        spacing={1}         // ← Отступы между элементами
                        flexWrap="wrap"     // ← Ключевое: разрешает перенос на новые строки
                        useFlexGap          // ← Оптимальные отступы (MUI v5.14+)
                    >
                        <TodoItem key={todo.id} todo={todo} tasks={tasks[todo.id] || []} onToggle={onToggle}
                                  onDelete={onDelete} onUpdateTitle={onUpdateTitle}
                                  onAddTask={onAddTask} onDeleteTask={onDeleteTask} onToggleTask={onToggleTask}
                                  onUpdateTask={onUpdateTask}/>
                    </Stack>
                ))}
            </Grid>
        </Box>
    );
};