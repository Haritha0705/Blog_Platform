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
    Box,
    alpha,
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
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => onClick(post.id)}
            sx={{
                cursor: 'pointer',
                borderRadius: '16px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                },
                '&:hover .post-image': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            {/* Image */}
            <CardMedia sx={{ position: 'relative', height: 200, flexShrink: 0, overflow: 'hidden' }}>
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="post-image"
                    style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.06) 0%, transparent 50%)',
                    }}
                />
            </CardMedia>

            {/* Content */}
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Chip
                    label={post.category}
                    size="small"
                    sx={{
                        mb: 2,
                        alignSelf: 'flex-start',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        color: 'primary.main',
                        borderRadius: '8px',
                    }}
                />

                {/* Title */}
                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.35,
                        letterSpacing: '-0.01em',
                        fontSize: '1.05rem',
                    }}
                >
                    {post.title}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2,
                        lineHeight: 1.6,
                    }}
                >
                    {post.excerpt}
                </Typography>

                {/* Push footer to bottom */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Footer */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: (theme) => alpha(theme.palette.divider, 0.6),
                    }}
                >
                    <Typography variant="caption" fontWeight={600} color="text.primary">
                        {post.author}
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ color: 'text.secondary' }}>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <CalendarMonth sx={{ fontSize: 13 }} />
                            <Typography variant="caption">{post.date}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <AccessTime sx={{ fontSize: 13 }} />
                            <Typography variant="caption">{post.readTime}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </MotionCard>
    );
}
