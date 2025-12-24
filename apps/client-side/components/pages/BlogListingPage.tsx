'use client';

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

import {blogPosts, posts} from '@/data/content';
import {useState} from "react";
import {BlogPostCard} from "@/components/ui/BlogPostCard";

interface BlogListingPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
}

export function BlogListingPage({
                                  setCurrentPage,
                                  setSelectedPost,
                                }: BlogListingPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('latest');

  const LayoutComponent = viewMode === 'grid' ? Box : Stack;

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
              <LayoutComponent
                  {...(viewMode === 'grid'
                      ? {
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 3,
                      }
                      : {
                        spacing: 3,
                      })}
                  mb={6}
              >
                {blogPosts.map((post) => (
                    <BlogPostCard
                        key={post.id}
                        post={post}
                        onClick={handlePostClick}
                    />
                ))}
              </LayoutComponent>


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
