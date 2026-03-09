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
  Divider,
  Skeleton,
  alpha,
} from '@mui/material';

import {
  People,
  Visibility,
  AccessTime,
  FavoriteBorder,
  ChatBubbleOutline,
} from '@mui/icons-material';

import { author as staticAuthor, posts as staticPosts } from '@/data/content';
import Stat from '@/components/ui/Stat';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_USER,
  GET_POSTS_BY_AUTHOR,
  TOGGLE_FOLLOW,
  IS_FOLLOWING,
  GET_FOLLOWERS_COUNT,
} from '@/lib/graphql/operations';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface AuthorPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
  authorId?: number;
}

const MotionCard = motion(Card);

export function AuthorPage({ setCurrentPage, setSelectedPost, authorId }: AuthorPageProps) {
  const [tab, setTab] = useState(0);
  const { user } = useAuth();

  const isRealAuthor = authorId && authorId > 0;

  const { data: userData, loading: userLoading } = useQuery<AnyData>(GET_USER, {
    variables: { id: authorId },
    skip: !isRealAuthor,
  });

  const { data: postsData, loading: postsLoading } = useQuery<AnyData>(GET_POSTS_BY_AUTHOR, {
    variables: { authorId: authorId },
    skip: !isRealAuthor,
  });

  const { data: followingData, refetch: refetchFollowing } = useQuery<AnyData>(IS_FOLLOWING, {
    variables: { followerId: user?.id || 0, followingId: authorId || 0 },
    skip: !user || !isRealAuthor || authorId === user?.id,
  });

  const { data: followersCountData, refetch: refetchFollowersCount } = useQuery<AnyData>(GET_FOLLOWERS_COUNT, {
    variables: { userId: authorId || 0 },
    skip: !isRealAuthor,
  });

  const [toggleFollow] = useMutation<AnyData>(TOGGLE_FOLLOW);

  const isFollowingAuthor = followingData?.isFollowing || false;
  const followersCount = followersCountData?.followersCount || 0;

  const handleFollow = async () => {
    if (!user || !authorId) {
      toast.error('Please login to follow');
      return;
    }
    try {
      await toggleFollow({ variables: { input: { followerId: user.id, followingId: authorId } } });
      refetchFollowing();
      refetchFollowersCount();
      toast.success(isFollowingAuthor ? 'Unfollowed' : 'Following!');
    } catch {
      toast.error('Failed to toggle follow');
    }
  };

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  const realUser = userData?.user;
  const authorData = realUser
    ? {
        name: realUser.name,
        email: realUser.email,
        avatar: realUser.avatar || '',
        bio: realUser.bio || '',
        postsCount: realUser.postsCount || 0,
        followersCount: followersCount || realUser.followersCount || 0,
        followingCount: realUser.followingCount || 0,
        createdAt: realUser.createdAt,
      }
    : {
        name: staticAuthor.name,
        email: '',
        avatar: staticAuthor.avatar,
        bio: staticAuthor.bio,
        postsCount: staticAuthor.stats.posts,
        followersCount: staticAuthor.stats.followers,
        followingCount: 0,
        createdAt: '',
      };

  const backendPosts =
    postsData?.postsByAuthor
      ?.filter((p: { published: boolean }) => p.published)
      ?.map(
        (p: {
          id: number; title: string; content: string; thumbnail?: string;
          views: number; likesCount: number; commentsCount: number;
          tags?: { name: string }[]; createdAt: string;
        }) => ({
          id: String(p.id),
          title: p.title,
          excerpt: p.content.substring(0, 150) + '...',
          category: p.tags?.[0]?.name || 'General',
          date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          readTime: `${Math.ceil(p.content.split(' ').length / 200)} min`,
          image: p.thumbnail || 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=600',
          views: p.views,
          likes: p.likesCount,
          comments: p.commentsCount,
        }),
      ) || [];

  const authorPosts = backendPosts.length > 0 ? backendPosts : staticPosts;
  const loading = userLoading || postsLoading;

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
            content: '""', position: 'absolute', top: -100, right: -100,
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          },
        }}
      >
        <Container maxWidth="md" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
          {loading ? (
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              <Skeleton variant="circular" width={128} height={128} />
              <Box flex={1}>
                <Skeleton variant="text" width="50%" height={40} />
                <Skeleton variant="text" width="30%" height={24} />
                <Skeleton variant="text" width="80%" height={60} sx={{ mt: 2 }} />
                <Stack direction="row" spacing={4} mt={2}>
                  <Skeleton variant="text" width={80} height={40} />
                  <Skeleton variant="text" width={80} height={40} />
                  <Skeleton variant="text" width={80} height={40} />
                </Stack>
              </Box>
            </Stack>
          ) : (
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              <Avatar
                sx={{
                  width: 128, height: 128, border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  fontSize: 48, bgcolor: 'primary.main',
                }}
              >
                {authorData.avatar ? (
                  <Image src={authorData.avatar} alt={authorData.name} fill style={{ objectFit: 'cover' }} />
                ) : (
                  authorData.name.charAt(0).toUpperCase()
                )}
              </Avatar>

              <Box flex={1}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} mb={2}>
                  <Box>
                    <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em">
                      {authorData.name}
                    </Typography>
                    {authorData.email && (
                      <Typography color="text.secondary" fontSize="0.9rem">{authorData.email}</Typography>
                    )}
                  </Box>

                  {user && authorId !== user.id && (
                    <Button
                      variant={isFollowingAuthor ? 'outlined' : 'contained'}
                      size="large"
                      startIcon={<People />}
                      onClick={handleFollow}
                      sx={{
                        textTransform: 'none', fontWeight: 600, borderRadius: '12px', px: 3, alignSelf: 'flex-start',
                        ...(isFollowingAuthor
                          ? { borderColor: 'divider', color: 'text.primary', '&:hover': { borderColor: 'error.main', color: 'error.main', bgcolor: 'rgba(239,68,68,0.04)' } }
                          : { background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)', '&:hover': { boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)', background: 'linear-gradient(135deg, #5558E8 0%, #7C4FE0 100%)' } }),
                      }}
                    >
                      {isFollowingAuthor ? 'Following' : 'Follow'}
                    </Button>
                  )}
                </Stack>

                {authorData.bio && (
                  <Typography color="text.secondary" mb={3} sx={{ lineHeight: 1.7, maxWidth: 600 }}>{authorData.bio}</Typography>
                )}

                <Stack direction="row" spacing={4} mb={2}>
                  <Stat label="Followers" value={authorData.followersCount} />
                  <Stat label="Posts" value={authorData.postsCount} />
                  <Stat label="Following" value={authorData.followingCount} />
                </Stack>

                {authorData.createdAt && (
                  <Typography variant="caption" color="text.disabled">
                    Member since {new Date(authorData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </Typography>
                )}
              </Box>
            </Stack>
          )}
        </Container>
      </Box>

      {/* ================= CONTENT ================= */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.9rem' },
            '& .MuiTabs-indicator': { borderRadius: '2px', height: 3 },
          }}
        >
          <Tab label={`Posts (${authorPosts.length})`} />
          <Tab label="About" />
        </Tabs>

        {/* POSTS */}
        {tab === 0 && (
          <Box mt={4}>
            {loading ? (
              <Box display="grid" gridTemplateColumns={{ md: '1fr 1fr' }} gap={3}>
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none', overflow: 'hidden' }}>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" width="30%" height={24} />
                      <Skeleton variant="text" width="90%" height={28} sx={{ mt: 1 }} />
                      <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : authorPosts.length === 0 ? (
              <Card sx={{ p: 6, textAlign: 'center', borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <Typography variant="h6" fontWeight={600} mb={1}>No posts yet</Typography>
                <Typography color="text.secondary" variant="body2">This author hasn&apos;t published any articles yet.</Typography>
              </Card>
            ) : (
              <Box display="grid" gridTemplateColumns={{ md: '1fr 1fr' }} gap={3}>
                {authorPosts.map((post: { id: string; title: string; excerpt: string; category: string; date: string; readTime: string; image: string; views: number | string; likes: number; comments: number }, index: number) => (
                  <MotionCard
                    key={post.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    whileHover={{ y: -6 }}
                    onClick={() => handlePostClick(post.id)}
                    sx={{
                      cursor: 'pointer', borderRadius: '16px', border: '1px solid',
                      borderColor: 'divider', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      overflow: 'hidden',
                      '&:hover': { borderColor: 'primary.main', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardMedia sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                    </CardMedia>

                    <CardContent sx={{ p: 3 }}>
                      <Chip label={post.category} size="small" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.7rem', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08), color: 'primary.main', borderRadius: '8px' }} />
                      <Typography variant="h6" fontWeight={700} gutterBottom sx={{ lineHeight: 1.35, letterSpacing: '-0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </Typography>
                      <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.5) }} />
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} color="text.secondary">
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <AccessTime sx={{ fontSize: 14 }} />
                            <Typography variant="caption">{post.readTime}</Typography>
                          </Stack>
                          <Typography variant="caption">{post.date}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Visibility sx={{ fontSize: 14 }} />
                            <Typography variant="caption">{typeof post.views === 'number' ? post.views.toLocaleString() : post.views}</Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <FavoriteBorder sx={{ fontSize: 14 }} />
                            <Typography variant="caption">{post.likes}</Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <ChatBubbleOutline sx={{ fontSize: 14 }} />
                            <Typography variant="caption">{post.comments}</Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </MotionCard>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* ABOUT */}
        {tab === 1 && (
          <Card sx={{ mt: 4, p: 4, borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
            <Typography variant="h5" fontWeight={800} letterSpacing="-0.02em" mb={3}>
              About {authorData.name}
            </Typography>
            {authorData.bio ? (
              <Typography color="text.secondary" mb={3} sx={{ lineHeight: 1.8 }}>{authorData.bio}</Typography>
            ) : (
              <Typography color="text.disabled" mb={3} fontStyle="italic">This author hasn&apos;t added a bio yet.</Typography>
            )}
            {authorData.createdAt && (
              <Box>
                <Typography variant="h6" fontWeight={700} mb={1.5}>Member Info</Typography>
                <Typography color="text.secondary" variant="body2">
                  Joined {new Date(authorData.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Typography>
              </Box>
            )}
          </Card>
        )}
      </Container>
    </Box>
  );
}

