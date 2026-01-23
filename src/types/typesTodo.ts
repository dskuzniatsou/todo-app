// types/todo.ts
export type Task = {
    id: string;
    text: string;
    completed: boolean;
};

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
    tasks: Task[]; // убираем опциональность, всегда массив
};

export type Filter = 'all' | 'active' | 'completed';

export type TodoState = {
    todos: Todo[];
    filter: Filter;
};

export type TodoAction =
    | { type: 'ADD_TODO'; payload: { text: string } }
    | { type: 'DELETE_TODO'; payload: { id: string } }
    | { type: 'TOGGLE_TODO'; payload: { id: string } }
    | { type: 'UPDATE_TODO_TITLE'; payload: { id: string; text: string } }
    | { type: 'ADD_TASK'; payload: { todoId: string; text: string } }
    | { type: 'DELETE_TASK'; payload: { todoId: string; taskId: string } }
    | { type: 'TOGGLE_TASK'; payload: { todoId: string; taskId: string } }
    | { type: 'UPDATE_TASK'; payload: { todoId: string; taskId: string; text: string } }
    | { type: 'SET_FILTER'; payload: { filter: Filter } };