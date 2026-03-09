'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Chip,
  Select,
  MenuItem,
  Stack,
  Divider,
  alpha,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import { results as staticResults } from '@/data/content';
import {useState} from "react";
import { useQuery } from '@apollo/client/react';
import { SEARCH_POSTS } from '@/lib/graphql/operations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface SearchResultsPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
  searchQuery?: string;
}

const MotionCard = motion(Card);

export default function SearchResultsPage({
                                            setCurrentPage,
                                            setSelectedPost,
                                            searchQuery: initialQuery = '',
                                          }: SearchResultsPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data } = useQuery<AnyData>(SEARCH_POSTS, {
    variables: { query: searchQuery },
    skip: !searchQuery.trim(),
  });

  const backendResults = data?.searchPosts?.map((p: { id: number; title: string; content: string; thumbnail?: string; author?: { name: string }; createdAt: string }) => ({
    id: String(p.id),
    title: p.title,
    excerpt: p.content.substring(0, 150) + '...',
    category: 'Technology',
    author: p.author?.name || 'Unknown',
    date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: `${Math.ceil(p.content.split(' ').length / 200)} min`,
    image: p.thumbnail || 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=400',
  })) || [];

  const results = backendResults.length > 0 ? backendResults : staticResults;

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <Box
                key={index}
                component="mark"
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                  color: 'primary.main',
                  px: 0.5,
                  borderRadius: '4px',
                  fontWeight: 600,
                }}
            >
              {part}
            </Box>
        ) : (
            part
        )
    );
  };

  return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)', py: { xs: 4, md: 6 }, px: 2 }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {/* Header */}
          <Box mb={6}>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em" mb={3}>
              Search Results
            </Typography>

            <Box position="relative">
              <SearchIcon
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 14,
                    transform: 'translateY(-50%)',
                    color: 'text.disabled',
                  }}
              />
              <TextField
                  fullWidth
                  autoFocus
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '14px',
                      bgcolor: 'white',
                    },
                    '& input': {
                      pl: 6,
                      height: 56,
                      fontSize: 18,
                    },
                  }}
              />
            </Box>
          </Box>

          {/* Filters */}
          <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              mb={4}
          >
            <Select defaultValue="relevance" sx={{ width: 180, borderRadius: '12px', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '12px' } }}>
              <MenuItem value="relevance">Most Relevant</MenuItem>
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="popular">Most Popular</MenuItem>
            </Select>

            <Select defaultValue="all" sx={{ width: 180, borderRadius: '12px', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '12px' } }}>
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="development">Development</MenuItem>
              <MenuItem value="design">Design</MenuItem>
            </Select>

            <Button
                variant="outlined"
                startIcon={<FilterAltOutlinedIcon />}
                sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 600, borderColor: 'divider', color: 'text.secondary' }}
            >
              More Filters
            </Button>
          </Stack>

          {/* Results Count */}
          {searchQuery && (
              <Typography color="text.secondary" mb={3}>
                Found{' '}
                <strong>{results.length}</strong> results for{' '}
                <strong>{searchQuery}</strong>
              </Typography>
          )}

          {/* Results */}
          {results.length > 0 ? (
              <Stack spacing={3} mb={6}>
                {results.map((result: { id: string; title: string; excerpt: string; category: string; author: string; date: string; readTime: string; image: string }) => (
                    <MotionCard
                        key={result.id}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
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
                        onClick={() => handlePostClick(result.id)}
                    >
                      <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={3}
                          p={3}
                      >
                        {/* Image */}
                        <Box
                            sx={{
                              width: { xs: '100%', sm: 200 },
                              aspectRatio: '16 / 9',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              position: 'relative',
                              flexShrink: 0,
                            }}
                        >
                          <Image
                              src={result.image}
                              alt={result.title}
                              fill
                              style={{ objectFit: 'cover' }}
                          />
                        </Box>

                        {/* Content */}
                        <Box flex={1}>
                          <Chip
                              label={result.category}
                              size="small"
                              sx={{
                                mb: 1,
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                color: 'primary.main',
                                borderRadius: '8px',
                              }}
                          />

                          <Typography
                              variant="h6"
                              fontWeight={600}
                              mb={1}
                          >
                            {highlightText(result.title, searchQuery)}
                          </Typography>

                          <Typography
                              color="text.secondary"
                              mb={2}
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                          >
                            {highlightText(result.excerpt, searchQuery)}
                          </Typography>

                          <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                              color="text.secondary"
                              fontSize={14}
                          >
                            <span>{result.author}</span>
                            <Divider orientation="vertical" flexItem />
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <CalendarMonthOutlinedIcon fontSize="small" />
                              <span>{result.date}</span>
                            </Stack>
                            <Divider orientation="vertical" flexItem />
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <AccessTimeOutlinedIcon fontSize="small" />
                              <span>{result.readTime}</span>
                            </Stack>
                          </Stack>
                        </Box>
                      </Stack>
                    </MotionCard>
                ))}
              </Stack>
          ) : (
              /* Empty State */
              <Card sx={{ p: 6, textAlign: 'center', borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <DescriptionOutlinedIcon
                    sx={{ fontSize: 56, color: 'text.secondary', mb: 2 }}
                />
                <Typography variant="h6" fontWeight={600} mb={1}>
                  No results found
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  We couldn&apos;t find any articles matching your search.
                </Typography>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="center"
                >
                  <Button
                      variant="outlined"
                      onClick={() => setCurrentPage('blog')}
                      sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                  >
                    Browse Articles
                  </Button>
                  <Button
                      variant="contained"
                      onClick={() => setSearchQuery('')}
                      sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                      }}
                  >
                    Clear Search
                  </Button>
                </Stack>
              </Card>
          )}

          {/* Pagination */}
          {results.length > 0 && (
              <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  mt={4}
              >
                <Button variant="outlined" disabled sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}>
                  Previous
                </Button>
                <Button variant="contained" sx={{ borderRadius: '10px', minWidth: 40, background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>1</Button>
                <Button variant="outlined" sx={{ borderRadius: '10px', minWidth: 40, borderColor: 'divider' }}>2</Button>
                <Button variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, borderColor: 'divider' }}>Next</Button>
              </Stack>
          )}

          {/* Search Tips */}
          {results.length === 0 && searchQuery && (
              <Card sx={{ p: 4, mt: 4, borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <Typography fontWeight={700} mb={2} fontSize="0.95rem">
                    Search Tips
                  </Typography>
                <Typography color="text.secondary">
                  • Check spelling<br />
                  • Try broader keywords<br />
                  • Use fewer keywords<br />
                  • Try synonyms
                </Typography>
              </Card>
          )}
        </Box>
      </Box>
  );
}
