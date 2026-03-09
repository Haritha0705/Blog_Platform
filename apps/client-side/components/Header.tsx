'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  InputBase,
  Box,
  Fade,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  ArticleOutlined,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  isAuthenticated,
  onLogout,
  onSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setCurrentPage('search');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    setCurrentPage('home');
    handleUserMenuClose();
  };

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Articles', page: 'blog' },
    { label: 'Authors', page: 'authors' },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1280,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, md: 3 },
          height: 64,
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setCurrentPage('home')}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              color: 'white',
              fontWeight: 800,
              fontSize: 18,
              mr: 1.5,
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
            }}
          >
            B
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.15rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BlogPlatform
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        <Box
          display={{ xs: 'none', md: 'flex' }}
          alignItems="center"
          gap={0.5}
          sx={{
            bgcolor: (theme) => alpha(theme.palette.action.hover, 0.04),
            borderRadius: '12px',
            px: 1,
            py: 0.5,
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              sx={{
                px: 2.5,
                py: 0.8,
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: currentPage === item.page ? 600 : 500,
                fontSize: '0.875rem',
                color: currentPage === item.page ? 'primary.main' : 'text.secondary',
                bgcolor: currentPage === item.page ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
                '&:hover': {
                  bgcolor: currentPage === item.page
                    ? (theme) => alpha(theme.palette.primary.main, 0.12)
                    : (theme) => alpha(theme.palette.action.hover, 0.08),
                },
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right Actions */}
        <Box display="flex" alignItems="center" gap={1.5}>
          {/* Search */}
          <form onSubmit={handleSearch}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette.action.hover, 0.06),
                border: '1.5px solid',
                borderColor: searchFocused ? 'primary.main' : 'transparent',
                borderRadius: '12px',
                px: 1.5,
                py: 0.5,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: searchFocused ? 280 : 200,
                boxShadow: searchFocused ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : 'none',
              }}
            >
              <SearchIcon sx={{ fontSize: 20, color: searchFocused ? 'primary.main' : 'text.disabled', transition: 'color 0.2s' }} />
              <InputBase
                placeholder="Search articles…"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                sx={{
                  ml: 1,
                  flex: 1,
                  fontSize: '0.875rem',
                  '& input::placeholder': { color: 'text.disabled', opacity: 1 },
                }}
              />
              {searchQuery && (
                <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.3 }}>
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              )}
            </Box>
          </form>

          {/* Auth */}
          {isAuthenticated ? (
            <>
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{
                  p: 0.5,
                  border: '2px solid',
                  borderColor: Boolean(anchorEl) ? 'primary.main' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  U
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                slots={{ transition: Fade }}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      mt: 1.5,
                      minWidth: 220,
                      borderRadius: '14px',
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                      overflow: 'visible',
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 20,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        borderLeft: '1px solid',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => { setCurrentPage('dashboard'); handleUserMenuClose(); }} sx={{ py: 1.2, borderRadius: '8px', mx: 0.5, mb: 0.3 }}>
                  <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Dashboard" slotProps={{ primary: { fontSize: '0.875rem', fontWeight: 500 } }} />
                </MenuItem>
                <MenuItem onClick={() => { setCurrentPage('editor'); handleUserMenuClose(); }} sx={{ py: 1.2, borderRadius: '8px', mx: 0.5, mb: 0.3 }}>
                  <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Write Article" slotProps={{ primary: { fontSize: '0.875rem', fontWeight: 500 } }} />
                </MenuItem>
                <MenuItem onClick={() => { setCurrentPage('my-posts'); handleUserMenuClose(); }} sx={{ py: 1.2, borderRadius: '8px', mx: 0.5, mb: 0.3 }}>
                  <ListItemIcon><ArticleOutlined fontSize="small" /></ListItemIcon>
                  <ListItemText primary="My Posts" slotProps={{ primary: { fontSize: '0.875rem', fontWeight: 500 } }} />
                </MenuItem>
                <MenuItem onClick={() => { setCurrentPage('settings'); handleUserMenuClose(); }} sx={{ py: 1.2, borderRadius: '8px', mx: 0.5, mb: 0.3 }}>
                  <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Settings" slotProps={{ primary: { fontSize: '0.875rem', fontWeight: 500 } }} />
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleLogout} sx={{ py: 1.2, borderRadius: '8px', mx: 0.5, color: 'error.main' }}>
                  <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
                  <ListItemText primary="Logout" slotProps={{ primary: { fontSize: '0.875rem', fontWeight: 500 } }} />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => setCurrentPage('login')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: '10px',
                px: 2.5,
                py: 0.8,
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                '&:hover': {
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35)',
                  background: 'linear-gradient(135deg, #5558E8 0%, #7C4FE0 100%)',
                },
              }}
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{
              display: { md: 'none' },
              bgcolor: (theme) => alpha(theme.palette.action.hover, 0.06),
              borderRadius: '10px',
            }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              p={2}
              gap={0.5}
              sx={{ borderTop: '1px solid', borderColor: 'divider' }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.page}
                  fullWidth
                  onClick={() => { setCurrentPage(item.page); setMobileMenuOpen(false); }}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.2,
                    px: 2,
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: currentPage === item.page ? 600 : 500,
                    color: currentPage === item.page ? 'primary.main' : 'text.secondary',
                    bgcolor: currentPage === item.page ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </AppBar>
  );
};
