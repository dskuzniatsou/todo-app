
import './App.css'
import {Greeting} from "./Greeting.tsx";
import {useState} from "react";
import uuid from 'react-uuid';
import {AddForm} from "./AddForm.tsx";
import {TodoList} from "./TodoList.tsx";

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};


export const  App = () => {

    const initialState = [
        {id:uuid() , text:'Hello', completed:true},
        {id:uuid()  , text:'by', completed:false},
        {id:uuid()  , text:'pause', completed:true},
    ]
    const [todos,setTodos] = useState<Todo[]>(initialState)


    const addTodo = (text: string) => {
        const newTodo = {id: uuid(), text: text, completed: false}// создать новую задачу
       setTodos([...todos,newTodo]) // обновить setTodos
    }

    const toggleTodo = (id:string)=> {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }
    return (
        <div>
            <Greeting name="Dmitriy"/>
            <AddForm onAdd={addTodo} />
            <TodoList todos={todos} onToggle={toggleTodo}/>

        </div>
    );
}