'use client';

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
  alpha,
} from '@mui/material';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicOutlinedIcon from '@mui/icons-material/Public';
import {useState} from "react";
import { useAuth } from '@/lib/auth-context';
import { useMutation } from '@apollo/client/react';
import { UPDATE_USER } from '@/lib/graphql/operations';
import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface SettingsPageProps {
  setCurrentPage: (page: string) => void;
}

const MotionCard = motion(Card);

export default function SettingsPage({ setCurrentPage }: SettingsPageProps) {
  const { user } = useAuth();
  const [updateUser] = useMutation<AnyData>(UPDATE_USER);
  const [tab, setTab] = useState(0);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      await updateUser({
        variables: { updateUserInput: { id: user.id, name, bio } },
      });
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const cardSx = {
    borderRadius: '16px',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)', py: { xs: 4, md: 6 }, px: 2 }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        {/* Header */}
        <Box mb={4}>
          <Button
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => setCurrentPage('dashboard')}
            sx={{ mb: 2, textTransform: 'none', fontWeight: 500, borderRadius: '10px' }}
          >
            Back to Dashboard
          </Button>

          <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em">
            Settings
          </Typography>
          <Typography color="text.secondary" fontSize="0.95rem">
            Manage your account settings and preferences
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: 4,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              minHeight: 44,
              borderRadius: '10px 10px 0 0',
            },
            '& .Mui-selected': { color: 'primary.main' },
            '& .MuiTabs-indicator': { borderRadius: '2px', height: 3 },
          }}
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
            sx={{ ...cardSx, p: 4 }}
          >
            <Stack spacing={4}>
              {/* Avatar */}
              <Box>
                <Typography fontWeight={700} mb={2} fontSize="0.95rem">
                  Profile Picture
                </Typography>

                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar sx={{ width: 96, height: 96, border: '3px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.2) }}>
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
                      sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                    >
                      Change Avatar
                    </Button>
                    <Typography variant="caption" color="text.disabled">
                      JPG, PNG or GIF. Max 2MB.
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.5) }} />

              {/* Name */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                <TextField label="Email" defaultValue={user?.email || ''} fullWidth disabled sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Stack>

              {/* Bio */}
              <Box>
                <TextField
                  label="Bio"
                  multiline
                  rows={3}
                  fullWidth
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  slotProps={{ htmlInput: { maxLength: 200 } }}
                />
                <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
                  {bio.length}/200 characters
                </Typography>
              </Box>

              {/* Social Links */}
              <Box>
                <Typography fontWeight={700} mb={2} fontSize="0.95rem">
                  Social Links
                </Typography>

                <Stack spacing={2}>
                  {[
                    { icon: <LanguageOutlinedIcon sx={{ color: 'text.disabled' }} />, placeholder: 'https://yourwebsite.com' },
                    { icon: <TwitterIcon sx={{ color: 'text.disabled' }} />, placeholder: 'https://twitter.com/username' },
                    { icon: <GitHubIcon sx={{ color: 'text.disabled' }} />, placeholder: 'https://github.com/username' },
                    { icon: <LinkedInIcon sx={{ color: 'text.disabled' }} />, placeholder: 'https://linkedin.com/in/username' },
                  ].map((item, i) => (
                    <Stack key={i} direction="row" spacing={2} alignItems="center">
                      {item.icon}
                      <TextField placeholder={item.placeholder} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                    </Stack>
                  ))}
                </Stack>
              </Box>

              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Button variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, borderColor: 'divider' }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveProfile}
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                    boxShadow: '0 2px 8px rgba(99,102,241,0.25)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5558E8 0%, #7C4FE0 100%)',
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          </MotionCard>
        )}

        {/* ================= ACCOUNT ================= */}
        {tab === 1 && (
          <Stack spacing={3}>
            <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ ...cardSx, p: 4 }}>
              <Typography fontWeight={700} mb={2.5} fontSize="0.95rem">
                Account Information
              </Typography>

              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="flex-end">
                  <TextField label="Email" defaultValue="sarah.johnson@example.com" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                  <Button variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>Change</Button>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="flex-end">
                  <TextField label="Username" defaultValue="@sarahjohnson" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                  <Button variant="outlined" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>Change</Button>
                </Stack>
              </Stack>
            </MotionCard>

            <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} sx={{ ...cardSx, p: 4 }}>
              <Typography fontWeight={700} mb={2.5} fontSize="0.95rem">
                Password
              </Typography>

              <Stack spacing={2}>
                <TextField label="Current Password" type="password" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                <TextField label="New Password" type="password" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                <TextField label="Confirm New Password" type="password" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                <Button
                  variant="contained"
                  sx={{
                    alignSelf: 'flex-start',
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  }}
                >
                  Update Password
                </Button>
              </Stack>
            </MotionCard>

            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              sx={{ ...cardSx, p: 4, borderColor: (theme) => alpha(theme.palette.error.main, 0.3) }}
            >
              <Typography fontWeight={700} color="error" mb={1} fontSize="0.95rem">
                Danger Zone
              </Typography>
              <Typography color="text.secondary" mb={2.5} variant="body2">
                Once you delete your account, there is no going back. Please be certain.
              </Typography>
              <Button color="error" variant="contained" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}>
                Delete Account
              </Button>
            </MotionCard>
          </Stack>
        )}

        {/* ================= NOTIFICATIONS ================= */}
        {tab === 2 && (
          <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ ...cardSx, p: 4 }}>
            <Stack spacing={3}>
              <Typography fontWeight={700} fontSize="0.95rem">Email Notifications</Typography>

              {['Comments', 'Likes', 'New Followers', 'Weekly Digest'].map((label, i) => (
                <Stack key={label} direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography fontWeight={500} fontSize="0.9rem">{label}</Typography>
                    <Typography variant="caption" color="text.disabled">
                      {label === 'Comments' && 'Get notified when someone comments on your post'}
                      {label === 'Likes' && 'Get notified when someone likes your post'}
                      {label === 'New Followers' && 'Get notified when someone follows you'}
                      {label === 'Weekly Digest' && 'Receive a weekly summary of your stats'}
                    </Typography>
                  </Box>
                  <Switch defaultChecked={i < 3} />
                </Stack>
              ))}

              <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.5) }} />

              <Typography fontWeight={700} fontSize="0.95rem">Push Notifications</Typography>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography fontWeight={500} fontSize="0.9rem">Browser Notifications</Typography>
                  <Typography variant="caption" color="text.disabled">Get real-time push notifications in your browser</Typography>
                </Box>
                <Switch />
              </Stack>

              <Box textAlign="right">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  }}
                >
                  Save Preferences
                </Button>
              </Box>
            </Stack>
          </MotionCard>
        )}

        {/* ================= SECURITY ================= */}
        {tab === 3 && (
          <Stack spacing={3}>
            <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ ...cardSx, p: 4 }}>
              <Typography fontWeight={700} mb={1} fontSize="0.95rem">
                Two-Factor Authentication
              </Typography>
              <Typography color="text.secondary" mb={2.5} variant="body2">
                Add an extra layer of security to your account with 2FA.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                }}
              >
                Enable 2FA
              </Button>
            </MotionCard>

            <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} sx={{ ...cardSx, p: 4 }}>
              <Typography fontWeight={700} mb={2.5} fontSize="0.95rem">
                Active Sessions
              </Typography>

              <Stack spacing={2.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '10px', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06) }}>
                      <PublicOutlinedIcon sx={{ color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography fontWeight={600} fontSize="0.9rem">Chrome on macOS</Typography>
                      <Typography variant="caption" color="text.disabled">San Francisco • Current session</Typography>
                    </Box>
                  </Stack>
                  <Chip
                    label="Active"
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.65rem',
                      borderRadius: '6px',
                      bgcolor: 'rgba(16,185,129,0.08)',
                      color: '#10B981',
                    }}
                  />
                </Stack>

                <Divider sx={{ borderColor: (theme) => alpha(theme.palette.divider, 0.5) }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '10px', bgcolor: (theme) => alpha(theme.palette.action.hover, 0.06) }}>
                      <PublicOutlinedIcon sx={{ color: 'text.disabled' }} />
                    </Box>
                    <Box>
                      <Typography fontWeight={600} fontSize="0.9rem">Safari on iPhone</Typography>
                      <Typography variant="caption" color="text.disabled">San Francisco • 2h ago</Typography>
                    </Box>
                  </Stack>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, borderColor: 'divider', fontSize: '0.8rem' }}
                  >
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
