
import uuid from "react-uuid";
import type {Filter, Todo} from "../types/typesTodo.ts";


// export const INITIAL_TODOS = [
//     {
//         id: uuid(),
//         text: 'Купить',
//         completed: true,
//         tasks: [{ id: uuid(), text: 'Молоко', completed: false }],
//     },
//     {
//         id: uuid(),
//         text: 'by',
//         completed: false,
//         tasks: [],
//     },
//     {
//         id: uuid(),
//         text: 'pause',
//         completed: true,
//         tasks: [],
//     },
// ];

/* ===================== TYPES ===================== */

export type TodoState = {
    todos: Todo[]
    filter: Filter
}

/* ===================== INITIAL STATE ===================== */

const initialState: TodoState = {
    todos: [],
    filter: 'all'
}

/* ===================== ACTION CREATORS ===================== */

export const deleteTodoAC = (id: string) => {
    return {type: 'DELETE_TODO', payload: {id} } as const
}
export const addTodoAC = ( text: string) => {
    const id = uuid(); // Генерируем ID здесь!
    return { type: 'ADD_TODO', payload: { id, text} } as const
}
export const toggleTodoAC = (id: string) => {
    return {type: 'TOGGLE_TODO', payload: {id} } as const
}
export const updateTitleTodoAC = (id: string, text: string) => {
    return {type: 'UPDATE_TODO_TITLE', payload: {id,text} } as const
}
export const changeTodoFilterAC = ( filter: Filter)=> {
    return {type: 'CHANGE_FILTER_TODO', payload: {filter} } as const
}

/* ===================== ACTION TYPES ===================== */

export type DeleteTodoAction = ReturnType<typeof deleteTodoAC>
export type AddTodoAction = ReturnType<typeof addTodoAC>
export type ToggleTodoAction = ReturnType<typeof toggleTodoAC>
export type UpdateTitleTodoAction = ReturnType<typeof updateTitleTodoAC>
export type ChangeTodoFilterAction = ReturnType<typeof changeTodoFilterAC>
type TodoAction = DeleteTodoAction | AddTodoAction | ToggleTodoAction | UpdateTitleTodoAction | ChangeTodoFilterAction

/* ===================== REDUCER ===================== */

export const todolistsReducer = (state: TodoState = initialState, action: TodoAction): TodoState => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {id: action.payload.id, text: action.payload.text, completed: false, tasks: []}// создать новую тему
            return {
                ...state,
                todos: [newTodo, ...state.todos],
            };
        }

        case 'DELETE_TODO': {
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.id),
            };
        }
        case 'TOGGLE_TODO': {
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id !== action.payload.id) return todo;
                    if (todo.tasks.length > 0) return todo;

                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }),
            };
        }
        case 'UPDATE_TODO_TITLE': {
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? { ...todo, text: action.payload.text }
                        : todo
                ),
            };
        }
        case 'CHANGE_FILTER_TODO': {
            return {
                ...state,
                filter: action.payload.filter,
            };
        }

        default:
            return state
    }
}

