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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Dashboard as DashboardIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAuthenticated: boolean;onLogout: () => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
                                                darkMode,
                                                toggleDarkMode,
                                                currentPage,
                                                setCurrentPage,
                                                isAuthenticated,
                                                onLogout,
                                                onSearch,
                                              }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar className="flex justify-between">
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={2}>
            <Button
                onClick={() => setCurrentPage('home')}
                color="inherit"
                sx={{ textTransform: 'none' }}
            >
              <Box
                  width={32}
                  height={32}
                  bgcolor="primary.main"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={1}
                  color="white"
                  mr={1}
              >
                B
              </Box>
              <Typography variant="h6">BlogPlatform</Typography>
            </Button>
          </Box>

          {/* Desktop Menu */}
          <Box display={{ xs: 'none', md: 'flex' }} alignItems="center" gap={2}>
            <Button
                color={currentPage === 'home' ? 'primary' : 'inherit'}
                onClick={() => setCurrentPage('home')}
            >
              Home
            </Button>
            <Button
                color={currentPage === 'blog' ? 'primary' : 'inherit'}
                onClick={() => setCurrentPage('blog')}
            >
              Articles
            </Button>
            <Button
                color={currentPage === 'authors' ? 'primary' : 'inherit'}
                onClick={() => setCurrentPage('authors')}
            >
              Authors
            </Button>
          </Box>

          {/* Right Actions */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Search */}
            <form onSubmit={handleSearch}>
              <Box
                  display="flex"
                  alignItems="center"
                  border={1}
                  borderColor="divider"
                  borderRadius={1}
                  px={1}
              >
                <SearchIcon fontSize="small" color="action" />
                <InputBase
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    sx={{ ml: 1 }}
                />
              </Box>
            </form>

            {/* Theme Toggle */}
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Auth */}
            {isAuthenticated ? (
                <>
                  <IconButton onClick={handleUserMenuOpen} color="inherit">
                    <PersonIcon />
                  </IconButton>
                  <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleUserMenuClose}
                  >
                    <MenuItem
                        onClick={() => {
                          setCurrentPage('dashboard');
                          handleUserMenuClose();
                        }}
                    >
                      <DashboardIcon fontSize="small" sx={{ mr: 1 }} />
                      Dashboard
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                          setCurrentPage('editor');
                          handleUserMenuClose();
                        }}
                    >
                      <EditIcon fontSize="small" sx={{ mr: 1 }} />
                      Write Article
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                          setCurrentPage('settings');
                          handleUserMenuClose();
                        }}
                    >
                      <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
            ) : (
                <Button
                    variant="outlined"
                    onClick={() => setCurrentPage('login')}
                    sx={{ textTransform: 'none' }}
                >
                  Sign In
                </Button>
            )}

            {/* Mobile Menu Toggle */}
            <IconButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                sx={{ display: { md: 'none' } }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
            >
              <Box display="flex" flexDirection="column" p={2} gap={1}>
                <Button onClick={() => setCurrentPage('home')}>Home</Button>
                <Button onClick={() => setCurrentPage('blog')}>Articles</Button>
                <Button onClick={() => setCurrentPage('authors')}>Authors</Button>
              </Box>
            </motion.div>
        )}
      </AppBar>
  );
};
