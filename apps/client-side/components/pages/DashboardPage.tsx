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
    { label: 'Total Views', value: totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}K` : String(totalViews), change: '+12.5%', icon: Visibility },
    { label: 'Published Posts', value: String(publishedCount), change: `+${publishedCount}`, icon: FilePresent },
    { label: 'Total Comments', value: String(totalComments), change: `+${totalComments}`, icon: Comment },
    { label: 'Total Likes', value: totalLikes > 1000 ? `${(totalLikes / 1000).toFixed(1)}K` : String(totalLikes), change: `+${totalLikes}`, icon: Favorite },
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
      <Box minHeight="100vh" bgcolor="grey.100">
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box mb={4}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
              Dashboard
            </Typography>
            <Typography color="text.secondary">
              Welcome back{user ? `, ${user.name}` : ''}! Here&apos;s an overview of your content.
            </Typography>
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress />
            </Box>
          )}

          {!loading && (
          <>
          <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }}
              gap={3}
              mb={6}
          >
            {dashStats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" mb={2}>
                      <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor:
                                stat.label === 'Total Views'
                                    ? 'primary.light'
                                    : stat.label === 'Published Posts'
                                        ? 'secondary.light'
                                        : stat.label === 'Total Comments'
                                            ? 'success.light'
                                            : 'warning.light',
                          }}
                      >
                        <stat.icon fontSize="small" />
                      </Box>
                      <Chip size="small" label={stat.change} />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
            ))}
          </Box>

          <Box display="grid" gridTemplateColumns={{ lg: '2fr 1fr' }} gap={4}>
            <Box>
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Recent Posts
                </Typography>
                <Button variant="outlined" size="small" onClick={() => setCurrentPage('my-posts')}>
                  View All
                </Button>
              </Stack>

              <Stack spacing={2}>
                {recentPosts.map((post: { id: string; title: string; status: string; date: string; views: string; comments: number; likes: number }) => (
                    <MotionCard key={post.id} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between">
                            <Box>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography fontWeight="bold">{post.title}</Typography>
                                <Chip size="small" label={post.status} color={post.status === 'published' ? 'success' : 'default'} />
                              </Stack>
                              <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                                <CalendarMonth fontSize="small" />
                                <Typography variant="caption" color="text.secondary">{post.date}</Typography>
                              </Stack>
                            </Box>
                          </Stack>
                          {post.status === 'published' && (
                              <>
                                <Divider />
                                <Stack direction="row" spacing={3}>
                                  <StatIcon icon={<Visibility fontSize="small" />} value={parseInt(post.views) || 0} />
                                  <StatIcon icon={<Comment fontSize="small" />} value={post.comments} />
                                  <StatIcon icon={<Favorite fontSize="small" />} value={post.likes} />
                                </Stack>
                              </>
                          )}
                          {post.status === 'draft' && (
                              <>
                                <Divider />
                                <Button size="small" variant="outlined" onClick={() => setCurrentPage('editor')}>Continue Editing</Button>
                              </>
                          )}
                        </Stack>
                      </CardContent>
                    </MotionCard>
                ))}
                {recentPosts.length === 0 && (
                  <Card sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">No posts yet. Start writing!</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => setCurrentPage('editor')}>Write Your First Post</Button>
                  </Card>
                )}
              </Stack>
            </Box>

            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Typography fontWeight="bold" mb={2}>Quick Actions</Typography>
                  <Stack spacing={1}>
                    <Button fullWidth startIcon={<Description />} onClick={() => setCurrentPage('editor')}>Write New Post</Button>
                    <Button fullWidth variant="outlined" startIcon={<Schedule />} onClick={() => setCurrentPage('my-posts')}>View Drafts</Button>
                    <Button fullWidth variant="outlined" startIcon={<TrendingUp />} onClick={() => setCurrentPage('settings')}>View Analytics</Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography fontWeight="bold">Recent Activity</Typography>
                    <Chip size="small" label={notifications.length} />
                  </Stack>
                  <Stack spacing={2}>
                    {notifications.map((n) => (
                        <Box key={n.id}>
                          <Typography variant="body2" fontWeight="medium">{n.message}</Typography>
                          <Typography variant="caption" color="text.secondary">{n.post}</Typography>
                          <Typography variant="caption" color="text.secondary" display="block">{n.time}</Typography>
                          <Divider sx={{ mt: 1 }} />
                        </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ bgcolor: 'primary.light' }}>
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    <TrendingUp color="primary" />
                    <Box>
                      <Typography fontWeight="bold">Performance Tip</Typography>
                      <Typography variant="body2" color="text.secondary">
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