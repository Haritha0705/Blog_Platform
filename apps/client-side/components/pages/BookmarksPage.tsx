'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Chip,
  Avatar,
  IconButton,
  Skeleton,
  alpha,
  Divider,
  Button,
} from '@mui/material';
import {
  BookmarkRemoveOutlined,
  CalendarMonthOutlined,
  AccessTimeOutlined,
  FavoriteBorder,
  ChatBubbleOutline,
  BookmarkBorderOutlined,
  CollectionsBookmarkOutlined,
} from '@mui/icons-material';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_BOOKMARKS_BY_USER, TOGGLE_BOOKMARK } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface BookmarksPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
}

const MotionCard = motion(Card);

export default function BookmarksPage({ setCurrentPage, setSelectedPost }: BookmarksPageProps) {
  const { user } = useAuth();

  const { data, loading, refetch } = useQuery<AnyData>(GET_BOOKMARKS_BY_USER, {
    variables: { userId: user?.id || 0 },
    skip: !user,
  });

  const [toggleBookmark] = useMutation<AnyData>(TOGGLE_BOOKMARK);

  const bookmarks = data?.bookmarksByUser || [];

  const handleRemoveBookmark = async (postId: number) => {
    if (!user) return;
    try {
      await toggleBookmark({ variables: { input: { userId: user.id, postId } } });
      toast.success('Removed from reading list');
      refetch();
    } catch {
      toast.error('Failed to remove bookmark');
    }
  };

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Box
            sx={{
              p: 1.2,
              borderRadius: '12px',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CollectionsBookmarkOutlined sx={{ color: 'primary.main', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em">
              Reading List
            </Typography>
            <Typography color="text.secondary" fontSize="0.95rem">
              {bookmarks.length} saved {bookmarks.length === 1 ? 'article' : 'articles'}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Loading Skeletons */}
        {loading && (
          <Stack spacing={3}>
            {[1, 2, 3].map((i) => (
              <Card key={i} sx={{ p: 3, borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                  <Skeleton variant="rounded" width={200} height={140} sx={{ borderRadius: '12px', flexShrink: 0 }} />
                  <Box flex={1}>
                    <Skeleton variant="text" width="30%" height={24} />
                    <Skeleton variant="text" width="90%" height={32} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <Stack direction="row" spacing={2} mt={2}>
                      <Skeleton variant="circular" width={28} height={28} />
                      <Skeleton variant="text" width={100} />
                    </Stack>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}

        {/* Empty State */}
        {!loading && bookmarks.length === 0 && (
          <Card
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
            }}
          >
            <BookmarkBorderOutlined sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" fontWeight={700} mb={1}>
              Your reading list is empty
            </Typography>
            <Typography color="text.secondary" mb={3} variant="body2" sx={{ maxWidth: 400, mx: 'auto' }}>
              Save articles you want to read later by clicking the bookmark icon on any post.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setCurrentPage('blog')}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.2,
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5558E8 0%, #7C4FE0 100%)',
                  boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
                },
              }}
            >
              Discover Articles
            </Button>
          </Card>
        )}

        {/* Bookmarked Posts */}
        {!loading && bookmarks.length > 0 && (
          <AnimatePresence>
            <Stack spacing={3}>
              {bookmarks.map((bookmark: AnyData, index: number) => {
                const post = bookmark.post;
                if (!post) return null;

                const readTime = `${Math.ceil((post.content?.split(' ').length || 0) / 200)} min read`;
                const date = new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <MotionCard
                    key={bookmark.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                    sx={{
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: '16px',
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                      },
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={3}
                      p={3}
                      onClick={() => handlePostClick(String(post.id))}
                    >
                      {/* Image */}
                      {post.thumbnail && (
                        <Box
                          sx={{
                            width: { xs: '100%', sm: 200 },
                            aspectRatio: '16 / 10',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            position: 'relative',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                      )}

                      {/* Content */}
                      <Box flex={1}>
                        {post.tags?.length > 0 && (
                          <Stack direction="row" spacing={0.5} mb={1}>
                            {post.tags.slice(0, 2).map((tag: { id: number; name: string }) => (
                              <Chip
                                key={tag.id}
                                label={tag.name}
                                size="small"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '0.65rem',
                                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                  color: 'primary.main',
                                  borderRadius: '6px',
                                  height: 22,
                                }}
                              />
                            ))}
                          </Stack>
                        )}

                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{
                            mb: 0.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.35,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {post.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.6,
                          }}
                        >
                          {post.content?.substring(0, 160)}...
                        </Typography>

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                              {post.author?.avatar ? (
                                <Image src={post.author.avatar} alt={post.author.name} fill style={{ objectFit: 'cover' }} />
                              ) : (
                                post.author?.name?.charAt(0) || 'U'
                              )}
                            </Avatar>
                            <Typography variant="caption" fontWeight={600}>
                              {post.author?.name}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">·</Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <CalendarMonthOutlined sx={{ fontSize: 13, color: 'text.disabled' }} />
                              <Typography variant="caption" color="text.secondary">{date}</Typography>
                            </Stack>
                            <Typography variant="caption" color="text.disabled">·</Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <AccessTimeOutlined sx={{ fontSize: 13, color: 'text.disabled' }} />
                              <Typography variant="caption" color="text.secondary">{readTime}</Typography>
                            </Stack>
                          </Stack>

                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.disabled' }}>
                              <FavoriteBorder sx={{ fontSize: 14 }} />
                              <Typography variant="caption">{post.likesCount || 0}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.disabled', ml: 1 }}>
                              <ChatBubbleOutline sx={{ fontSize: 14 }} />
                              <Typography variant="caption">{post.commentsCount || 0}</Typography>
                            </Stack>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveBookmark(post.id);
                              }}
                              sx={{
                                ml: 1,
                                borderRadius: '8px',
                                color: 'primary.main',
                                '&:hover': {
                                  bgcolor: 'rgba(239,68,68,0.06)',
                                  color: 'error.main',
                                },
                              }}
                              title="Remove from reading list"
                            >
                              <BookmarkRemoveOutlined sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </MotionCard>
                );
              })}
            </Stack>
          </AnimatePresence>
        )}
      </Container>
    </Box>
  );
}

