'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  Chip,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Stack,
  Select,
  MenuItem,
  IconButton,
  Divider,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { myPosts } from '@/data/content';
import {useState} from "react";
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_POSTS_BY_AUTHOR, DELETE_POST } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface MyPostsPageProps {
  setCurrentPage: (page: string) => void;
}

const MotionCard = motion(Card);

export default function MyPostsPage({ setCurrentPage }: MyPostsPageProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const { data, refetch } = useQuery<AnyData>(GET_POSTS_BY_AUTHOR, {
    variables: { authorId: user?.id || 0 },
    skip: !user,
  });
  const [deletePost] = useMutation<AnyData>(DELETE_POST);

  // Map backend posts to display format
  const backendPosts = data?.postsByAuthor?.map((p: { id: number; title: string; published: boolean; createdAt: string; views: number; likesCount: number; commentsCount: number }) => ({
    id: String(p.id),
    title: p.title,
    status: p.published ? 'published' : 'draft',
    date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    views: p.published ? String(p.views) : '-',
    comments: p.commentsCount,
    likes: p.likesCount,
  })) || [];

  const allPosts = backendPosts.length > 0 ? backendPosts : myPosts;

  const filteredPosts = allPosts.filter((post: { title: string; status: string }) => {
    const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesFilter =
        filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost({ variables: { id: parseInt(id) } });
      toast.success('Post deleted');
      refetch();
    } catch {
      toast.error('Failed to delete post');
    }
  };

  const toggleSelectAll = () => {
    setSelectedPosts(
        selectedPosts.length === filteredPosts.length
            ? []
            : filteredPosts.map((p: { id: string }) => p.id)
    );
  };

  const toggleSelectPost = (id: string) => {
    setSelectedPosts((prev) =>
        prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 6, px: 2 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          {/* Header */}
          <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ sm: 'center' }}
              spacing={2}
              mb={4}
          >
            <Box>
              <Typography variant="h4" fontWeight={700}>
                My Posts
              </Typography>
              <Typography color="text.secondary">
                Manage and track your content
              </Typography>
            </Box>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCurrentPage('editor')}
            >
              New Post
            </Button>
          </Stack>

          {/* Filters */}
          <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{ p: 3, mb: 4 }}
          >
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
              <TextField
                  fullWidth
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                  }}
              />

              <Select
                  value={filterStatus}
                  onChange={(e) =>
                      setFilterStatus(e.target.value as never)
                  }
                  sx={{ width: 180 }}
              >
                <MenuItem value="all">All Posts</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Drafts</MenuItem>
              </Select>

              <Button variant="outlined" startIcon={<FilterAltOutlinedIcon />}>
                More Filters
              </Button>
            </Stack>

            {selectedPosts.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography color="text.secondary">
                      {selectedPosts.length} selected
                    </Typography>
                    <Button size="small" variant="outlined">
                      Bulk Edit
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                    >
                      Delete Selected
                    </Button>
                  </Stack>
                </>
            )}
          </MotionCard>

          {/* Desktop Table */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Card>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                            checked={
                                filteredPosts.length > 0 &&
                                selectedPosts.length === filteredPosts.length
                            }
                            onChange={toggleSelectAll}
                        />
                      </TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Views</TableCell>
                      <TableCell align="right">Comments</TableCell>
                      <TableCell align="right">Likes</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredPosts.map((post: { id: string; title: string; status: string; date: string; views: string | number; comments: number; likes: number }) => (
                        <TableRow key={post.id} hover>
                          <TableCell padding="checkbox">
                            <Checkbox
                                checked={selectedPosts.includes(post.id)}
                                onChange={() => toggleSelectPost(post.id)}
                            />
                          </TableCell>

                          <TableCell sx={{ fontWeight: 500 }}>
                            {post.title}
                          </TableCell>

                          <TableCell>
                            <Chip
                                size="small"
                                label={post.status}
                                color={
                                  post.status === 'published'
                                      ? 'success'
                                      : 'default'
                                }
                            />
                          </TableCell>

                          <TableCell color="text.secondary">
                            {post.date}
                          </TableCell>

                          <TableCell align="right">{post.views}</TableCell>
                          <TableCell align="right">{post.comments}</TableCell>
                          <TableCell align="right">{post.likes}</TableCell>

                          <TableCell>
                            <Stack direction="row" spacing={1}>
                              {post.status === 'published' && (
                                  <IconButton size="small">
                                    <VisibilityIcon />
                                  </IconButton>
                              )}
                              <IconButton
                                  size="small"
                                  onClick={() => setCurrentPage('editor')}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleDeletePost(post.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
              <Card sx={{ p: 6, textAlign: 'center', mt: 4 }}>
                <SearchIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" fontWeight={600}>
                  No posts found
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  {searchQuery
                      ? 'Try adjusting your search or filters'
                      : 'Start creating your first post'}
                </Typography>

                {!searchQuery && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setCurrentPage('editor')}
                    >
                      Create Your First Post
                    </Button>
                )}
              </Card>
          )}
        </Box>
      </Box>
  );
}
