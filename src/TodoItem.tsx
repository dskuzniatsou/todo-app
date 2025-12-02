

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
};

export const TodoItem = ({ todo, onToggle }: Props) => {
    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={()=>onToggle(todo.id)}
            />
            <span>{todo.text}</span>
        </div>
    );
};