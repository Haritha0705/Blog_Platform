'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Avatar,
  Divider,
  Switch,
  Stack,
  Chip,
} from '@mui/material';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicOutlinedIcon from '@mui/icons-material/Public';

interface SettingsPageProps {
  setCurrentPage: (page: string) => void;
}

const MotionCard = motion(Card);

export default function SettingsPage({ setCurrentPage }: SettingsPageProps) {
  const [tab, setTab] = React.useState(0);

  return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 6, px: 2 }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
          {/* Header */}
          <Box mb={4}>
            <Button
                startIcon={<ArrowBackOutlinedIcon />}
                onClick={() => setCurrentPage('dashboard')}
                sx={{ mb: 2 }}
            >
              Back to Dashboard
            </Button>

            <Typography variant="h4" fontWeight={700}>
              Settings
            </Typography>
            <Typography color="text.secondary">
              Manage your account settings and preferences
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{ mb: 4 }}
          >
            <Tab label="Profile" />
            <Tab label="Account" />
            <Tab label="Notifications" />
            <Tab label="Security" />
          </Tabs>

          {/* ================= PROFILE ================= */}
          {tab === 0 && (
              <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  sx={{ p: 4 }}
              >
                <Stack spacing={4}>
                  {/* Avatar */}
                  <Box>
                    <Typography fontWeight={600} mb={2}>
                      Profile Picture
                    </Typography>

                    <Stack direction="row" spacing={3} alignItems="center">
                      <Avatar sx={{ width: 96, height: 96 }}>
                        <Image
                            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200"
                            alt="Profile"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                      </Avatar>

                      <Stack spacing={1}>
                        <Button
                            variant="outlined"
                            startIcon={<PhotoCameraOutlinedIcon />}
                            size="small"
                        >
                          Change Avatar
                        </Button>
                        <Typography variant="caption" color="text.secondary">
                          JPG, PNG or GIF. Max 2MB.
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>

                  <Divider />

                  {/* Name */}
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField label="First Name" defaultValue="Sarah" fullWidth />
                    <TextField label="Last Name" defaultValue="Johnson" fullWidth />
                  </Stack>

                  {/* Bio */}
                  <Box>
                    <TextField
                        label="Bio"
                        multiline
                        rows={3}
                        fullWidth
                        defaultValue="Senior Software Engineer and Tech Writer. Passionate about web technologies and developer experience."
                        inputProps={{ maxLength: 200 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Max 200 characters
                    </Typography>
                  </Box>

                  {/* Social Links */}
                  <Box>
                    <Typography fontWeight={600} mb={2}>
                      Social Links
                    </Typography>

                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <LanguageOutlinedIcon color="action" />
                        <TextField placeholder="https://yourwebsite.com" fullWidth />
                      </Stack>

                      <Stack direction="row" spacing={2} alignItems="center">
                        <TwitterIcon color="action" />
                        <TextField placeholder="https://twitter.com/username" fullWidth />
                      </Stack>

                      <Stack direction="row" spacing={2} alignItems="center">
                        <GitHubIcon color="action" />
                        <TextField placeholder="https://github.com/username" fullWidth />
                      </Stack>

                      <Stack direction="row" spacing={2} alignItems="center">
                        <LinkedInIcon color="action" />
                        <TextField placeholder="https://linkedin.com/in/username" fullWidth />
                      </Stack>
                    </Stack>
                  </Box>

                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained">Save Changes</Button>
                  </Stack>
                </Stack>
              </MotionCard>
          )}

          {/* ================= ACCOUNT ================= */}
          {tab === 1 && (
              <Stack spacing={4}>
                <MotionCard sx={{ p: 4 }}>
                  <Typography fontWeight={600} mb={2}>
                    Account Information
                  </Typography>

                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2}>
                      <TextField
                          label="Email"
                          defaultValue="sarah.johnson@example.com"
                          fullWidth
                      />
                      <Button variant="outlined">Change</Button>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                      <TextField label="Username" defaultValue="@sarahjohnson" fullWidth />
                      <Button variant="outlined">Change</Button>
                    </Stack>
                  </Stack>
                </MotionCard>

                <MotionCard sx={{ p: 4 }}>
                  <Typography fontWeight={600} mb={2}>
                    Password
                  </Typography>

                  <Stack spacing={2}>
                    <TextField label="Current Password" type="password" />
                    <TextField label="New Password" type="password" />
                    <TextField label="Confirm New Password" type="password" />
                    <Button variant="contained">Update Password</Button>
                  </Stack>
                </MotionCard>

                <MotionCard sx={{ p: 4, border: '1px solid', borderColor: 'error.light' }}>
                  <Typography fontWeight={600} color="error" mb={1}>
                    Danger Zone
                  </Typography>
                  <Typography color="text.secondary" mb={2}>
                    Once you delete your account, there is no going back.
                  </Typography>
                  <Button color="error" variant="contained">
                    Delete Account
                  </Button>
                </MotionCard>
              </Stack>
          )}

          {/* ================= NOTIFICATIONS ================= */}
          {tab === 2 && (
              <MotionCard sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Typography fontWeight={600}>Email Notifications</Typography>

                  {[
                    'Comments',
                    'Likes',
                    'New Followers',
                    'Weekly Digest',
                  ].map((label, i) => (
                      <Stack
                          key={label}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                      >
                        <Typography>{label}</Typography>
                        <Switch defaultChecked={i < 3} />
                      </Stack>
                  ))}

                  <Divider />

                  <Typography fontWeight={600}>Push Notifications</Typography>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Browser Notifications</Typography>
                    <Switch />
                  </Stack>

                  <Box textAlign="right">
                    <Button variant="contained">Save Preferences</Button>
                  </Box>
                </Stack>
              </MotionCard>
          )}

          {/* ================= SECURITY ================= */}
          {tab === 3 && (
              <Stack spacing={4}>
                <MotionCard sx={{ p: 4 }}>
                  <Typography fontWeight={600} mb={1}>
                    Two-Factor Authentication
                  </Typography>
                  <Typography color="text.secondary" mb={2}>
                    Add an extra layer of security to your account.
                  </Typography>
                  <Button variant="contained">Enable 2FA</Button>
                </MotionCard>

                <MotionCard sx={{ p: 4 }}>
                  <Typography fontWeight={600} mb={2}>
                    Active Sessions
                  </Typography>

                  <Stack spacing={2}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <PublicOutlinedIcon />
                        <Box>
                          <Typography fontWeight={500}>
                            Chrome on macOS
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            San Francisco • Current
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip label="Active" color="success" />
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <PublicOutlinedIcon />
                        <Box>
                          <Typography fontWeight={500}>
                            Safari on iPhone
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            San Francisco • 2h ago
                          </Typography>
                        </Box>
                      </Stack>
                      <Button variant="outlined" size="small">
                        Revoke
                      </Button>
                    </Stack>
                  </Stack>
                </MotionCard>
              </Stack>
          )}
        </Box>
      </Box>
  );
}
