
import './App.css'
import {Greeting} from "./Greeting.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import uuid from 'react-uuid';
import {AddForm} from "./AddForm.tsx";
import {TodoList} from "./TodoList.tsx";


type  Task = {
    id: string;
    text: string;
    completed: boolean;
}
type Todo = {
    id: string;
    text: string;
    completed: boolean;
    tasks:Task[]
};
type TodoFilter = 'all' | 'active' | 'completed'


export const  App = () => {
    console.log("App render");
    const initialState = [
        {id:uuid() , text:'Купить', completed:true, tasks: [{id: uuid(), text:'Молоко', completed: false}]},
        {id:uuid()  , text:'by', completed:false, tasks: []},
        {id:uuid()  , text:'pause', completed:true, tasks: []},
    ]
    // ---- Функция для первого рендера ----
    const getTodos = (): Todo[] => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : initialState;
    };

    const [todos,setTodos] = useState<Todo[]>(getTodos)
    const [filter, setFilter] = useState<TodoFilter>('all')

// ---- Сохраняем изменения в localStorage ----
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

// действия со списком задач
    const addTodo = useCallback((text: string) => {
        const newTodo = {id: uuid(), text: text, completed: false,tasks: []}// создать новую тему
       setTodos(todos=> [...todos,newTodo])
        // обновить setTodos
    }, [])
    const deleteTodo = useCallback((id:string) => {
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
                    ? { ...todo, text }
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
    const deleteTask = useCallback((todoId: string  , taskId: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === todoId
                    ? {...todo,
                        tasks: todo.tasks.filter(task =>task.id !==taskId)}
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
                        ? { ...task, completed: !task.completed }
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
                                ? { ...task, text }
                                : task
                        )
                    }
                    : todo
            )
        );
    }, []);


    return (
        <div className={'app'}>
            <Greeting name="Dmitriy"/>
            <AddForm onAdd={addTodo}  />
            <div style={{ marginBottom: '10px' }}>
                <button
                    onClick={() => setFilter('all')}
                    style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('active')}
                    style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
                >
                    Active
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
                >
                    Completed
                </button>
            </div>
            <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdateTitle={updateTodoTitle}
                      onToggleTask={toggleTask} onDeleteTask={deleteTask} onAddTask={addTask} onUpdateTask={updateTask} />

        </div>
    );
}