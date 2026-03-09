'use client';

import {Box, Typography} from "@mui/material";

export default function Stat({ label, value }: { label: string; value: number }) {
    return (
        <Box>
            <Typography fontWeight={800} fontSize={22} letterSpacing="-0.02em" color="text.primary">
                {value.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                {label}
            </Typography>
        </Box>
    );
}