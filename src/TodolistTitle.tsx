import type {Todolist} from "./App.tsx";
import {useCallback} from "react";
import {deleteTodoAC, updateTitleTodoAC} from "./model/todolists-reducer.ts";
import {EditableSpan} from "./EditableSpan.tsx";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()
    // const deleteTodolistHandler = () => {
    //     dispatch(deleteTodolistAC({id: id}))
    // }
    const deleteTodo = useCallback((id: string) => {
        // const action = deleteTodoAC(id);
        dispatch(deleteTodoAC({id}));
    }, []);

    // const changeTodolistTitleHandler = (title: string) => {
    //     dispatch(changeTodolistTitleAC({id: id, title}))
    // }
    const updateTodoTitle = useCallback((id: string, text: string) => {
        dispatch(updateTitleTodoAC(id, text));
    }, []);

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={updateTodoTitle}/>
            </h3>
            <IconButton onClick={deleteTodo}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};
