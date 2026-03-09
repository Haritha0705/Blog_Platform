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
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';

import {
  CalendarTodayOutlined as CalendarIcon,
  AccessTimeOutlined as ClockIcon,
  ShareOutlined as ShareIcon,
  BookmarkBorderOutlined as BookmarkIcon,
  BookmarkOutlined as BookmarkFilledIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteFilledIcon,
  Comment as CommentIcon,
  ChevronLeft as ChevronLeftIcon,
  Reply as ReplyIcon,
  DeleteOutline as DeleteIcon,
} from '@mui/icons-material';

import { relatedPosts, comments as staticComments, tableOfContents } from '@/data/content';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_POST,
  GET_COMMENTS_BY_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
  TOGGLE_LIKE,
  IS_LIKED,
  IS_BOOKMARKED,
  TOGGLE_BOOKMARK,
  TOGGLE_FOLLOW,
  IS_FOLLOWING,
} from '@/lib/graphql/operations';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface SinglePostPageProps {
  setCurrentPage: (page: string) => void;
  postId?: string;
  setSelectedAuthor?: (authorId: number) => void;
}

const MotionCard = motion(Card);

// ======================== COMMENT COMPONENT ========================
function CommentItem({ comment, postId, userId, onReply, onDelete, depth = 0 }: { comment: AnyData; postId: number; userId?: number; onReply: (parentId: number, content: string) => Promise<void>; onDelete?: (commentId: number) => Promise<void>; depth?: number }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return;
    await onReply(comment.id, replyContent);
    setReplyContent('');
    setShowReplyBox(false);
  };

  const authorName = comment.author?.name || 'Unknown';
  const authorAvatar = comment.author?.avatar || '';
  const date = new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const replies = comment.replies || [];

  return (
    <Box sx={{ ml: depth > 0 ? 4 : 0 }}>
      <Box sx={{ p: 2, borderRadius: '12px', bgcolor: depth > 0 ? (t: AnyData) => alpha(t.palette.action.hover, 0.03) : 'transparent' }}>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ width: depth > 0 ? 32 : 40, height: depth > 0 ? 32 : 40, fontSize: depth > 0 ? 14 : 16 }}>
            {authorAvatar ? <Image src={authorAvatar} alt={authorName} fill style={{ objectFit: 'cover' }} /> : authorName.charAt(0).toUpperCase()}
          </Avatar>
          <Box flex={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={600} fontSize="0.875rem">{authorName}</Typography>
              <Typography variant="caption" color="text.disabled">{date}</Typography>
            </Stack>
            <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6 }}>{comment.content}</Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              {userId && depth < 2 && (
                <Button size="small" variant="text" startIcon={<ReplyIcon sx={{ fontSize: 14 }} />} onClick={() => setShowReplyBox(!showReplyBox)} sx={{ mt: 0.5, textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', color: 'text.secondary' }}>
                  Reply
                </Button>
              )}
              {userId && comment.authorId === userId && onDelete && (
                <Button size="small" variant="text" startIcon={<DeleteIcon sx={{ fontSize: 14 }} />} onClick={() => onDelete(comment.id)} sx={{ mt: 0.5, textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', color: 'error.main', '&:hover': { bgcolor: 'rgba(239,68,68,0.06)' } }}>
                  Delete
                </Button>
              )}
            </Stack>
            {showReplyBox && (
              <Box sx={{ mt: 1.5 }}>
                <TextField fullWidth size="small" placeholder={`Reply to ${authorName}...`} value={replyContent} onChange={(e) => setReplyContent(e.target.value)} multiline minRows={2} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '0.875rem' } }} />
                <Stack direction="row" spacing={1} mt={1} justifyContent="flex-end">
                  <Button size="small" onClick={() => setShowReplyBox(false)} sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}>Cancel</Button>
                  <Button size="small" variant="contained" onClick={handleSubmitReply} disabled={!replyContent.trim()} sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>Reply</Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
      {replies.length > 0 && (
        <Stack spacing={0}>
          {replies.map((reply: AnyData) => (
            <CommentItem key={reply.id} comment={reply} postId={postId} userId={userId} onReply={onReply} onDelete={onDelete} depth={depth + 1} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

// ======================== MAIN PAGE ========================
export default function SinglePostPage({ setCurrentPage, postId, setSelectedAuthor }: SinglePostPageProps) {
  const [activeSection, setActiveSection] = useState('introduction');
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const postIdNum = postId ? parseInt(postId) : 0;
  const isRealPost = postIdNum > 0;

  const { data: postData, loading: postLoading, refetch: refetchPost } = useQuery<AnyData>(GET_POST, { variables: { id: postIdNum }, skip: !isRealPost });
  const { data: commentsData, refetch: refetchComments } = useQuery<AnyData>(GET_COMMENTS_BY_POST, { variables: { postId: postIdNum }, skip: !isRealPost });
  const { data: likedData, refetch: refetchLiked } = useQuery<AnyData>(IS_LIKED, { variables: { userId: user?.id || 0, postId: postIdNum }, skip: !isRealPost || !user });
  const { data: bookmarkedData, refetch: refetchBookmarked } = useQuery<AnyData>(IS_BOOKMARKED, { variables: { userId: user?.id || 0, postId: postIdNum }, skip: !isRealPost || !user });

  const authorId = postData?.post?.author?.id;
  const { data: followingData, refetch: refetchFollowing } = useQuery<AnyData>(IS_FOLLOWING, { variables: { followerId: user?.id || 0, followingId: authorId || 0 }, skip: !user || !authorId || authorId === user?.id });

  const [createComment] = useMutation<AnyData>(CREATE_COMMENT);
  const [deleteCommentMutation] = useMutation<AnyData>(DELETE_COMMENT);
  const [toggleLike] = useMutation<AnyData>(TOGGLE_LIKE);
  const [toggleBookmark] = useMutation<AnyData>(TOGGLE_BOOKMARK);
  const [toggleFollow] = useMutation<AnyData>(TOGGLE_FOLLOW);

  const isLiked = likedData?.isLiked || false;
  const isBookmarked = bookmarkedData?.isBookmarked || false;
  const isFollowingAuthor = followingData?.isFollowing || false;

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    if (!user) { toast.error('Please login to comment'); return; }
    try { await createComment({ variables: { createCommentInput: { content: newComment, postId: postIdNum, authorId: user.id } } }); setNewComment(''); refetchComments(); refetchPost(); toast.success('Comment posted!'); } catch { toast.error('Failed to post comment'); }
  };

  const handleReply = async (parentId: number, content: string) => {
    if (!user) { toast.error('Please login to reply'); return; }
    try { await createComment({ variables: { createCommentInput: { content, postId: postIdNum, authorId: user.id, parentId } } }); refetchComments(); refetchPost(); toast.success('Reply posted!'); } catch { toast.error('Failed to post reply'); }
  };

  const handleLike = async () => {
    if (!user) { toast.error('Please login to like'); return; }
    try { await toggleLike({ variables: { createLikeInput: { userId: user.id, postId: postIdNum } } }); refetchLiked(); refetchPost(); } catch { toast.error('Failed to toggle like'); }
  };

  const handleBookmark = async () => {
    if (!user) { toast.error('Please login to save'); return; }
    try { await toggleBookmark({ variables: { input: { userId: user.id, postId: postIdNum } } }); refetchBookmarked(); toast.success(isBookmarked ? 'Removed from saved' : 'Saved!'); } catch { toast.error('Failed to toggle bookmark'); }
  };

  const handleFollow = async () => {
    if (!user || !authorId) return;
    try { await toggleFollow({ variables: { input: { followerId: user.id, followingId: authorId } } }); refetchFollowing(); refetchPost(); toast.success(isFollowingAuthor ? 'Unfollowed' : 'Following!'); } catch { toast.error('Failed to toggle follow'); }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!user) return;
    try { await deleteCommentMutation({ variables: { id: commentId } }); refetchComments(); refetchPost(); toast.success('Comment deleted'); } catch { toast.error('Failed to delete comment'); }
  };

  const realPost = postData?.post;
  const realComments = commentsData?.commentsByPost || [];

  const singlePost = realPost ? {
    id: String(realPost.id), title: realPost.title, category: realPost.tags?.[0]?.name || 'Technology', tags: realPost.tags || [],
    author: { id: realPost.author?.id, name: realPost.author?.name || 'Unknown', avatar: realPost.author?.avatar || '', bio: realPost.author?.bio || '', followersCount: realPost.author?.followersCount || 0, postsCount: realPost.author?.postsCount || 0 },
    date: new Date(realPost.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: `${Math.ceil((realPost.content?.split(' ').length || 0) / 200)} min read`,
    views: realPost.views || 0, likesCount: realPost.likesCount || 0, commentsCount: realPost.commentsCount || 0,
    image: realPost.thumbnail || 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=1080', content: realPost.content || '',
  } : {
    id: postId || '1', title: 'The Future of Web Development: Trends to Watch in 2025', category: 'Technology', tags: [],
    author: { id: 0, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100', bio: 'Senior Software Engineer.', followersCount: 12500, postsCount: 42 },
    date: 'November 28, 2025', readTime: '8 min read', views: 3200, likesCount: 248, commentsCount: 42,
    image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=1080', content: '',
  };

  const displayComments = realComments.length > 0 ? realComments : staticComments;

  if (postLoading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;

  return (
    <Box sx={{ minHeight: '100vh', py: 6, px: 2, background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6}>
          <Box flex={1} maxWidth={{ lg: '720px' }}>
            <Stack spacing={2} mb={4}>
              <Button startIcon={<ChevronLeftIcon />} onClick={() => setCurrentPage('blog')} variant="text" sx={{ textTransform: 'none', fontWeight: 500, borderRadius: '10px', alignSelf: 'flex-start' }}>Back to Articles</Button>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {(singlePost.tags.length > 0 ? singlePost.tags : [{ id: 0, name: singlePost.category }]).map((tag: { id: number; name: string }) => (
                  <Chip key={tag.id} label={tag.name} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem', bgcolor: (t) => alpha(t.palette.primary.main, 0.08), color: 'primary.main', borderRadius: '8px' }} />
                ))}
              </Stack>
              <Typography variant="h3" fontWeight={800} letterSpacing="-0.02em" lineHeight={1.2}>{singlePost.title}</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 48, height: 48 }}>{singlePost.author.avatar ? <Image src={singlePost.author.avatar} alt={singlePost.author.name} fill style={{ objectFit: 'cover' }} /> : singlePost.author.name.charAt(0)}</Avatar>
                <Box>
                  <Typography fontWeight={600} fontSize="0.9rem">{singlePost.author.name}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarIcon sx={{ fontSize: 14, color: 'text.disabled' }} /><Typography variant="caption" color="text.secondary">{singlePost.date}</Typography>
                    <Typography variant="caption" color="text.disabled">·</Typography>
                    <ClockIcon sx={{ fontSize: 14, color: 'text.disabled' }} /><Typography variant="caption" color="text.secondary">{singlePost.readTime}</Typography>
                  </Stack>
                </Box>
              </Stack>
              {/* Action Bar */}
              <Stack direction="row" spacing={1} alignItems="center" py={1} sx={{ borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
                <IconButton onClick={handleLike} sx={{ color: isLiked ? '#EF4444' : 'text.secondary' }}>{isLiked ? <FavoriteFilledIcon sx={{ fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}</IconButton>
                <Typography variant="body2" fontWeight={600} sx={{ mr: 1 }}>{singlePost.likesCount}</Typography>
                <IconButton sx={{ color: 'text.secondary' }}><CommentIcon sx={{ fontSize: 20 }} /></IconButton>
                <Typography variant="body2" fontWeight={600} sx={{ mr: 1 }}>{singlePost.commentsCount}</Typography>
                <Box flexGrow={1} />
                <IconButton onClick={handleBookmark} sx={{ color: isBookmarked ? 'primary.main' : 'text.secondary' }}>{isBookmarked ? <BookmarkFilledIcon sx={{ fontSize: 20 }} /> : <BookmarkIcon sx={{ fontSize: 20 }} />}</IconButton>
                <IconButton sx={{ color: 'text.secondary' }}><ShareIcon sx={{ fontSize: 20 }} /></IconButton>
              </Stack>
            </Stack>

            <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ mb: 4, borderRadius: '16px', overflow: 'hidden', border: '1px solid', borderColor: 'divider', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <Box sx={{ position: 'relative', height: 0, paddingTop: '56.25%' }}><Image src={singlePost.image} alt={singlePost.title} fill style={{ objectFit: 'cover' }} /></Box>
            </MotionCard>

            <Box sx={{ '& p': { lineHeight: 1.8, fontSize: '1.05rem', mb: 2 } }}>
              {singlePost.content ? <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '1.05rem' }}>{singlePost.content}</Typography> : tableOfContents.map((s) => <Box key={s.id} id={s.id}><Typography variant="h5" mb={1}>{s.title}</Typography><Typography variant="body1" mb={1}>{s.title}</Typography></Box>)}
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Author Bio */}
            <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <Stack direction="row" spacing={2.5}>
                <Avatar sx={{ width: 64, height: 64 }}>{singlePost.author.avatar ? <Image src={singlePost.author.avatar} alt={singlePost.author.name} fill style={{ objectFit: 'cover' }} /> : singlePost.author.name.charAt(0)}</Avatar>
                <Box flex={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography
                        fontWeight={700}
                        fontSize="1rem"
                        sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}
                        onClick={() => singlePost.author.id && setSelectedAuthor?.(singlePost.author.id)}
                      >
                        {singlePost.author.name}
                      </Typography>
                      <Stack direction="row" spacing={2} mt={0.5}>
                        <Typography variant="caption" color="text.secondary"><strong>{singlePost.author.followersCount?.toLocaleString()}</strong> followers</Typography>
                        <Typography variant="caption" color="text.secondary"><strong>{singlePost.author.postsCount}</strong> posts</Typography>
                      </Stack>
                    </Box>
                    {user && singlePost.author.id !== user.id && (
                      <Button size="small" variant={isFollowingAuthor ? 'outlined' : 'contained'} onClick={handleFollow} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, ...(isFollowingAuthor ? { borderColor: 'divider' } : { background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }) }}>
                        {isFollowingAuthor ? 'Following' : 'Follow'}
                      </Button>
                    )}
                  </Stack>
                  <Typography variant="body2" color="text.secondary" mt={1} lineHeight={1.6}>{singlePost.author.bio}</Typography>
                </Box>
              </Stack>
            </Card>

            {/* Related Posts */}
            <Box mt={6}>
              <Typography variant="h5" fontWeight={700} mb={2.5}>Related Articles</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                {relatedPosts.map((post) => (
                  <MotionCard key={post.id} sx={{ flex: 1, cursor: 'pointer', overflow: 'hidden', borderRadius: '14px', border: '1px solid', borderColor: 'divider', boxShadow: 'none', '&:hover': { borderColor: 'primary.main' }, transition: 'all 0.2s' }} whileHover={{ y: -4 }} onClick={() => setCurrentPage('post')}>
                    <Box sx={{ position: 'relative', height: 140 }}><Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} /></Box>
                    <Box p={2}><Chip label={post.category} size="small" sx={{ mb: 1, fontWeight: 600, fontSize: '0.65rem', bgcolor: (t) => alpha(t.palette.primary.main, 0.08), color: 'primary.main', borderRadius: '6px' }} /><Typography fontWeight={600} fontSize="0.9rem" lineHeight={1.4}>{post.title}</Typography></Box>
                  </MotionCard>
                ))}
              </Stack>
            </Box>

            {/* Comments */}
            <Box mt={6}>
              <Typography variant="h5" fontWeight={700} mb={2.5}>Comments ({singlePost.commentsCount})</Typography>
              {user ? (
                <Card sx={{ p: 2.5, mb: 3, borderRadius: '14px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ width: 36, height: 36 }}>{user.avatar ? <Image src={user.avatar} alt={user.name} fill style={{ objectFit: 'cover' }} /> : user.name.charAt(0)}</Avatar>
                    <Box flex={1}>
                      <TextField fullWidth placeholder="Share your thoughts..." multiline minRows={2} value={newComment} onChange={(e) => setNewComment(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '0.9rem' } }} />
                      <Box textAlign="right" mt={1}><Button variant="contained" size="small" onClick={handlePostComment} disabled={!newComment.trim()} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>Post Comment</Button></Box>
                    </Box>
                  </Stack>
                </Card>
              ) : (
                <Card sx={{ p: 3, mb: 3, textAlign: 'center', borderRadius: '14px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <Typography color="text.secondary" mb={1.5}>Sign in to join the discussion</Typography>
                  <Button variant="contained" onClick={() => setCurrentPage('login')} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>Sign In</Button>
                </Card>
              )}
              <Stack spacing={1}>
                {displayComments.map((c: AnyData) => <CommentItem key={c.id} comment={c} postId={postIdNum} userId={user?.id} onReply={handleReply} onDelete={handleDeleteComment} />)}
                {displayComments.length === 0 && <Box textAlign="center" py={4}><CommentIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} /><Typography color="text.secondary">No comments yet. Be the first!</Typography></Box>}
              </Stack>
            </Box>
          </Box>

          {/* Sidebar */}
          <Box flexShrink={0} width={256} display={{ xs: 'none', lg: 'block' }}>
            <Card sx={{ p: 2.5, position: 'sticky', top: 80, borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <Typography fontWeight={700} mb={1.5} fontSize="0.95rem">Table of Contents</Typography>
              <Stack spacing={0.5}>
                {tableOfContents.map((item) => (
                  <Button key={item.id} fullWidth size="small" variant={activeSection === item.id ? 'contained' : 'text'} onClick={() => { setActiveSection(item.id); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }} sx={{ justifyContent: 'flex-start', textTransform: 'none', fontWeight: activeSection === item.id ? 600 : 400, fontSize: '0.8rem', borderRadius: '8px', ...(activeSection === item.id ? { background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' } : {}) }}>
                    {item.title}
                  </Button>
                ))}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Views</Typography><Typography variant="caption" fontWeight={600}>{singlePost.views.toLocaleString()}</Typography></Stack>
                <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Likes</Typography><Typography variant="caption" fontWeight={600}>{singlePost.likesCount}</Typography></Stack>
                <Stack direction="row" justifyContent="space-between"><Typography variant="caption" color="text.secondary">Comments</Typography><Typography variant="caption" fontWeight={600}>{singlePost.commentsCount}</Typography></Stack>
              </Stack>
            </Card>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
