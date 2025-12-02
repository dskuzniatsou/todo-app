import {TodoItem} from "./TodoItem.tsx";

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

type Props = {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export const TodoList = ({ todos,onToggle, onDelete }: Props) => {
    return (
        <div>
            {todos.map(todo => (
                <TodoItem todo={todo} key={todo.id} onToggle={onToggle} onDelete={onDelete}/>

           ))}
        </div>
    );
};