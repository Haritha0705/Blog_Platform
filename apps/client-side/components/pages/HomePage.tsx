'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Button,
  Chip,
  TextField,
  Stack,
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import {
  featuredPost,
  latestPosts,
  popularPosts,
  categories,
} from '@/data/content';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
}

const MotionCard = motion(Card);

export default function HomePage({
                                   setCurrentPage,
                                   setSelectedPost,
                                 }: HomePageProps) {
  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  return (
      <Box>

        {/* ================= HERO SECTION ================= */}
        <Box
            sx={{
              py: { xs: 8, lg: 14 },
              background: 'linear-gradient(135deg, rgba(25,118,210,0.1), transparent)',
            }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid container spacing={{ xs:12, lg:6 }}>
                <Stack spacing={3}>
                  <Chip label={featuredPost.category} color="primary" />

                  <Typography variant="h3" fontWeight={700}>
                    {featuredPost.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {featuredPost.excerpt}
                  </Typography>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2">
                      {featuredPost.author}
                    </Typography>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <CalendarTodayIcon fontSize="small" />
                      <Typography variant="body2">
                        {featuredPost.date}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <AccessTimeIcon fontSize="small" />
                      <Typography variant="body2">
                        {featuredPost.readTime}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => handlePostClick(featuredPost.id)}
                  >
                    Read Article
                  </Button>
                </Stack>
              </Grid>

              <Grid container spacing={{ xs:12, lg:6 }}>
                <Box sx={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: 4, overflow: 'hidden' }}>
                  <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ================= LATEST POSTS ================= */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Stack direction="row" justifyContent="space-between" mb={6}>
            <Typography variant="h4" fontWeight={700}>
              Latest Articles
            </Typography>

            <Button variant="outlined" onClick={() => setCurrentPage('blog')}>
              View All
            </Button>
          </Stack>

          <Grid container spacing={4}>
            {latestPosts.map((post) => (
                <Grid container spacing={{ xs:12, lg:4, md:6 }} key={post.id}>
                  <MotionCard
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                      sx={{ height: '100%' }}
                  >
                    <CardActionArea onClick={() => handlePostClick(post.id)}>
                      <CardContent>
                        <Chip
                            label={post.category}
                            size="small"
                            sx={{ mb: 2 }}
                        />

                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {post.title}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                          {post.excerpt}
                        </Typography>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                          <Typography variant="caption">
                            {post.author}
                          </Typography>

                          <Stack direction="row" spacing={1} alignItems="center">
                            <AccessTimeIcon fontSize="small" />
                            <Typography variant="caption">
                              {post.readTime}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </MotionCard>
                </Grid>
            ))}
          </Grid>
        </Container>

        {/* ================= POPULAR & CATEGORIES ================= */}
        <Box sx={{ py: 10, bgcolor: 'grey.100' }}>
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              {/* Popular */}
              <Grid container spacing={{ xs:12, lg:6 }}>
                <Stack direction="row" spacing={1} mb={4} alignItems="center">
                  <TrendingUpIcon color="primary" />
                  <Typography variant="h5" fontWeight={700}>
                    Popular This Week
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  {popularPosts.map((post, i) => (
                      <Card
                          key={post.id}
                          onClick={() => handlePostClick(post.id)}
                          sx={{ cursor: 'pointer' }}
                      >
                        <CardContent>
                          <Stack direction="row" spacing={2}>
                            <Typography
                                variant="h4"
                                color="primary"
                                sx={{ opacity: 0.3 }}
                            >
                              {(i + 1).toString().padStart(2, '0')}
                            </Typography>

                            <Box>
                              <Typography fontWeight={600}>
                                {post.title}
                              </Typography>

                              <Typography variant="caption" color="text.secondary">
                                {post.views} views • {post.readTime}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                  ))}
                </Stack>
              </Grid>

              {/* Categories */}
              <Grid container spacing={{ xs:12, lg:6}}>
                <Typography variant="h5" fontWeight={700} mb={4}>
                  Browse by Category
                </Typography>

                <Grid container spacing={3}>
                  {categories.map((cat) => (
                      <Grid container spacing={{ xs:6 }} key={cat.name}>
                        <MotionCard
                            whileHover={{ scale: 1.05 }}
                            sx={{ p: 3, cursor: 'pointer' }}
                            onClick={() => setCurrentPage('blog')}
                        >
                          <Typography fontWeight={600}>
                            {cat.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {cat.count} articles
                          </Typography>
                        </MotionCard>
                      </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ================= NEWSLETTER ================= */}
        <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
          <Card sx={{ p: 6, bgcolor: 'primary.main', color: '#fff' }}>
            <Typography variant="h4" fontWeight={700} mb={2}>
              Stay Updated
            </Typography>

            <Typography mb={4}>
              Get the latest articles directly in your inbox.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                  fullWidth
                  placeholder="Enter your email"
                  variant="filled"
                  sx={{ bgcolor: '#fff', borderRadius: 1 }}
              />
              <Button variant="contained" color="secondary" size="large">
                Subscribe
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>
  );
}
