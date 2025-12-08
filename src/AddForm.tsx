import {useState} from "react";

type Props = {
    onAdd: (text: string) => void;
};

export const AddForm = ({ onAdd }: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

const handleAdd = () => {
    if ((inputValue.trim() === "")) {
        setInputValue('');
        return (setError('Поле не может быть пустым'))
    }
    else if (inputValue.trim().length > 5){
        console.log(inputValue.length);
        setInputValue('');
       return  setError('Слишком много символов (максимум 5)');

    }
    onAdd(inputValue);
    setInputValue('');
    setError('');
}
    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input type="text"
                   placeholder={"добавьте задачу"}
                   value={inputValue}
                   onChange={(e) => {
                       setInputValue(e.target.value);
                       if (error) setError('');
                   }} />
            <button onClick={handleAdd} >Добавить список </button>
        </div>
    );
};

