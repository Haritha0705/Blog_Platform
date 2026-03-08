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
                  bgcolor: 'primary.light',
                  color: 'text.primary',
                  px: 0.5,
                  borderRadius: 0.5,
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
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 6, px: 2 }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {/* Header */}
          <Box mb={6}>
            <Typography variant="h4" fontWeight={700} mb={3}>
              Search Results
            </Typography>

            <Box position="relative">
              <SearchIcon
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 14,
                    transform: 'translateY(-50%)',
                    color: 'text.secondary',
                  }}
              />
              <TextField
                  fullWidth
                  autoFocus
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
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
            <Select defaultValue="relevance" sx={{ width: 180 }}>
              <MenuItem value="relevance">Most Relevant</MenuItem>
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="popular">Most Popular</MenuItem>
            </Select>

            <Select defaultValue="all" sx={{ width: 180 }}>
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="development">Development</MenuItem>
              <MenuItem value="design">Design</MenuItem>
            </Select>

            <Button
                variant="outlined"
                startIcon={<FilterAltOutlinedIcon />}
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
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        sx={{ cursor: 'pointer', overflow: 'hidden' }}
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
                              borderRadius: 2,
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
                              sx={{ mb: 1 }}
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
              <Card sx={{ p: 6, textAlign: 'center' }}>
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
                  >
                    Browse Articles
                  </Button>
                  <Button
                      variant="contained"
                      onClick={() => setSearchQuery('')}
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
                <Button variant="outlined" disabled>
                  Previous
                </Button>
                <Button variant="contained">1</Button>
                <Button variant="outlined">2</Button>
                <Button variant="outlined">Next</Button>
              </Stack>
          )}

          {/* Search Tips */}
          {results.length === 0 && searchQuery && (
              <Card sx={{ p: 4, mt: 4 }}>
                <Typography fontWeight={600} mb={2}>
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
