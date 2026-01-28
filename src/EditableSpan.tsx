import TextField from '@mui/material/TextField'
import {type ChangeEvent, useState} from 'react'
import {Typography} from "@mui/material";
import * as React from "react";

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({ value, onChange }: Props) => {
    const [title, setTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState(false)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const cancelEdit = () => {
        setTitle(value);
        setIsEditMode(false);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') turnOffEditMode();
        if (e.key === 'Escape') cancelEdit();
    };

    return (
        <>
            {isEditMode ? (
                <TextField variant={'outlined'}
                           value={title}
                           size={'small'}
                           onChange={changeTitle}
                           onBlur={turnOffEditMode}
                           onKeyDown={onKeyDown}
                           autoFocus/>
            ) : (
                <Typography onDoubleClick={turnOnEditMode}>{value}</Typography>
            )}
        </>
    )
}