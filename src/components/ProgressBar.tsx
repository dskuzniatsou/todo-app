import React from 'react';
import {Box, LinearProgress, Typography} from "@mui/material";
import {useTodoProgress} from "../hooks/useTodoProgress.ts";

export const ProgressBar = () => {
    const {
        progress,
        completedTasks,
        totalTasks,
        hasTasks
    } = useTodoProgress(todo);
    const getProgressColor = (value: number) => {
        if (value < 40) return "#f44336";   // red
        if (value < 80) return "#ff9800";   // orange
        return "#4caf50";                   // green
    };
    return (
        <Box mt={1}>
            <LinearProgress variant="determinate" value={progress} sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor:'lightgray',
                "& .MuiLinearProgress-bar": {
                    backgroundColor: getProgressColor(progress),
                    transition: "all 0.3s ease",
                },
            }} />
            {hasTasks && <Typography variant="caption" color="text.success">
                {completedTasks} / {totalTasks}
            </Typography>}
        </Box>
    );
};

