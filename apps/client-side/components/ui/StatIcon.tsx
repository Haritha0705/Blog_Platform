'use client';

import {Stack, Typography} from "@mui/material";

export default function StatIcon({
                      icon,
                      value,
                  }: {
    icon: React.ReactNode;
    value: number;
}) {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            {icon}
            <Typography variant="body2">{value}</Typography>
        </Stack>
    );
}
