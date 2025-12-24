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
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

import { relatedPosts, comments, tableOfContents } from '@/data/content';
import {useState} from "react";

interface SinglePostPageProps {
  setCurrentPage: (page: string) => void;
  postId?: string;
}

const MotionCard = motion(Card);

export default function SinglePostPage({ setCurrentPage, postId }: SinglePostPageProps) {
  const [activeSection, setActiveSection] = useState('introduction');

  const singlePost = {
    id: postId || '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    category: 'Technology',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      bio: 'Senior Software Engineer and Tech Writer. Passionate about web technologies and developer experience.',
      followers: '12.5K',
    },
    date: 'November 28, 2025',
    readTime: '8 min read',
    views: '3.2K',
    image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  };

  return (
      <Box sx={{ minHeight: '100vh', py: 6, px: 2 }}>
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
                >
                  Back to Articles
                </Button>

                <Chip label={singlePost.category} />

                <Typography variant="h3" fontWeight={700}>
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
                  <Button startIcon={<ShareIcon />} size="small" variant="outlined">
                    Share
                  </Button>
                  <Button size="small" variant="outlined">
                    <TwitterIcon />
                  </Button>
                  <Button size="small" variant="outlined">
                    <FacebookIcon />
                  </Button>
                  <Button size="small" variant="outlined">
                    <LinkedInIcon />
                  </Button>
                  <Button size="small" variant="outlined">
                    <LinkIcon />
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
                  sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}
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
                {/* Example Sections */}
                {tableOfContents.map((section) => (
                    <Box key={section.id} id={section.id}>
                      <Typography variant="h5" mb={1}>
                        {section.title}
                      </Typography>
                      <Typography variant="body1" mb={1}>
                        {section.title}
                      </Typography>
                    </Box>
                ))}
              </Stack>

              {/* Author Bio */}
              <MotionCard sx={{ p: 3, mt: 6 }}>
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
                      <Button size="small" variant="contained">
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
                  Comments ({comments.length})
                </Typography>

                {/* Add Comment */}
                <MotionCard sx={{ p: 2, mb: 2 }}>
                  <TextField
                      fullWidth
                      placeholder="Share your thoughts..."
                      multiline
                      minRows={3}
                  />
                  <Box textAlign="right" mt={1}>
                    <Button variant="contained" size="small">
                      Post Comment
                    </Button>
                  </Box>
                </MotionCard>

                {/* Comments List */}
                <Stack spacing={2}>
                  {comments.map((comment) => (
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
                              <Button size="small" variant="text" startIcon={<ThumbUpIcon />}>
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
              <MotionCard sx={{ p: 2, position: 'sticky', top: 24 }}>
                <Typography fontWeight={600} mb={1}>
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
