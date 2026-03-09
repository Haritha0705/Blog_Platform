'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Tabs,
  Tab,
  Stack,
  IconButton,
  Divider,
  alpha,
} from '@mui/material';

import {
  Twitter,
  GitHub,
  LinkedIn,
  Language,
  People,
  Visibility,
} from '@mui/icons-material';

import { author, posts } from '@/data/content';
import Stat from "@/components/ui/Stat";
import {useState} from "react";

interface AuthorPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
}

const MotionCard = motion(Card);

export function AuthorPage({ setCurrentPage, setSelectedPost }: AuthorPageProps) {
  const [tab, setTab] = useState(0);

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  return (
      <Box minHeight="100vh">
        {/* ================= PROFILE HEADER ================= */}
        <Box
            sx={{
              background: 'linear-gradient(160deg, #F5F3FF 0%, #EEF2FF 40%, #F8FAFC 100%)',
              borderBottom: '1px solid',
              borderColor: 'divider',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
              },
            }}
        >
          <Container maxWidth="md" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              <Avatar
                  sx={{
                    width: 128,
                    height: 128,
                    border: '4px solid white',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  }}
              >
                <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    style={{ objectFit: 'cover' }}
                />
              </Avatar>

              <Box flex={1}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    spacing={2}
                    mb={2}
                >
                  <Box>
                    <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em">
                      {author.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {author.username}
                    </Typography>
                  </Box>

                  <Button
                      variant="contained"
                      size="large"
                      startIcon={<People />}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '12px',
                        px: 3,
                        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
                        '&:hover': {
                          boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
                          background: 'linear-gradient(135deg, #5558E8 0%, #7C4FE0 100%)',
                        },
                      }}
                  >
                    Follow
                  </Button>
                </Stack>

                <Typography color="text.secondary" mb={3}>
                  {author.bio}
                </Typography>

                {/* Stats */}
                <Stack direction="row" spacing={4} mb={3}>
                  <Stat label="Followers" value={author.stats.followers} />
                  <Stat label="Posts" value={author.stats.posts} />
                  <Stat label="Views" value={author.stats.posts} />
                </Stack>

                {/* Social */}
                <Stack direction="row" spacing={0.5}>
                  <IconButton href={author.website} target="_blank" sx={{ borderRadius: '10px', bgcolor: (theme) => alpha(theme.palette.action.hover, 0.06), '&:hover': { color: 'primary.main', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) } }}>
                    <Language />
                  </IconButton>
                  <IconButton href={author.twitter} target="_blank" sx={{ borderRadius: '10px', bgcolor: (theme) => alpha(theme.palette.action.hover, 0.06), '&:hover': { color: 'primary.main', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) } }}>
                    <Twitter />
                  </IconButton>
                  <IconButton href={author.github} target="_blank" sx={{ borderRadius: '10px', bgcolor: (theme) => alpha(theme.palette.action.hover, 0.06), '&:hover': { color: 'primary.main', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) } }}>
                    <GitHub />
                  </IconButton>
                  <IconButton href={author.linkedin} target="_blank" sx={{ borderRadius: '10px', bgcolor: (theme) => alpha(theme.palette.action.hover, 0.06), '&:hover': { color: 'primary.main', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) } }}>
                    <LinkedIn />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* ================= CONTENT ================= */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
              },
              '& .MuiTabs-indicator': { borderRadius: '2px', height: 3 },
            }}
          >
            <Tab label="Posts" />
            <Tab label="About" />
          </Tabs>

          {/* POSTS */}
          {tab === 0 && (
              <Box mt={4} display="grid" gridTemplateColumns={{ md: '1fr 1fr' }} gap={3}>
                {posts.map((post) => (
                    <MotionCard
                        key={post.id}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => handlePostClick(post.id)}
                        sx={{
                          cursor: 'pointer',
                          borderRadius: '16px',
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                          overflow: 'hidden',
                          '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                    >
                      <CardMedia sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                      </CardMedia>

                      <CardContent sx={{ p: 3 }}>
                        <Chip
                          label={post.category}
                          size="small"
                          sx={{
                            mb: 1.5,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                            color: 'primary.main',
                            borderRadius: '8px',
                          }}
                        />

                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                          {post.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight: 1.6 }}>
                          {post.excerpt}
                        </Typography>

                        <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.5) }} />

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            mt={2}
                            fontSize={12}
                            color="text.secondary"
                        >
                          <span>{post.date}</span>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Visibility fontSize="small" />
                              <span>{post.views}</span>
                            </Stack>
                            <span>{post.readTime}</span>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </MotionCard>
                ))}
              </Box>
          )}

          {/* ABOUT */}
          {tab === 1 && (
              <Card sx={{ mt: 4, p: 4, borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <Typography variant="h5" fontWeight={800} letterSpacing="-0.02em" mb={3}>
                  About {author.name}
                </Typography>

                <Typography color="text.secondary" mb={2}>
                  Sarah is a Senior Software Engineer with over 10 years of experience
                  in web development. She specializes in scalable React applications.
                </Typography>

                <Typography color="text.secondary" mb={3}>
                  Her expertise includes TypeScript, Next.js, performance optimization,
                  and design systems.
                </Typography>

                <Typography variant="h6" fontWeight={700} mb={2}>
                  Expertise
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {[
                    'React',
                    'TypeScript',
                    'Next.js',
                    'Node.js',
                    'Architecture',
                    'Performance',
                  ].map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        sx={{
                          borderRadius: '8px',
                          fontWeight: 500,
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                          color: 'primary.main',
                          border: '1px solid',
                          borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
                        }}
                      />
                  ))}
                </Stack>
              </Card>
          )}
        </Container>
      </Box>
  );
}

