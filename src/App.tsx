import './App.css'
import {Greeting} from "./Greeting.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import uuid from 'react-uuid';
import {AddForm} from "./AddForm.tsx";
import {TodoList} from "./TodoList.tsx";
import {FilterButtons} from "./components/FilterButtons.tsx";
import {Container, Box} from "@mui/material";
import {Header} from "./components/Header";
import {ThemeProvider, createTheme, CssBaseline} from "@mui/material";

type  Task = {
    id: string;
    text: string;
    completed: boolean;
}
export type Todo = {
    id: string;
    text: string;
    completed: boolean;
    tasks: Task[]
};
export type Filter = 'all' | 'active' | 'completed'


export const App = () => {
    console.log("App render");
    const initialState = [
        {id: uuid(), text: 'Купить', completed: true, tasks: [{id: uuid(), text: 'Молоко', completed: false}]},
        {id: uuid(), text: 'by', completed: false, tasks: []},
        {id: uuid(), text: 'pause', completed: true, tasks: []},
    ]
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' ? 'dark' : 'light';
    });
    const toggleTheme = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );
    // ---- Функция для первого рендера ----
    const getTodos = (): Todo[] => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : initialState;
    };

    const [todos, setTodos] = useState<Todo[]>(getTodos)
    const [filter, setFilter] = useState<Filter>('all')

// ---- Сохраняем изменения в localStorage ----
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('theme', mode);
    }, [mode]);

// действия со списком задач
    const addTodo = useCallback((text: string) => {
        const newTodo = {id: uuid(), text: text, completed: false, tasks: []}// создать новую тему
        setTodos(todos => [newTodo, ...todos])
        // обновить setTodos
    }, [])
    const deleteTodo = useCallback((id: string) => {
        setTodos(prev =>
            prev.filter(todo =>
                todo.id !== id
            )
        );
    }, [])

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            if (filter === 'all') return true;
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        });
    }, [todos, filter]);

    // const toggleTodo = useCallback((id:string)=> {
    //     setTodos(prev =>
    //         prev.map(todo =>
    //             todo.id === id ? { ...todo, completed: !todo.completed } : todo
    //         )
    //     );
    // }, [])
// для автоматического переключения чекбокса todo
    const toggleTodo = useCallback((todoId: string) => {
        setTodos(prev =>
            prev.map(todo => {
                if (todo.id !== todoId) return todo;

                // ❗ если есть задачи — запрещаем ручное переключение
                if (todo.tasks.length > 0) return todo;

                return {
                    ...todo,
                    completed: !todo.completed,
                };
            })
        );
    }, []);

    const updateTodoTitle = useCallback((todoId: string, text: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === todoId
                    ? {...todo, text}
                    : todo
            )
        );
    }, []);

// действия с задачами
    //добавление задачи
    // const addTask  = useCallback((todoId: string  , text: string) => {
    //     const newTask : Task = {id: uuid(), text: text, completed: false}
    //     setTodos(prev =>
    //         prev.map(todo =>
    //             todo.id === todoId
    //                 ? { ...todo, tasks: [...todo.tasks, newTask] }
    //                 : todo
    //         )
    //     );
    // }, [])
// добавление задачи и автоматическая проверка
    const addTask = useCallback((todoId: string, text: string) => {
        const newTask = {
            id: uuid(),
            text,
            completed: false,
        };

        setTodos(prev =>
            prev.map(todo => {
                if (todo.id !== todoId) return todo;

                const updatedTasks = [...todo.tasks, newTask];

                return {
                    ...todo,
                    tasks: updatedTasks,
                    completed: false, // 🔥 ключевой момент
                };
            })
        );
    }, []);
    // удаление задачи
    const deleteTask = useCallback((todoId: string, taskId: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === todoId
                    ? {
                        ...todo,
                        tasks: todo.tasks.filter(task => task.id !== taskId)
                    }
                    : todo
            )
        );
    }, [])
    // переключение чекбокса
    // const toggleTask = useCallback((todoId: string  , taskId: string)=> {
    //     setTodos(prev =>
    //         prev.map(todo =>
    //             todo.id === todoId
    //                 ? {...todo,
    //                 tasks: todo.tasks.map(task =>
    //                         task.id === taskId
    //                             ? { ...task, completed: !task.completed}
    //                             : task)}  : todo
    //
    //         )
    //     );
    // }, [])
    // для автоматического включения чекбокса todo
    const toggleTask = useCallback((todoId: string, taskId: string) => {
        setTodos(prev =>
            prev.map(todo => {
                if (todo.id !== todoId) return todo;

                const updatedTasks = todo.tasks.map(task =>
                    task.id === taskId
                        ? {...task, completed: !task.completed}
                        : task
                );

                const todoCompleted =
                    updatedTasks.length > 0 &&
                    updatedTasks.every(task => task.completed);

                return {
                    ...todo,
                    tasks: updatedTasks,
                    completed: todoCompleted,
                };
            })
        );
    }, []);
    // редактирование задачи
    const updateTask = useCallback((todoId: string, taskId: string, text: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === todoId
                    ? {
                        ...todo,
                        tasks: todo.tasks.map(task =>
                            task.id === taskId
                                ? {...task, text}
                                : task
                        )
                    }
                    : todo
            )
        );
    }, []);


    return (
        <div className="app">

            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header mode={mode} toggleTheme={toggleTheme}/>

            <Container  maxWidth="lg">
                <Box sx={{mt: 2}}>

                    <Greeting name="Dmitriy"/>
                    <AddForm onAdd={addTodo}/>
                    <FilterButtons
                        value={filter}
                        onChange={setFilter}
                    />
                    <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo}
                              onUpdateTitle={updateTodoTitle}
                              onToggleTask={toggleTask} onDeleteTask={deleteTask} onAddTask={addTask}
                              onUpdateTask={updateTask}/>
                </Box>


            </Container>
            </ThemeProvider>
        </div>
    );
}