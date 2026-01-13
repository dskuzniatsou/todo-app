import { useMemo } from "react";

type Task = {
    id: string;
    completed: boolean;
};

type Todo = {
    completed: boolean;
    tasks: Task[];
};

export const useTodoProgress = (todo: Todo) => {
    return useMemo(() => {
        const totalTasks = todo.tasks.length;
        const completedTasks = todo.tasks.filter(t => t.completed).length;
        const hasTasks = totalTasks > 0;

        const progress = hasTasks
            ? Math.round((completedTasks / totalTasks) * 100)
            : todo.completed
                ? 100
                : 0;

        return {
            progress,
            completedTasks,
            totalTasks,
            hasTasks,
        };
    }, [todo.tasks, todo.completed]);
};