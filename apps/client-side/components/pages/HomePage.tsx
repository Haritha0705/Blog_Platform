'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Button,
  Chip,
  TextField,
  Stack,
  alpha,
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import {
  featuredPost,
  latestPosts as staticLatestPosts,
  popularPosts,
  categories,
} from '@/data/content';
import { useQuery } from '@apollo/client/react';
import { GET_POSTS } from '@/lib/graphql/operations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
}

interface PostItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function HomePage({ setCurrentPage, setSelectedPost }: HomePageProps) {
  const { data } = useQuery<AnyData>(GET_POSTS);

  const backendPosts: PostItem[] =
    data?.posts?.map(
      (p: { id: number; title: string; content: string; thumbnail?: string; author?: { name: string }; createdAt: string }) => ({
        id: String(p.id),
        title: p.title,
        excerpt: p.content.substring(0, 120) + '...',
        category: 'Technology',
        author: p.author?.name || 'Unknown',
        date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: `${Math.ceil(p.content.split(' ').length / 200)} min`,
        image: p.thumbnail || 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=600',
      }),
    ) || [];

  const latestPosts: PostItem[] = backendPosts.length > 0 ? backendPosts.slice(0, 6) : staticLatestPosts;

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <Box>
      {/* ─── HERO ─── */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #F5F3FF 0%, #EEF2FF 30%, #ffffff 70%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={8} alignItems="center">
            <MotionBox initial="hidden" animate="show" variants={stagger}>
              <Stack spacing={3}>
                <motion.div variants={fadeUp}>
                  <Chip
                    icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
                    label={`Featured · ${featuredPost.category}`}
                    sx={{
                      width: 'fit-content',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      color: 'primary.main',
                      border: '1px solid',
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                      borderRadius: '10px',
                      px: 0.5,
                    }}
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    lineHeight={1.15}
                    letterSpacing="-0.03em"
                    sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
                  >
                    {featuredPost.title}
                  </Typography>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Typography color="text.secondary" sx={{ maxWidth: 520, lineHeight: 1.7, fontSize: '1.05rem' }}>
                    {featuredPost.excerpt}
                  </Typography>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Stack direction="row" spacing={2.5} alignItems="center" flexWrap="wrap">
                    <Typography variant="body2" fontWeight={600} color="text.primary">{featuredPost.author}</Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                      <CalendarTodayIcon sx={{ fontSize: 15 }} />
                      <Typography variant="body2">{featuredPost.date}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                      <AccessTimeIcon sx={{ fontSize: 15 }} />
                      <Typography variant="body2">{featuredPost.readTime}</Typography>
                    </Stack>
                  </Stack>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      width: 'fit-content',
                      px: 4,
                      py: 1.5,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
                        background: 'linear-gradient(135deg, #5558E8 0%, #7C4FE0 100%)',
                      },
                    }}
                    onClick={() => handlePostClick(featuredPost.id)}
                  >
                    Read Article
                  </Button>
                </motion.div>
              </Stack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
                  '&:hover img': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  priority
                />
              </Box>
            </MotionBox>
          </Box>
        </Container>
      </Box>

      {/* ─── LATEST POSTS ─── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={5}>
          <Box>
            <Typography
              variant="overline"
              fontWeight={700}
              letterSpacing="0.08em"
              color="primary.main"
              sx={{ fontSize: '0.7rem' }}
            >
              Latest
            </Typography>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em">
              Fresh Articles
            </Typography>
          </Box>
          <Button
            variant="text"
            onClick={() => setCurrentPage('blog')}
            endIcon={<ArrowForwardIcon />}
            sx={{ textTransform: 'none', fontWeight: 600, color: 'primary.main', '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06) } }}
          >
            View All
          </Button>
        </Stack>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={3.5}>
          {latestPosts.map((post, index) => (
            <MotionCard
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <CardActionArea onClick={() => handlePostClick(post.id)} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    sx={{
                      mb: 2,
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      color: 'primary.main',
                      borderRadius: '8px',
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{
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
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.6,
                    }}
                  >
                    {post.excerpt}
                  </Typography>
                  <Box flex={1} />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      pt: 2,
                      mt: 1,
                      borderTop: '1px solid',
                      borderColor: (theme) => alpha(theme.palette.divider, 0.6),
                    }}
                  >
                    <Typography variant="caption" fontWeight={600} color="text.primary">{post.author}</Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                      <AccessTimeIcon sx={{ fontSize: 13 }} />
                      <Typography variant="caption">{post.readTime}</Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </MotionCard>
          ))}
        </Box>
      </Container>

      {/* ─── POPULAR & CATEGORIES ─── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8FAFC' }}>
        <Container maxWidth="lg">
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={6}>
            <Box>
              <Stack direction="row" spacing={1.5} mb={4} alignItems="center">
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUpIcon color="primary" fontSize="small" />
                </Box>
                <Typography variant="h5" fontWeight={800} letterSpacing="-0.01em">Popular This Week</Typography>
              </Stack>
              <Stack spacing={2}>
                {popularPosts.map((post, i) => (
                  <MotionCard
                    key={post.id}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handlePostClick(post.id)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '14px',
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 16px rgba(99,102,241,0.08)',
                      },
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <CardContent sx={{ py: 2.5, px: 3 }}>
                      <Stack direction="row" spacing={2.5} alignItems="center">
                        <Typography
                          sx={{
                            fontSize: '2rem',
                            fontWeight: 900,
                            color: (theme) => alpha(theme.palette.primary.main, 0.15),
                            minWidth: 48,
                            fontFamily: '"Playfair Display", serif',
                          }}
                        >
                          {(i + 1).toString().padStart(2, '0')}
                        </Typography>
                        <Box>
                          <Typography fontWeight={600} lineHeight={1.4}>{post.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{post.views} views · {post.readTime}</Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </MotionCard>
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="h5" fontWeight={800} letterSpacing="-0.01em" mb={4}>Browse by Category</Typography>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                {categories.map((cat, index) => (
                  <MotionCard
                    key={cat.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.06)' }}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      borderRadius: '14px',
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': { borderColor: 'primary.main' },
                    }}
                    onClick={() => setCurrentPage('blog')}
                  >
                    <Typography fontWeight={700} fontSize="0.95rem">{cat.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{cat.count} articles</Typography>
                  </MotionCard>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ─── NEWSLETTER ─── */}
      <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{
            p: { xs: 4, md: 6 },
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)',
            color: '#fff',
            borderRadius: '20px',
            boxShadow: '0 25px 50px rgba(99, 102, 241, 0.25)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            },
          }}
        >
          <Typography variant="h4" fontWeight={800} mb={1.5} letterSpacing="-0.02em">Stay Updated</Typography>
          <Typography mb={4} sx={{ opacity: 0.85, lineHeight: 1.6, maxWidth: 380, mx: 'auto' }}>
            Get the latest articles and insights delivered straight to your inbox. No spam, ever.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="filled"
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.95)',
                borderRadius: '12px',
                '& .MuiFilledInput-root': {
                  borderRadius: '12px',
                  '&:before, &:after': { display: 'none' },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                px: 4,
                py: 1.2,
                borderRadius: '12px',
                bgcolor: '#0F172A',
                color: '#fff',
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: '#1E293B' },
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              }}
            >
              Subscribe
            </Button>
          </Stack>
        </MotionCard>
      </Container>
    </Box>
  );
}
