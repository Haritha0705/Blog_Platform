'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  IconButton,
  Stack,
  Divider,
  MenuItem,
  Select,
} from '@mui/material';

import {
  GridView,
  ViewList,
  Tune,
  AccessTime,
  CalendarMonth,
  Search,
} from '@mui/icons-material';

import { blogPosts } from '@/data/content';

interface BlogListingPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
}

const MotionCard = motion(Card);

export function BlogListingPage({
                                  setCurrentPage,
                                  setSelectedPost,
                                }: BlogListingPageProps) {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sort, setSort] = React.useState('latest');

  const categories = ['All', 'Technology', 'Development', 'Design', 'Writing', 'Performance'];
  const tags = ['React', 'TypeScript', 'CSS', 'Next.js', 'Design Systems', 'Performance', 'API'];

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  return (
      <Box minHeight="100vh">
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6}>
            {/* ================= MAIN ================= */}
            <Box flex={1}>
              {/* Header */}
              <Box mb={4}>
                <Typography variant="h3" fontWeight="bold" mb={1}>
                  All Articles
                </Typography>
                <Typography color="text.secondary">
                  Discover insights, tutorials, and stories from our community.
                </Typography>
              </Box>

              {/* Search + Filters */}
              <Stack spacing={3} mb={4}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                      fullWidth
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1 }} />,
                      }}
                  />

                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" startIcon={<Tune />}>
                      Filters
                    </Button>

                    <Box
                        sx={{
                          display: 'flex',
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          p: 0.5,
                        }}
                    >
                      <IconButton
                          size="small"
                          color={viewMode === 'grid' ? 'primary' : 'default'}
                          onClick={() => setViewMode('grid')}
                      >
                        <GridView />
                      </IconButton>
                      <IconButton
                          size="small"
                          color={viewMode === 'list' ? 'primary' : 'default'}
                          onClick={() => setViewMode('list')}
                      >
                        <ViewList />
                      </IconButton>
                    </Box>
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    Sort by:
                  </Typography>
                  <Select size="small" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="popular">Most Popular</MenuItem>
                    <MenuItem value="trending">Trending</MenuItem>
                  </Select>
                </Stack>
              </Stack>

              {/* ================= POSTS ================= */}
              {viewMode === 'grid' ? (
                  <Box display="grid" gridTemplateColumns={{ md: '1fr 1fr' }} gap={3} mb={6}>
                    {blogPosts.map((post) => (
                        <MotionCard
                            key={post.id}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handlePostClick(post.id)}
                        >
                          <CardMedia sx={{ position: 'relative', height: 220 }}>
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
                    ))}
                  </Box>
              ) : (
                  <Stack spacing={3} mb={6}>
                    {blogPosts.map((post) => (
                        <MotionCard
                            key={post.id}
                            whileHover={{ scale: 1.01 }}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handlePostClick(post.id)}
                        >
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} p={3}>
                            <Box sx={{ position: 'relative', width: 200, height: 140, flexShrink: 0 }}>
                              <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  style={{ objectFit: 'cover', borderRadius: 8 }}
                              />
                            </Box>

                            <Box flex={1}>
                              <Chip label={post.category} size="small" sx={{ mb: 1 }} />

                              <Typography variant="h5" fontWeight="bold">
                                {post.title}
                              </Typography>

                              <Typography color="text.secondary" mb={2}>
                                {post.excerpt}
                              </Typography>

                              <Stack direction="row" spacing={2} color="text.secondary">
                                <Typography variant="body2">{post.author}</Typography>
                                <Typography variant="body2">•</Typography>
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                  <CalendarMonth fontSize="small" />
                                  <Typography variant="body2">{post.date}</Typography>
                                </Stack>
                                <Typography variant="body2">•</Typography>
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                  <AccessTime fontSize="small" />
                                  <Typography variant="body2">{post.readTime}</Typography>
                                </Stack>
                              </Stack>
                            </Box>
                          </Stack>
                        </MotionCard>
                    ))}
                  </Stack>
              )}

              {/* Pagination */}
              <Stack direction="row" justifyContent="center" spacing={1}>
                <Button disabled variant="outlined">
                  Previous
                </Button>
                <Button variant="contained">1</Button>
                <Button variant="outlined">2</Button>
                <Button variant="outlined">3</Button>
                <Button variant="outlined">Next</Button>
              </Stack>
            </Box>

            {/* ================= SIDEBAR ================= */}
            <Box width={{ lg: 320 }} flexShrink={0}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <Typography fontWeight="bold" mb={2}>
                    Categories
                  </Typography>
                  <Stack spacing={1}>
                    {categories.map((cat) => (
                        <Button key={cat} variant="text" sx={{ justifyContent: 'flex-start' }}>
                          {cat}
                        </Button>
                    ))}
                  </Stack>
                </Card>

                <Card sx={{ p: 3 }}>
                  <Typography fontWeight="bold" mb={2}>
                    Popular Tags
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {tags.map((tag) => (
                        <Chip key={tag} label={tag} variant="outlined" clickable />
                    ))}
                  </Stack>
                </Card>

                <Card sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                  <Typography fontWeight="bold" mb={1}>
                    Newsletter
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    Get the latest articles delivered to your inbox.
                  </Typography>
                  <TextField
                      placeholder="Your email"
                      size="small"
                      fullWidth
                      sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
                  />
                  <Button variant="contained" fullWidth color="secondary">
                    Subscribe
                  </Button>
                </Card>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
  );
}
