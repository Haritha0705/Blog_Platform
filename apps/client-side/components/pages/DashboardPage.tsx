'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  alpha,
} from '@mui/material';

import {
  TrendingUp,
  Visibility,
  Comment,
  Favorite,
  Description,
  Schedule,
  CalendarMonth,
  FilePresent,
  ArrowForward,
  AutoAwesome,
} from '@mui/icons-material';

import { recentPosts as staticRecentPosts, notifications } from '@/data/content';
import StatIcon from "@/components/ui/StatIcon";
import { useQuery } from '@apollo/client/react';
import { GET_POSTS_BY_AUTHOR } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/auth-context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface DashboardPageProps {
  setCurrentPage: (page: string) => void;
}

const MotionCard = motion(Card);

export function DashboardPage({ setCurrentPage }: DashboardPageProps) {
  const { user } = useAuth();
  const { data, loading } = useQuery<AnyData>(GET_POSTS_BY_AUTHOR, {
    variables: { authorId: user?.id || 0 },
    skip: !user,
  });

  const backendPosts = data?.postsByAuthor || [];

  const totalViews = backendPosts.reduce((acc: number, p: { views: number }) => acc + (p.views || 0), 0);
  const publishedCount = backendPosts.filter((p: { published: boolean }) => p.published).length;
  const totalComments = backendPosts.reduce((acc: number, p: { commentsCount: number }) => acc + (p.commentsCount || 0), 0);
  const totalLikes = backendPosts.reduce((acc: number, p: { likesCount: number }) => acc + (p.likesCount || 0), 0);

  const dashStats = [
    { label: 'Total Views', value: totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}K` : String(totalViews), change: '+12.5%', icon: Visibility, color: '#6366F1', bg: 'rgba(99,102,241,0.08)' },
    { label: 'Published Posts', value: String(publishedCount), change: `+${publishedCount}`, icon: FilePresent, color: '#F97316', bg: 'rgba(249,115,22,0.08)' },
    { label: 'Total Comments', value: String(totalComments), change: `+${totalComments}`, icon: Comment, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
    { label: 'Total Likes', value: totalLikes > 1000 ? `${(totalLikes / 1000).toFixed(1)}K` : String(totalLikes), change: `+${totalLikes}`, icon: Favorite, color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
  ];

  const recentPosts = backendPosts.length > 0
    ? backendPosts.slice(0, 5).map((p: { id: number; title: string; published: boolean; createdAt: string; views: number; commentsCount: number; likesCount: number }) => ({
        id: String(p.id),
        title: p.title,
        status: p.published ? 'published' : 'draft',
        date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        views: p.published ? String(p.views) : '0',
        comments: p.commentsCount,
        likes: p.likesCount,
      }))
    : staticRecentPosts;

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} mb={5}>
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em" mb={0.5}>
              Dashboard
            </Typography>
            <Typography color="text.secondary" fontSize="0.95rem">
              Welcome back{user ? `, ${user.name}` : ''}! Here&apos;s an overview of your content.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Description />}
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
            Write New Post
          </Button>
        </Stack>

        {loading && (
          <Box display="flex" justifyContent="center" py={10}>
            <CircularProgress />
          </Box>
        )}

        {!loading && (
        <>
        {/* Stats */}
        <Box display="grid" gridTemplateColumns={{ xs: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={3} mb={6}>
          {dashStats.map((stat, index) => (
            <MotionCard
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              sx={{
                borderRadius: '16px',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: '12px',
                      bgcolor: stat.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <stat.icon sx={{ fontSize: 20, color: stat.color }} />
                  </Box>
                  <Chip
                    size="small"
                    label={stat.change}
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      bgcolor: 'rgba(16,185,129,0.08)',
                      color: '#10B981',
                      borderRadius: '8px',
                    }}
                  />
                </Stack>
                <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </MotionCard>
          ))}
        </Box>

        <Box display="grid" gridTemplateColumns={{ lg: '2fr 1fr' }} gap={4}>
          {/* Recent Posts */}
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={700}>Recent Posts</Typography>
              <Button
                variant="text"
                size="small"
                endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                onClick={() => setCurrentPage('my-posts')}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                View All
              </Button>
            </Stack>

            <Stack spacing={2}>
              {recentPosts.map((post: { id: string; title: string; status: string; date: string; views: string; comments: number; likes: number }, index: number) => (
                <MotionCard
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  sx={{
                    borderRadius: '14px',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                    '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 16px rgba(99,102,241,0.06)' },
                    transition: 'all 0.2s',
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack spacing={1.5}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box flex={1}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Typography fontWeight={600} fontSize="0.95rem" sx={{ lineHeight: 1.4 }}>
                              {post.title}
                            </Typography>
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
                          </Stack>
                          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                            <CalendarMonth sx={{ fontSize: 14, color: 'text.disabled' }} />
                            <Typography variant="caption" color="text.secondary">{post.date}</Typography>
                          </Stack>
                        </Box>
                      </Stack>
                      {post.status === 'published' && (
                        <>
                          <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.5) }} />
                          <Stack direction="row" spacing={3}>
                            <StatIcon icon={<Visibility sx={{ fontSize: 16, color: 'text.disabled' }} />} value={parseInt(post.views) || 0} />
                            <StatIcon icon={<Comment sx={{ fontSize: 16, color: 'text.disabled' }} />} value={post.comments} />
                            <StatIcon icon={<Favorite sx={{ fontSize: 16, color: 'text.disabled' }} />} value={post.likes} />
                          </Stack>
                        </>
                      )}
                      {post.status === 'draft' && (
                        <>
                          <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.5) }} />
                          <Button
                            size="small"
                            variant="text"
                            endIcon={<ArrowForward sx={{ fontSize: 14 }} />}
                            onClick={() => setCurrentPage('editor')}
                            sx={{ textTransform: 'none', fontWeight: 600, alignSelf: 'flex-start' }}
                          >
                            Continue Editing
                          </Button>
                        </>
                      )}
                    </Stack>
                  </CardContent>
                </MotionCard>
              ))}
              {recentPosts.length === 0 && (
                <Card sx={{ p: 5, textAlign: 'center', borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <Description sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                  <Typography fontWeight={600} mb={1}>No posts yet</Typography>
                  <Typography color="text.secondary" mb={3} variant="body2">Start writing your first article!</Typography>
                  <Button
                    variant="contained"
                    onClick={() => setCurrentPage('editor')}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                    }}
                  >
                    Write Your First Post
                  </Button>
                </Card>
              )}
            </Stack>
          </Box>

          {/* Sidebar */}
          <Stack spacing={3}>
            {/* Quick Actions */}
            <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography fontWeight={700} mb={2.5} fontSize="0.95rem">Quick Actions</Typography>
                <Stack spacing={1}>
                  <Button
                    fullWidth
                    startIcon={<Description sx={{ fontSize: 18 }} />}
                    onClick={() => setCurrentPage('editor')}
                    sx={{
                      justifyContent: 'flex-start',
                      borderRadius: '10px',
                      py: 1.2,
                      textTransform: 'none',
                      fontWeight: 500,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                      color: 'primary.main',
                      '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) },
                    }}
                  >
                    Write New Post
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    startIcon={<Schedule sx={{ fontSize: 18 }} />}
                    onClick={() => setCurrentPage('my-posts')}
                    sx={{ justifyContent: 'flex-start', borderRadius: '10px', py: 1.2, textTransform: 'none', fontWeight: 500 }}
                  >
                    View Drafts
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    startIcon={<TrendingUp sx={{ fontSize: 18 }} />}
                    onClick={() => setCurrentPage('settings')}
                    sx={{ justifyContent: 'flex-start', borderRadius: '10px', py: 1.2, textTransform: 'none', fontWeight: 500 }}
                  >
                    View Analytics
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
                  <Typography fontWeight={700} fontSize="0.95rem">Recent Activity</Typography>
                  <Chip
                    size="small"
                    label={notifications.length}
                    sx={{ fontWeight: 600, fontSize: '0.7rem', borderRadius: '8px', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08), color: 'primary.main' }}
                  />
                </Stack>
                <Stack spacing={2.5}>
                  {notifications.map((n) => (
                    <Box key={n.id}>
                      <Typography variant="body2" fontWeight={500} lineHeight={1.5}>{n.message}</Typography>
                      <Typography variant="caption" color="text.secondary">{n.post}</Typography>
                      <Typography variant="caption" color="text.disabled" display="block" sx={{ mt: 0.3 }}>{n.time}</Typography>
                      <Divider sx={{ mt: 1.5, borderColor: (theme) => alpha(theme.palette.divider, 0.5) }} />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Tip Card */}
            <Card
              sx={{
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.04) 100%)',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '10px',
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                    }}
                  >
                    <AutoAwesome sx={{ fontSize: 20, color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography fontWeight={700} fontSize="0.9rem" mb={0.5}>Performance Tip</Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                      Posts with featured images get 3x more engagement. Add one to your drafts!
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
        </>
        )}
      </Container>
    </Box>
  );
}