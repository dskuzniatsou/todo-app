import './App.css'
import {Greeting} from "./Greeting.tsx";
import {useCallback, useEffect, useMemo, useReducer, useState} from "react";
// import uuid from 'react-uuid';
import {AddForm} from "./AddForm.tsx";
import {TodoList} from "./TodoList.tsx";
import {FilterButtons} from "./components/FilterButtons.tsx";
import {Container, Box} from "@mui/material";
import {Header} from "./components/Header";
import {ThemeProvider, createTheme, CssBaseline} from "@mui/material";
import {
    addTodoAC,
    changeTodoFilterAC,
    deleteTodoAC,
    todolistsReducer,
    toggleTodoAC,
    updateTitleTodoAC
} from "./model/todolists-reducer.ts";

import {addTaskAC, deleteTaskAC, tasksReducer, toggleTaskAC, updateTitleTaskAC} from "./model/tasks-reducer.ts";


/* ========================= TYPES ========================== */
export type Todolist = {
    id: string;
    title: string;
    filter: FilterValues
};
export type  Task = {
    id: string;
    title: string;
    completed: boolean;
}
export type FilterValues = 'all' | 'active' | 'completed'
export type TasksState = Record<string, Task[]>

type ThemeMode = 'dark' | 'light'


export const App = () => {
    console.log("App render");

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const [tasks, setTasks] = useState<TasksState>({})
    const [filter, setFilter] = useState<FilterValues>('all')

    /* ===================== THEME ===================== */

    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' ? 'dark' : 'light';
    });
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                    primary: {
                        main: '#c64904',
                    }
                },
            }),
        [themeMode]
    );
    const toggleTheme = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };





    // ---- Функция для первого рендера ----
    // const getTodos = (): Todo[] => {
    //     const saved = localStorage.getItem('todos');
    //     return saved ? JSON.parse(saved) : initialState;
    // };

    // const [todos, setTodos] = useState<Todo[]>(getTodos)
//     const [todos, dispatchTodos] = useReducer(todolistsReducer, getTodos)
//     const [filter, setFilter] = useState<Filter>('all')
//
// // ---- Сохраняем изменения в localStorage ----
//     useEffect(() => {
//         localStorage.setItem('todos', JSON.stringify(todos));
//     }, [todos]);

    /* ===================== EFFECTS ===================== */
    useEffect(() => {
        localStorage.setItem('theme', themeMode);
    }, [themeMode]);

// действия со списком задач
    /* ===================== TODOS ===================== */

    const addTodo = useCallback((text: string) => {
        // const action = addTodoAC(text);
        dispatchTodo(addTodoAC(text));
        dispatchTasks(addTodoAC(text));
    }, []);





    const changeFilter = useCallback((value: typeof filter) => {
        dispatchTodo(changeTodoFilterAC(value));
    }, []);


    /* ===================== FILTERED TODOS ===================== */

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {

            if (filter === 'active') return !todo.filter;
            if (filter === 'completed') return todo.filter;
            return true;
        });
    }, [todos, filter]);

    /* ===================== TASKS ===================== */





    return (
        <ThemeProvider theme={theme}>
        <div className="app">
                <CssBaseline/>
                <Header themeMode={themeMode} toggleTheme={toggleTheme}/>

            <Container  maxWidth="lg">
                <Box sx={{mt: 2}}>

                    <Greeting name="Dmitriy"/>

                    <AddForm onAddItem={addTodo}/>
                    <FilterButtons
                        value={filter}
                        onChange={changeFilter}
                    />
                    <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo}
                              onUpdateTitle={updateTodoTitle} tasks={tasksState}
                              onToggleTask={toggleTask} onDeleteTask={deleteTask} onAddTask={addTask}
                              onUpdateTask={updateTask}/>
                </Box>


            </Container>
        </div>
</ThemeProvider>
    );
}