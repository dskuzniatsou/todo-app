import type {Todo} from "../App.tsx";
import uuid from "react-uuid";

const initialState: Todo[] = []
// заглушка
export type TodolistsAction = {
    type: string
    payload: any
}
// создаем actionCreator
export const deleteTodoAC = (id: string) => {
    return {type: 'DELETE_TODO', payload: {id} as const}
}
export const addTodoAC = ( text: string) => {
    return {type: 'ADD_TODO', payload: { text} as const}
}
export const toggleTodoAC = (id: string, completed: boolean) => {
    return {type: 'TOGGLE_TODO', payload: {id,completed} as const}
}
export const updateTitleTodoAC = (id: string, text: string) => {
    return {type: 'UPDATE_TODO_TITLE', payload: {id,text} as const}
}

export type DeleteTodoAction = ReturnType<typeof deleteTodoAC>
export type AddTodoAction = ReturnType<typeof addTodoAC>
export type ToggleTodoAction = ReturnType<typeof toggleTodoAC>
export type UpdateTitleTodoAction = ReturnType<typeof updateTitleTodoAC>
type Actions = DeleteTodoAction | AddTodoAction | ToggleTodoAction | UpdateTitleTodoAction

export const todolistsReducer = (state: Todo[] = initialState, action: TodolistsAction): Todo[] => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {id: uuid(), text: action.payload.text, completed: false, tasks: []}// создать новую тему
            return [...state, newTodo]
        }
        case 'DELETE_TODO': {
            return state.filter(todo => todo.id !== action.payload.id)
        }
        case 'TOGGLE_TODO': {
            return state.map(todo => todo.id === action.payload.id && todo.tasks?.length ? {
                    ...todo,
                    completed: !todo.completed
                }
                : todo)
        }
        case 'UPDATE_TODO_TITLE': {
            return state.map(todo=> todo.id===action.payload.id ? {...todo, text: action.payload.text}: todo)
        }
        default:
            return state
    }
}

