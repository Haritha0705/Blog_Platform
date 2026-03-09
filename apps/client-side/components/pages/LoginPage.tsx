'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  Stack,
  Alert,
  CircularProgress,
  alpha,
} from '@mui/material';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useState} from "react";
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

interface LoginPageProps {
  setCurrentPage: (page: string) => void;
}

const MotionCard = motion(Card);

export default function LoginPage({ setCurrentPage }: LoginPageProps) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setServerError('');

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    if (!isLogin && !name.trim()) {
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          toast.success('Welcome back!');
          setCurrentPage('dashboard');
        } else {
          setServerError(result.error || 'Invalid credentials');
        }
      } else {
        const result = await register(name, email, password);
        if (result.success) {
          toast.success('Account created successfully!');
          setCurrentPage('dashboard');
        } else {
          setServerError(result.error || 'Registration failed');
        }
      }
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #F5F3FF 0%, #EEF2FF 30%, #F8FAFC 70%)',
        px: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -150,
          right: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
        },
      }}
    >
      <MotionCard
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        sx={{
          width: '100%',
          maxWidth: 440,
          borderRadius: '20px',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.divider, 0.6),
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CardContent sx={{ p: { xs: 3.5, sm: 4.5 } }}>
          {/* Logo */}
          <Box
            sx={{
              width: 52,
              height: 52,
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
            }}
          >
            <Typography color="#fff" fontWeight={800} variant="h5">
              B
            </Typography>
          </Box>

          {/* Header */}
          <Typography variant="h5" fontWeight={800} textAlign="center" letterSpacing="-0.02em">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3.5}
            sx={{ lineHeight: 1.5 }}
          >
            {isLogin
              ? 'Sign in to your account to continue'
              : 'Join our community of writers and readers'}
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: '12px' }} onClose={() => setServerError('')}>
              {serverError}
            </Alert>
          )}

          {/* Social Login */}
          <Stack spacing={1.5} mb={3}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              disabled
              sx={{
                borderRadius: '12px',
                py: 1.2,
                textTransform: 'none',
                fontWeight: 500,
                borderColor: 'divider',
                color: 'text.primary',
              }}
            >
              Continue with Google
            </Button>

            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              fullWidth
              disabled
              sx={{
                borderRadius: '12px',
                py: 1.2,
                textTransform: 'none',
                fontWeight: 500,
                borderColor: 'divider',
                color: 'text.primary',
              }}
            >
              Continue with GitHub
            </Button>
          </Stack>

          <Divider sx={{ my: 3, '&::before, &::after': { borderColor: (theme) => alpha(theme.palette.divider, 0.6) } }}>
            <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>OR</Typography>
          </Divider>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              {!isLogin && (
                <TextField
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <PersonOutlineIcon sx={{ color: 'text.disabled', mr: 1, fontSize: 20 }} />
                      ),
                    },
                  }}
                />
              )}

              <TextField
                label="Email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                error={!!emailError}
                helperText={emailError}
                fullWidth
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <MailOutlineIcon sx={{ color: 'text.disabled', mr: 1, fontSize: 20 }} />
                    ),
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                error={!!passwordError}
                helperText={passwordError}
                fullWidth
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <LockOutlinedIcon sx={{ color: 'text.disabled', mr: 1, fontSize: 20 }} />
                    ),
                  },
                }}
              />

              {isLogin && (
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
                  />
                  <Button size="small" sx={{ textTransform: 'none', fontWeight: 500, fontSize: '0.8rem' }}>
                    Forgot password?
                  </Button>
                </Stack>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
                sx={{
                  py: 1.4,
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
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </Stack>
          </Box>

          {/* Toggle */}
          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            mt={3.5}
          >
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Button
              variant="text"
              onClick={() => { setIsLogin(!isLogin); setServerError(''); }}
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                p: 0,
                ml: 0.5,
                minWidth: 'auto',
                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Button>
          </Typography>
        </CardContent>
      </MotionCard>
    </Box>
  );
}
