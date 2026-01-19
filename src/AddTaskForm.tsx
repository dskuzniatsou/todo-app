import {useState} from "react";
import { IconButton, TextField} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Box from "@mui/material/Box";

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
        // material-ui
        <Box component="form"
             onSubmit={handleAddTask}
             sx={{display: "flex", justifyContent: 'space-between', gap: 1, mt: 1, mb: 1}}>

            <TextField
                sx={{display: "flex", flexDirection: "column", flexWrap:"wrap"}}
                size='small'
                label='Новaя задача'
                value={inputValue}
                error={!!error}
                helperText={error}
                onChange={(e) => {
                    if (error) setError("");
                    if (e.target.value.trim().length > 30) {
                        setError("Максимум 30 символов");
                        return;
                    } else {
                        setInputValue(e.target.value);
                    }
                }}
            />

            <IconButton  type='submit' aria-label="create"  size='small'
                    disabled={!inputValue.trim() || !!error}>
                <AddTaskIcon />
            </IconButton>

        </Box>
        //html
        // <form onSubmit={handleAddTask}>
        //
        //     {error && <div style={{ color: 'red' }}>{error}</div>}
        //     <input  type="text"
        //            placeholder={"добавьте задачу"}
        //            value={inputValue}
        //            onChange={(e) => {
        //
        //                if (error) setError('');
        //                if(e.target.value.trim().length > 30){setError('Слишком много символов (максимум 30)'); return}
        //                else {setInputValue(e.target.value);}
        //            }} />
        //     <button type={"submit"}
        //             disabled={(inputValue.trim() === '')||(error !== '')}>
        //         Добавить задачу
        //     </button>
        // </form>
    );
};

