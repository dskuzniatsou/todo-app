import {useState} from "react";

type Props = {
    onAdd: (text: string) => void;
};

export const AddForm = ({ onAdd }: Props) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <input type="text" placeholder={"добавьте задачу"} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={()=>onAdd(inputValue)} >Добавить список </button>
        </div>
    );
};

