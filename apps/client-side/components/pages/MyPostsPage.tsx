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
  alpha,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

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
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
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
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)', py: { xs: 4, md: 6 }, px: 2 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ sm: 'center' }}
          spacing={2}
          mb={5}
        >
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em">
              My Posts
            </Typography>
            <Typography color="text.secondary" fontSize="0.95rem">
              Manage and track your content
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCurrentPage('editor')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '12px',
              px: 3,
              py: 1.2,
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
                background: 'linear-gradient(135deg, #5558E8 0%, #7C4FE0 100%)',
              },
            }}
          >
            New Post
          </Button>
        </Stack>

        {/* Filters */}
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
          }}
        >
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              slotProps={{
                input: {
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.disabled' }} />,
                },
              }}
            />

            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as never)}
              sx={{ width: 180, borderRadius: '12px', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '12px' } }}
            >
              <MenuItem value="all">All Posts</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="draft">Drafts</MenuItem>
            </Select>

            <Button
              variant="outlined"
              startIcon={<FilterAltOutlinedIcon />}
              sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 600, borderColor: 'divider', color: 'text.secondary' }}
            >
              More Filters
            </Button>
          </Stack>

          {selectedPosts.length > 0 && (
            <>
              <Divider sx={{ my: 2.5, borderColor: (theme) => alpha(theme.palette.divider, 0.5) }} />
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography color="text.secondary" fontSize="0.875rem">
                  {selectedPosts.length} selected
                </Typography>
                <Button size="small" variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}>
                  Bulk Edit
                </Button>
                <Button size="small" variant="outlined" color="error" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}>
                  Delete Selected
                </Button>
              </Stack>
            </>
          )}
        </MotionCard>

        {/* Desktop Table */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none', overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#FAFBFC' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={filteredPosts.length > 0 && selectedPosts.length === filteredPosts.length}
                        onChange={toggleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary', letterSpacing: '0.03em' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary', letterSpacing: '0.03em' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary', letterSpacing: '0.03em' }}>Date</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary', letterSpacing: '0.03em' }}>Views</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary', letterSpacing: '0.03em' }}>Comments</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary', letterSpacing: '0.03em' }}>Likes</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredPosts.map((post: { id: string; title: string; status: string; date: string; views: string | number; comments: number; likes: number }) => (
                    <TableRow
                      key={post.id}
                      hover
                      sx={{
                        '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02) },
                        transition: 'background-color 0.15s',
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedPosts.includes(post.id)}
                          onChange={() => toggleSelectPost(post.id)}
                        />
                      </TableCell>

                      <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {post.title}
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={post.status}
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.65rem',
                            height: 22,
                            borderRadius: '6px',
                            bgcolor: post.status === 'published' ? 'rgba(16,185,129,0.08)' : 'rgba(148,163,184,0.15)',
                            color: post.status === 'published' ? '#10B981' : '#64748B',
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        {post.date}
                      </TableCell>

                      <TableCell align="right" sx={{ fontSize: '0.875rem' }}>{post.views}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '0.875rem' }}>{post.comments}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '0.875rem' }}>{post.likes}</TableCell>

                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {post.status === 'published' && (
                            <IconButton size="small" sx={{ borderRadius: '8px', '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06) } }}>
                              <VisibilityIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            onClick={() => setCurrentPage('editor')}
                            sx={{ borderRadius: '8px', '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06) } }}
                          >
                            <EditIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeletePost(post.id)}
                            sx={{ borderRadius: '8px', '&:hover': { bgcolor: 'rgba(239,68,68,0.06)', color: 'error.main' } }}
                          >
                            <DeleteIcon sx={{ fontSize: 18 }} />
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
          <Card sx={{
            p: 6,
            textAlign: 'center',
            mt: 4,
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
          }}>
            <DescriptionOutlinedIcon sx={{ fontSize: 56, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" fontWeight={700} mb={1}>
              No posts found
            </Typography>
            <Typography color="text.secondary" mb={3} variant="body2">
              {searchQuery
                ? 'Try adjusting your search or filters'
                : 'Start creating your first post'}
            </Typography>

            {!searchQuery && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCurrentPage('editor')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                }}
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
