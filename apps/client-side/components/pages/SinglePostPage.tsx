'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import {
  Box,
  Card,
  Typography,
  Button,
  Avatar,
  Stack,
  Chip,
  TextField,
  alpha,
} from '@mui/material';

import {
  CalendarTodayOutlined as CalendarIcon,
  AccessTimeOutlined as ClockIcon,
  ShareOutlined as ShareIcon,
  BookmarkBorderOutlined as BookmarkIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  LinkOutlined as LinkIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

import { relatedPosts, comments as staticComments, tableOfContents } from '@/data/content';
import {useState} from "react";
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_POST, GET_COMMENTS_BY_POST, CREATE_COMMENT, TOGGLE_LIKE } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface SinglePostPageProps {
  setCurrentPage: (page: string) => void;
  postId?: string;
}

const MotionCard = motion(Card);

export default function SinglePostPage({ setCurrentPage, postId }: SinglePostPageProps) {
  const [activeSection, setActiveSection] = useState('introduction');
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const postIdNum = postId ? parseInt(postId) : 0;
  const isRealPost = postIdNum > 0;

  const { data: postData } = useQuery<AnyData>(GET_POST, {
    variables: { id: postIdNum },
    skip: !isRealPost,
  });

  const { data: commentsData, refetch: refetchComments } = useQuery<AnyData>(GET_COMMENTS_BY_POST, {
    variables: { postId: postIdNum },
    skip: !isRealPost,
  });

  const [createComment] = useMutation<AnyData>(CREATE_COMMENT);
  const [toggleLike] = useMutation<AnyData>(TOGGLE_LIKE);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    if (!user) {
      toast.error('Please login to comment');
      return;
    }
    try {
      await createComment({
        variables: { createCommentInput: { content: newComment, postId: postIdNum, authorId: user.id } },
      });
      setNewComment('');
      refetchComments();
      toast.success('Comment posted!');
    } catch {
      toast.error('Failed to post comment');
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like');
      return;
    }
    try {
      await toggleLike({ variables: { createLikeInput: { userId: user.id, postId: postIdNum } } });
      toast.success('Liked!');
    } catch {
      toast.error('Failed to toggle like');
    }
  };

  const realPost = postData?.post;
  const realComments = commentsData?.commentsByPost || [];

  const singlePost = realPost ? {
    id: String(realPost.id),
    title: realPost.title,
    category: 'Technology',
    author: {
      name: realPost.author?.name || 'Unknown',
      avatar: realPost.author?.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      bio: realPost.author?.bio || '',
      followers: '0',
    },
    date: new Date(realPost.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: `${Math.ceil((realPost.content?.split(' ').length || 0) / 200)} min read`,
    views: String(realPost.views || 0),
    image: realPost.thumbnail || 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=1080',
    content: realPost.content || '',
  } : {
    id: postId || '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    category: 'Technology',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      bio: 'Senior Software Engineer and Tech Writer.',
      followers: '12.5K',
    },
    date: 'November 28, 2025',
    readTime: '8 min read',
    views: '3.2K',
    image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=1080',
    content: '',
  };

  const displayComments = realComments.length > 0
    ? realComments.map((c: { id: number; content: string; author?: { name: string; avatar?: string }; createdAt: string }) => ({
        id: String(c.id),
        author: c.author?.name || 'Unknown',
        avatar: c.author?.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=50',
        date: new Date(c.createdAt).toLocaleDateString(),
        content: c.content,
        likes: 0,
        replies: [],
      }))
    : staticComments;

  return (
      <Box sx={{ minHeight: '100vh', py: 6, px: 2, background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6}>
            {/* Main Content */}
            <Box flex={1} maxWidth={{ lg: '720px' }}>
              {/* Header */}
              <Stack spacing={2} mb={4}>
                <Button
                    startIcon={<ChevronLeftIcon />}
                    onClick={() => setCurrentPage('blog')}
                    variant="text"
                    sx={{ textTransform: 'none', fontWeight: 500, borderRadius: '10px' }}
                >
                  Back to Articles
                </Button>

                <Chip
                  label={singlePost.category}
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    borderRadius: '10px',
                    alignSelf: 'flex-start',
                  }}
                />

                <Typography variant="h3" fontWeight={800} letterSpacing="-0.02em" lineHeight={1.2}>
                  {singlePost.title}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 48, height: 48 }}>
                    <Image
                        src={singlePost.author.avatar}
                        alt={singlePost.author.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                  </Avatar>
                  <Box>
                    <Typography fontWeight={500}>{singlePost.author.name}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <CalendarIcon fontSize="small" />
                        <Typography variant="caption">{singlePost.date}</Typography>
                      </Stack>
                      <Typography variant="caption">•</Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <ClockIcon fontSize="small" />
                        <Typography variant="caption">{singlePost.readTime}</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>

                {/* Share Buttons */}
                <Stack direction="row" spacing={1} alignItems="center" py={2}>
                  <Button startIcon={<ShareIcon />} size="small" variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, borderColor: 'divider' }}>
                    Share
                  </Button>
                  <Button size="small" variant="outlined" sx={{ borderRadius: '10px', minWidth: 36, borderColor: 'divider' }}>
                    <TwitterIcon sx={{ fontSize: 18 }} />
                  </Button>
                  <Button size="small" variant="outlined" sx={{ borderRadius: '10px', minWidth: 36, borderColor: 'divider' }}>
                    <FacebookIcon sx={{ fontSize: 18 }} />
                  </Button>
                  <Button size="small" variant="outlined" sx={{ borderRadius: '10px', minWidth: 36, borderColor: 'divider' }}>
                    <LinkedInIcon sx={{ fontSize: 18 }} />
                  </Button>
                  <Button size="small" variant="outlined" sx={{ borderRadius: '10px', minWidth: 36, borderColor: 'divider' }}>
                    <LinkIcon sx={{ fontSize: 18 }} />
                  </Button>
                  <Box flexGrow={1} />
                  <Button startIcon={<BookmarkIcon />} size="small" variant="text">
                    Save
                  </Button>
                </Stack>
              </Stack>

              {/* Featured Image */}
              <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  sx={{ mb: 4, borderRadius: '16px', overflow: 'hidden', border: '1px solid', borderColor: 'divider', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                <Box sx={{ position: 'relative', height: 0, paddingTop: '56.25%' }}>
                  <Image
                      src={singlePost.image}
                      alt={singlePost.title}
                      fill
                      style={{ objectFit: 'cover' }}
                  />
                </Box>
              </MotionCard>

              {/* Article Content */}
              <Stack spacing={4} className="article-content">
                {singlePost.content ? (
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                    {singlePost.content}
                  </Typography>
                ) : (
                  tableOfContents.map((section) => (
                    <Box key={section.id} id={section.id}>
                      <Typography variant="h5" mb={1}>
                        {section.title}
                      </Typography>
                      <Typography variant="body1" mb={1}>
                        {section.title}
                      </Typography>
                    </Box>
                  ))
                )}
              </Stack>

              {/* Author Bio */}
              <MotionCard sx={{ p: 3, mt: 6, borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <Stack direction="row" spacing={2}>
                  <Avatar sx={{ width: 64, height: 64 }}>
                    <Image src={singlePost.author.avatar} alt={singlePost.author.name} fill style={{ objectFit: 'cover' }} />
                  </Avatar>
                  <Box flex={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Box>
                        <Typography fontWeight={600}>{singlePost.author.name}</Typography>
                        <Typography variant="caption">{singlePost.author.followers} followers</Typography>
                      </Box>
                      <Button size="small" variant="contained" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>
                        Follow
                      </Button>
                    </Stack>
                    <Typography variant="body2">{singlePost.author.bio}</Typography>
                  </Box>
                </Stack>
              </MotionCard>

              {/* Related Posts */}
              <Box mt={6}>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  Related Articles
                </Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  {relatedPosts.map((post) => (
                      <MotionCard
                          key={post.id}
                          sx={{ flex: 1, cursor: 'pointer', overflow: 'hidden' }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setCurrentPage('post')}
                      >
                        <Box sx={{ position: 'relative', height: 140 }}>
                          <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                        </Box>
                        <Box p={2}>
                          <Chip label={post.category} size="small" sx={{ mb: 1 }} />
                          <Typography fontWeight={500}>{post.title}</Typography>
                        </Box>
                      </MotionCard>
                  ))}
                </Stack>
              </Box>

              {/* Comments Section */}
              <Box mt={6}>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  Comments ({displayComments.length})
                </Typography>

                {/* Add Comment */}
                <MotionCard sx={{ p: 2.5, mb: 2, borderRadius: '14px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <TextField
                      fullWidth
                      placeholder="Share your thoughts..."
                      multiline
                      minRows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                  <Box textAlign="right" mt={1.5}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handlePostComment}
                      sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                      }}
                    >
                      Post Comment
                    </Button>
                  </Box>
                </MotionCard>

                {/* Comments List */}
                <Stack spacing={2}>
                  {displayComments.map((comment: { id: string; author: string; avatar: string; date: string; content: string; likes: number }) => (
                      <MotionCard key={comment.id} sx={{ p: 2 }}>
                        <Stack direction="row" spacing={2}>
                          <Avatar sx={{ width: 40, height: 40 }}>
                            <Image src={comment.avatar} alt={comment.author} fill style={{ objectFit: 'cover' }} />
                          </Avatar>
                          <Box flex={1}>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography fontWeight={500}>{comment.author}</Typography>
                              <Typography variant="caption">{comment.date}</Typography>
                            </Stack>
                            <Typography variant="body2">{comment.content}</Typography>
                            <Stack direction="row" spacing={1} mt={1}>
                              <Button size="small" variant="text" startIcon={<ThumbUpIcon />} onClick={handleLike}>
                                {comment.likes}
                              </Button>
                              <Button size="small" variant="text" startIcon={<CommentIcon />}>
                                Reply
                              </Button>
                            </Stack>
                          </Box>
                        </Stack>
                      </MotionCard>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* Sidebar - Table of Contents */}
            <Box flexShrink={0} width={256} display={{ xs: 'none', lg: 'block' }}>
              <MotionCard sx={{ p: 2.5, position: 'sticky', top: 80, borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <Typography fontWeight={700} mb={1.5} fontSize="0.95rem">
                  Table of Contents
                </Typography>
                <Stack spacing={1}>
                  {tableOfContents.map((item) => (
                      <Button
                          key={item.id}
                          fullWidth
                          variant={activeSection === item.id ? 'contained' : 'text'}
                          onClick={() => {
                            setActiveSection(item.id);
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                      >
                        {item.title}
                      </Button>
                  ))}
                </Stack>
              </MotionCard>
            </Box>
          </Stack>
        </Box>
      </Box>
  );
}
