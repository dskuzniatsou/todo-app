import type {Todo} from "../App.tsx";
import uuid from "react-uuid";

const initialState: Todo[] = []

export type TodolistsAction = {
    type: string
    payload: any
}

export const todolistsReducer = (state: Todo[] = initialState, action: TodolistsAction): Todo[] => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {id: uuid(), text: action.payload.text, completed: false, tasks: []}// создать новую тему
            return [...state, newTodo ]
        }
        case 'DELETE_TODO':{
            return state.filter(todo => todo.id !== action.payload.id)}
        case 'TOGGLE_TODO':
            // setTodos(prev =>
            //     prev.map(todo => {
            //         if (todo.id !== todoId) return todo;
            //
            //         // ❗ если есть задачи — запрещаем ручное переключение
            //         if (todo.tasks.length > 0) return todo;
            //
            //         return {
            //             ...todo,
            //             completed: !todo.completed,
            //         };
            //     })
            // );

            return state.map(todo=>todo.id === action.payload.id&&todo.tasks?.length? { ...todo, completed: !todo.completed }
                : todo)
        case 'UPDATE_TODO_TITLE':
            return state
        default:
            return state
    }
}

