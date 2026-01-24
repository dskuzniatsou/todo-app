import type {AddTodoAction, DeleteTodoAction} from "./todolists-reducer.ts";
import type {TasksState} from "../App.tsx";
import type {Todo} from "../types/typesTodo.ts";
import uuid from "react-uuid";
import type {Task} from "../TaskItem.tsx";
/* ===================== INITIAL STATE ===================== */
const initialState: TasksState = {}

/* ===================== ACTION CREATORS ===================== */

export const addTaskAC = (todoId: string, text: string) => {
    return {type: 'ADD_TASK', payload: {todoId, text}} as const
}
export const deleteTaskAC = (todoId: string, taskId: string) => {
    return {type: 'DELETE_TASK', payload: {todoId, taskId}} as const
}
export const toggleTaskAC = (todoId: string, taskId: string) => {
    return {type: 'TOGGLE_TASK', payload: {todoId, taskId}} as const
}
export const updateTitleTaskAC = (todoId: string, taskId: string, text: string) => {
    return {type: 'UPDATE_TITLE_TASK', payload: {todoId, taskId, text}} as const
}

/* ===================== ACTION TYPES ===================== */

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type AddTaskAction = ReturnType<typeof addTaskAC>
export type ToggleTaskAction = ReturnType<typeof toggleTaskAC>
export type UpdateTitleTaskAction = ReturnType<typeof updateTitleTaskAC>

type TaskAction =
    DeleteTodoAction
    | AddTodoAction
    | DeleteTaskAction
    | AddTaskAction
    | ToggleTaskAction
    | UpdateTitleTaskAction


/* ===================== REDUCER ===================== */
export const tasksReducer = (state: TasksState = initialState, action: TaskAction): TasksState => {
    switch (action.type) {

        // При создании новой задачи (todo) создаем пустой массив подзадач
        case 'ADD_TODO': {
            const newTodoId = action.payload.id; // Предполагаем, что addTodoAC возвращает id
            return {
                ...state,
                [newTodoId]: [], // Пустой массив для новой задачи
            };
        }
        // При удалении задачи (todo) удаляем и массив ее подзадач
        case 'DELETE_TODO': {
            const { [action.payload.id]: removedTasks, ...restState } = state;
            return restState;
        }
        case 'ADD_TASK': {
            const { todoId, text } = action.payload;

            // Если такой задачи нет, создаем пустой массив
            if (!state[todoId]) {
                return {
                    ...state,
                    [todoId]: [],
                };
            }

            const newTask: Task = {
                id: uuid(),
                text,
                completed: false,
            };

            return {
                ...state,
                [todoId]: [...state[todoId], newTask],
            };
    }

        case 'DELETE_TASK':{
            const { todoId, taskId } = action.payload;

            // Если задачи не существует, возвращаем текущее состояние
            if (!state[todoId]) {
                return state;
            }

            return {
                ...state,
                [todoId]: state[todoId].filter(task => task.id !== taskId),
            };
    }
        case 'TOGGLE_TASK':{
            const { todoId, taskId } = action.payload;

            if (!state[todoId]) {
                return state;
            }

            return {
                ...state,
                [todoId]: state[todoId].map(task =>
                    task.id === taskId
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
    }
        case 'UPDATE_TITLE_TASK':{
            const { todoId, taskId, text } = action.payload;

            if (!state[todoId]) {
                return state;
            }

            return {
                ...state,
                [todoId]: state[todoId].map(task =>
                    task.id === taskId
                        ? { ...task, text }
                        : task
                ),
            };
    }
        default:
            return state
    }
}