'use client';

import {Box, Typography} from "@mui/material";

export default function Stat({ label, value }: { label: string; value: number }) {
    return (
        <Box>
            <Typography fontWeight="bold" fontSize={20}>
                {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
        </Box>
    );
}