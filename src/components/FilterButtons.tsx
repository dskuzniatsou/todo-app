import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import type {Filter} from '../App'
type Props = {
    value: Filter;
    onChange: (value: Filter) => void;
};
export const FilterButtons = ({value, onChange}:Props) => {

    return (
        <ToggleButtonGroup
            value={value}
            color='info'
            exclusive
            onChange={(_, newValue) => {
                if (newValue !== null) {
                    onChange(newValue);
                }
            }}
            size="small"
            sx={{ mt: 1, mb: 1,  fontWeight: 'bold' }}
        >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
    );
};

