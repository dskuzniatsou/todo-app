import {useState} from "react";

type Props = {
    onAddTask: (todoId: string, text:string)=> void,
    todoId: string
};

export const AddTaskForm = ({ onAddTask, todoId }: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()
    if ((inputValue.trim() === "")) {
        return (setError('Поле не может быть пустым'))
    }

    onAddTask(todoId, inputValue);
    setInputValue('');
    setError('');
}
    return (
        <form onSubmit={handleAddTask}>

            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input  type="text"
                   placeholder={"добавьте задачу"}
                   value={inputValue}
                   onChange={(e) => {

                       if (error) setError('');
                       if(e.target.value.trim().length > 30){setError('Слишком много символов (максимум 30)'); return}
                       else {setInputValue(e.target.value);}
                   }} />
            <button type={"submit"}
                    disabled={(inputValue.trim() === '')||(error !== '')}>
                Добавить задачу
            </button>
        </form>
    );
};

