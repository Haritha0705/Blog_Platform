'use client';

import React from 'react';
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
} from '@mui/material';

import {
  TrendingUp,
  Visibility,
  Comment,
  Favorite,
  Description,
  Schedule,
  CalendarMonth,
} from '@mui/icons-material';

import { stats, recentPosts, notifications } from '@/data/content';

interface DashboardPageProps {
  setCurrentPage: (page: string) => void;
}

const MotionCard = motion(Card);

export function DashboardPage({ setCurrentPage }: DashboardPageProps) {
  return (
      <Box minHeight="100vh" bgcolor="grey.100">
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* ================= HEADER ================= */}
          <Box mb={4}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
              Dashboard
            </Typography>
            <Typography color="text.secondary">
              Welcome back! Here’s an overview of your content.
            </Typography>
          </Box>

          {/* ================= STATS ================= */}
          <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }}
              gap={3}
              mb={6}
          >
            {stats.map((stat) => (
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

          {/* ================= MAIN GRID ================= */}
          <Box display="grid" gridTemplateColumns={{ lg: '2fr 1fr' }} gap={4}>
            {/* -------- Recent Posts -------- */}
            <Box>
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Recent Posts
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setCurrentPage('my-posts')}
                >
                  View All
                </Button>
              </Stack>

              <Stack spacing={2}>
                {recentPosts.map((post) => (
                    <MotionCard
                        key={post.id}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between">
                            <Box>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography fontWeight="bold">
                                  {post.title}
                                </Typography>
                                <Chip
                                    size="small"
                                    label={post.status}
                                    color={
                                      post.status === 'published'
                                          ? 'success'
                                          : 'default'
                                    }
                                />
                              </Stack>
                              <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                  mt={0.5}
                              >
                                <CalendarMonth fontSize="small" />
                                <Typography variant="caption" color="text.secondary">
                                  {post.date}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>

                          {post.status === 'published' && (
                              <>
                                <Divider />
                                <Stack direction="row" spacing={3}>
                                  <StatIcon
                                      icon={<Visibility fontSize="small" />}
                                      value={post.comments}
                                  />
                                  <StatIcon
                                      icon={<Comment fontSize="small" />}
                                      value={post.comments}
                                  />
                                  <StatIcon
                                      icon={<Favorite fontSize="small" />}
                                      value={post.likes}
                                  />
                                </Stack>
                              </>
                          )}

                          {post.status === 'draft' && (
                              <>
                                <Divider />
                                <Button size="small" variant="outlined">
                                  Continue Editing
                                </Button>
                              </>
                          )}
                        </Stack>
                      </CardContent>
                    </MotionCard>
                ))}
              </Stack>
            </Box>

            {/* -------- SIDEBAR -------- */}
            <Stack spacing={3}>
              {/* Quick Actions */}
              <Card>
                <CardContent>
                  <Typography fontWeight="bold" mb={2}>
                    Quick Actions
                  </Typography>
                  <Stack spacing={1}>
                    <Button
                        fullWidth
                        startIcon={<Description />}
                        onClick={() => setCurrentPage('editor')}
                    >
                      Write New Post
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Schedule />}
                        onClick={() => setCurrentPage('my-posts')}
                    >
                      View Drafts
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<TrendingUp />}
                        onClick={() => setCurrentPage('settings')}
                    >
                      View Analytics
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography fontWeight="bold">
                      Recent Activity
                    </Typography>
                    <Chip size="small" label={notifications.length} />
                  </Stack>

                  <Stack spacing={2}>
                    {notifications.map((n) => (
                        <Box key={n.id}>
                          <Typography variant="body2" fontWeight="medium">
                            {n.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {n.post}
                          </Typography>
                          <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                          >
                            {n.time}
                          </Typography>
                          <Divider sx={{ mt: 1 }} />
                        </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Performance Tip */}
              <Card sx={{ bgcolor: 'primary.light' }}>
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    <TrendingUp color="primary" />
                    <Box>
                      <Typography fontWeight="bold">
                        Performance Tip
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Posts with featured images get 3x more engagement. Add one
                        to your drafts!
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Container>
      </Box>
  );
}

/* ============ SMALL COMPONENT ============ */
function StatIcon({
                    icon,
                    value,
                  }: {
  icon: React.ReactNode;
  value: number;
}) {
  return (
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography variant="body2">{value}</Typography>
      </Stack>
  );
}
