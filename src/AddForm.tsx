import {useState} from "react";

type Props = {
    onAdd: (text: string) => void;
};

export const AddForm = ({ onAdd }: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()
    if ((inputValue.trim() === "")) {
        // setInputValue('');
        return (setError('Поле не может быть пустым'))
    }

    onAdd(inputValue);
    setInputValue('');
    setError('');
}
    return (
        <form onSubmit={handleAdd}>

            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input  type="text"
                   placeholder={"добавьте список"}
                   value={inputValue}
                   onChange={(e) => {

                       if (error) setError('');
                       if(e.target.value.trim().length > 30){setError('Слишком много символов (максимум 30)'); return}
                       else {setInputValue(e.target.value);}
                   }} />
            <button type={"submit"}
                    disabled={(inputValue.trim() === '')||(error !== '')}>
                Добавить список
            </button>

        </form>
    );
};

