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
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import {useState} from "react";
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

interface LoginPageProps {
  setCurrentPage: (page: string) => void;
}

const MotionCard = motion(Card);

export default function LoginPage({
                                    setCurrentPage,
                                  }: LoginPageProps) {
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
            bgcolor: 'grey.100',
            px: 2,
          }}
      >
        <MotionCard
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            sx={{ width: '100%', maxWidth: 420 }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Logo */}
            <Box
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
            >
              <Typography color="#fff" fontWeight={700} variant="h5">
                B
              </Typography>
            </Box>

            {/* Header */}
            <Typography variant="h5" fontWeight={700} textAlign="center">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                mb={3}
            >
              {isLogin
                  ? 'Sign in to continue'
                  : 'Join our community of writers'}
            </Typography>

            {serverError && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setServerError('')}>
                  {serverError}
                </Alert>
            )}

            {/* Social Login */}
            <Stack spacing={2} mb={3}>
              <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  fullWidth
                  disabled
              >
                Continue with Google
              </Button>

              <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  fullWidth
                  disabled
              >
                Continue with GitHub
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>OR</Divider>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {!isLogin && (
                    <TextField
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                    />
                )}

                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    error={!!emailError}
                    helperText={emailError}
                    InputProps={{
                      startAdornment: (
                          <IconButton edge="start" disabled>
                            <MailOutlineIcon />
                          </IconButton>
                      ),
                    }}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    error={!!passwordError}
                    helperText={passwordError}
                    InputProps={{
                      startAdornment: (
                          <IconButton edge="start" disabled>
                            <LockOutlinedIcon />
                          </IconButton>
                      ),
                    }}
                    fullWidth
                    required
                />

                {isLogin && (
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                      <FormControlLabel
                          control={<Checkbox />}
                          label="Remember me"
                      />
                      <Button size="small">Forgot password?</Button>
                    </Stack>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
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
                mt={3}
            >
              {isLogin
                  ? "Don't have an account? "
                  : 'Already have an account? '}
              <Button
                  variant="text"
                  onClick={() => { setIsLogin(!isLogin); setServerError(''); }}
                  sx={{ fontWeight: 600 }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </Typography>
          </CardContent>
        </MotionCard>
      </Box>
  );
}
