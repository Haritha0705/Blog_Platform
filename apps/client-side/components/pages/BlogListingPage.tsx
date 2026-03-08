'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Chip,
  TextField,
  IconButton,
  Stack,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';

import {
  GridView,
  ViewList,
  Tune,
  Search,
} from '@mui/icons-material';

import { blogPosts } from '@/data/content';
import { useState } from 'react';
import { BlogPostCard } from '@/components/ui/BlogPostCard';
import { useQuery } from '@apollo/client/react';
import { GET_POSTS } from '@/lib/graphql/operations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

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

  const { data, loading } = useQuery<AnyData>(GET_POSTS);

  const LayoutComponent = viewMode === 'grid' ? Box : Stack;

  const categories = ['All', 'Technology', 'Development', 'Design', 'Writing', 'Performance'];
  const tags = ['React', 'TypeScript', 'CSS', 'Next.js', 'Design Systems', 'Performance', 'API'];

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  // Merge backend posts with static fallback
  const backendPosts = data?.posts?.map((p: { id: number; title: string; content: string; thumbnail?: string; views: number; author?: { name: string; avatar?: string }; createdAt: string }) => ({
    id: String(p.id),
    title: p.title,
    excerpt: p.content.substring(0, 150) + '...',
    category: 'Technology',
    author: p.author?.name || 'Unknown',
    authorAvatar: p.author?.avatar || '',
    date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: `${Math.ceil(p.content.split(' ').length / 200)} min`,
    image: p.thumbnail || 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=600',
  })) || [];

  const allPosts = backendPosts.length > 0 ? backendPosts : blogPosts;

  const filteredPosts = allPosts.filter((post: { title: string }) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <Box minHeight="100vh">
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6}>
            {/* ================= MAIN ================= */}
            <Box flex={1}>
              {/* Header */}
              <Box mb={4}>
                <Typography variant="h3" fontWeight={800} mb={1}>
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
                      size="small"
                      fullWidth
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 4
                        },
                      }}
                      slotProps={{
                        input: {
                          startAdornment: <Search sx={{ mr: 1, color: 'gray' }} />
                        },
                      }}
                  />

                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined"
                            sx={{
                              borderRadius: 4,
                              borderColor: 'divider',
                              fontWeight: 'bold',
                              color: 'black',
                            }}
                            size="small" startIcon={<Tune />}>
                      Filters
                    </Button>

                    <Box
                        sx={{
                          display: 'flex',
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 4,
                          p: 0.5,
                        }}
                    >
                      <IconButton
                          size="small"
                          color={viewMode === 'grid' ? 'warning' : 'default'}
                          onClick={() => setViewMode('grid')}
                      >
                        <GridView />
                      </IconButton>
                      <IconButton
                          size="small"
                          color={viewMode === 'list' ? 'warning' : 'default'}
                          onClick={() => setViewMode('list')}
                      >
                        <ViewList />
                      </IconButton>
                    </Box>
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body1" color="text.secondary">
                    Sort by:
                  </Typography>
                  <Select size="small" value={sort} onChange={(e) => setSort(e.target.value)}
                  sx={{ borderRadius: 4, width: '160px',fontSize: 15 }}>
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="popular">Most Popular</MenuItem>
                    <MenuItem value="trending">Trending</MenuItem>
                  </Select>
                </Stack>
              </Stack>

              {/* Loading */}
              {loading && (
                <Box display="flex" justifyContent="center" py={6}>
                  <CircularProgress />
                </Box>
              )}

              {/* ================= POSTS ================= */}
              {!loading && (
                <LayoutComponent
                    {...(viewMode === 'grid'
                        ? {
                          display: 'grid',
                          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                          gap: 4,
                          alignItems: 'stretch',
                        }
                        : {
                          spacing: 3,
                        })}
                    mb={6}
                >
                  {filteredPosts.map((post: { id: string; title: string; excerpt: string; category: string; author: string; date: string; readTime: string; image: string }) => (
                      <BlogPostCard
                          key={post.id}
                          post={post}
                          onClick={handlePostClick}
                      />
                  ))}
                </LayoutComponent>
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
                {/* Categories */}
                <Card sx={{ p: 3 }}>
                  <Typography fontWeight={700} mb={2}>
                    Categories
                  </Typography>
                  <Stack spacing={1}>
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant="text"
                            sx={{ justifyContent: 'flex-start' }}
                        >
                          {cat}
                        </Button>
                    ))}
                  </Stack>
                </Card>

                {/* Tags */}
                <Card sx={{ p: 3 }}>
                  <Typography fontWeight={700} mb={2}>
                    Popular Tags
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {tags.map((tag) => (
                        <Chip key={tag} label={tag} variant="outlined" clickable />
                    ))}
                  </Stack>
                </Card>

                {/* Newsletter */}
                <Card
                    sx={{
                      p: 3,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    }}
                >
                  <Typography fontWeight={700} mb={1}>
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
