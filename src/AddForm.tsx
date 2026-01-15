import {useState} from "react";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
type Props = {
    onAdd: (text: string) => void;
};

export const AddForm = ({onAdd}: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmed = inputValue.trim();
        if (!trimmed) {
            setError("Поле не может быть пустым");
            return;
        }
        onAdd(inputValue);
        setInputValue('');
        setError('');
    }

    return (
        // material-ui
        <Box component="form"
             onSubmit={handleAdd}
             sx={{display: "flex", justifyContent: 'center', gap: 1, mb: 2}}>
            <TextField
                size='small'
                label='Новый список'
                value={inputValue}
                error={!!error}
                helperText={error}
                onChange={(e) => {
                    // setInputValue(e.target.value);
                    if (error) setError("");
                    if (e.target.value.trim().length > 30) {
                        setError("Максимум 30 символов");
                        return;
                    } else {
                        setInputValue(e.target.value);
                    }
                }}
            />
            <Button type='submit' size='large' startIcon={<AddTaskIcon />}
                    disabled={!inputValue.trim() || !!error}></Button>
        </Box>
        //html
        // <form onSubmit={handleAdd}>
        //
        //     {error && <div style={{color: 'red'}}>{error}</div>}
        //     <input type="text"
        //            placeholder={"добавьте список"}
        //            value={inputValue}
        //            onChange={(e) => {
        //
        //                if (error) setError('');
        //                if (e.target.value.trim().length > 30) {
        //                    setError('Слишком много символов (максимум 30)');
        //                    return
        //                } else {
        //                    setInputValue(e.target.value);
        //                }
        //            }}/>
        //     <button type={"submit"}
        //             disabled={(inputValue.trim() === '') || (error !== '')}>
        //         Добавить список
        //     </button>
        //
        // </form>
    );
};

