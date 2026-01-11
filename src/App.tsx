
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
        {id:uuid() , text:'Hello', completed:true, tasks: []},
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

    const addTask  = useCallback((todoId: string  , text: string) => {
        const newTask : Task = {id: uuid(), text: text, completed: false}
        setTodos(prev =>
            prev.map(todo =>
                todo.id === todoId
                    ? { ...todo, tasks: [...todo.tasks, newTask] }
                    : todo
            )
        );
    }, [])

    const toggleTodo = useCallback((id:string)=> {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, [])
    return (
        <div>
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
            <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />

        </div>
    );
}