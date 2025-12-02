

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export const TodoItem = ({ todo, onToggle,onDelete }: Props) => {
    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={()=>onToggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={()=>onDelete(todo.id)}>Delete</button>
        </div>
    );
};