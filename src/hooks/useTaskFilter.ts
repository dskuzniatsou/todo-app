import {useMemo, useState} from "react";

export type TaskFilter = 'all' | 'active' | 'completed';

type Task = {
    id: string;
    completed: boolean;
};

 export const useTaskFilter = (tasks: Task[]) => {
     const [filter, setFilter] = useState<TaskFilter>('all')
     const visibleTasks = useMemo(() => {
         return tasks.filter(task => {
             if (filter === 'active') return !task.completed;
             if (filter === 'completed') return task.completed;
             return true;
         });
     }, [tasks, filter]);

     return {
         filter,
         setFilter,
         visibleTasks,
     };

 }




