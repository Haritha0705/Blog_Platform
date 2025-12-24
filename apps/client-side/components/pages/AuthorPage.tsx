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
              background:
                  'linear-gradient(135deg, rgba(25,118,210,0.1), rgba(156,39,176,0.05))',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
        >
          <Container maxWidth="md" sx={{ py: 6 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              <Avatar
                  sx={{
                    width: 128,
                    height: 128,
                    border: '4px solid white',
                    boxShadow: 3,
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
                    <Typography variant="h4" fontWeight="bold">
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
                <Stack direction="row" spacing={1}>
                  <IconButton href={author.website} target="_blank">
                    <Language />
                  </IconButton>
                  <IconButton href={author.twitter} target="_blank">
                    <Twitter />
                  </IconButton>
                  <IconButton href={author.github} target="_blank">
                    <GitHub />
                  </IconButton>
                  <IconButton href={author.linkedin} target="_blank">
                    <LinkedIn />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* ================= CONTENT ================= */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Posts" />
            <Tab label="About" />
          </Tabs>

          {/* POSTS */}
          {tab === 0 && (
              <Box mt={4} display="grid" gridTemplateColumns={{ md: '1fr 1fr' }} gap={3}>
                {posts.map((post, index) => (
                    <MotionCard
                        key={post.id}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handlePostClick(post.id)}
                        sx={{ cursor: 'pointer' }}
                    >
                      <CardMedia sx={{ position: 'relative', height: 200 }}>
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                      </CardMedia>

                      <CardContent>
                        <Chip label={post.category} size="small" sx={{ mb: 1 }} />

                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {post.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" mb={2}>
                          {post.excerpt}
                        </Typography>

                        <Divider />

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
              <Card sx={{ mt: 4, p: 4 }}>
                <Typography variant="h5" fontWeight="bold" mb={3}>
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

                <Typography variant="h6" mb={2}>
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
                      <Chip key={skill} label={skill} />
                  ))}
                </Stack>
              </Card>
          )}
        </Container>
      </Box>
  );
}

