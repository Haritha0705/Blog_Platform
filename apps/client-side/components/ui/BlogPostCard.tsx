'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Stack,
    Divider,
    Box,
} from '@mui/material';
import {
    CalendarMonth,
    AccessTime,
} from '@mui/icons-material';

const MotionCard = motion(Card);

interface BlogPostCardProps {
    post: {
        id: string;
        title: string;
        excerpt: string;
        category: string;
        author: string;
        date: string;
        readTime: string;
        image: string;
    };
    onClick: (id: string) => void;
}

export function BlogPostCard({ post, onClick }: BlogPostCardProps) {
    return (
        <MotionCard
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => onClick(post.id)}
            sx={{
                cursor: 'pointer',
                borderRadius: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Image */}
            <CardMedia sx={{ position: 'relative', height: 220, flexShrink: 0 }}>
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </CardMedia>

            {/* Content */}
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                }}
            >
                <Chip label={post.category} color="warning" size="small" sx={{ mb: 1, alignSelf: 'flex-start' }} />

                {/* Title – fixed lines */}
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {post.title}
                </Typography>

                {/* Description – fixed lines */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2,
                    }}
                >
                    {post.excerpt}
                </Typography>

                {/* Push footer to bottom */}
                <Box sx={{ flexGrow: 1 }} />

                <Divider />

                {/* Footer */}
                <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Typography variant="caption">{post.author}</Typography>

                    <Stack direction="row" spacing={2}>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <CalendarMonth fontSize="small" />
                            <Typography variant="caption">{post.date}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <AccessTime fontSize="small" />
                            <Typography variant="caption">{post.readTime}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </MotionCard>
    );
}
