'use client';

import { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import HomePage from '@/components/pages/HomePage';
import { BlogListingPage } from '@/components/pages/BlogListingPage';
import SinglePostPage from '@/components/pages/SinglePostPage';
import LoginPage from '@/components/pages/LoginPage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { EditorPage } from '@/components/pages/EditorPage';
import MyPostsPage from '@/components/pages/MyPostsPage';
import SettingsPage from '@/components/pages/SettingsPage';
import { AuthorPage } from '@/components/pages/AuthorPage';
import SearchResultsPage from '@/components/pages/SearchResultsPage';

function AppContent() {
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [selectedPostId, setSelectedPostId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { isAuthenticated, logout } = useAuth();

    // MUI Theme — light only
    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#6366F1',
            },
            secondary: {
                main: '#F97316',
            },
            background: {
                default: '#F8FAFC',
                paper: '#FFFFFF',
            },
        },
        typography: {
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiCard: {
                defaultProps: {
                    elevation: 0,
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none' as const,
                        fontWeight: 600,
                    },
                },
            },
        },
    });


    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage('search');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPostId} />;
            case 'blog':
                return <BlogListingPage setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPostId} />;
            case 'post':
                return <SinglePostPage setCurrentPage={setCurrentPage} postId={selectedPostId} />;
            case 'authors':
                return <AuthorPage setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPostId} />;
            case 'search':
                return <SearchResultsPage setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPostId} searchQuery={searchQuery} />;
            case 'login':
                return <LoginPage setCurrentPage={setCurrentPage} />;
            case 'dashboard':
                return isAuthenticated ? <DashboardPage setCurrentPage={setCurrentPage} /> : <LoginPage setCurrentPage={setCurrentPage} />;
            case 'editor':
                return isAuthenticated ? <EditorPage setCurrentPage={setCurrentPage} /> : <LoginPage setCurrentPage={setCurrentPage} />;
            case 'my-posts':
                return isAuthenticated ? <MyPostsPage setCurrentPage={setCurrentPage} /> : <LoginPage setCurrentPage={setCurrentPage} />;
            case 'settings':
                return isAuthenticated ? <SettingsPage setCurrentPage={setCurrentPage} /> : <LoginPage setCurrentPage={setCurrentPage} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPostId} />;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Header
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isAuthenticated={isAuthenticated}
                    onLogout={logout}
                    onSearch={handleSearch}
                />
                <Box component="main" flex="1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage + selectedPostId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderPage()}
                        </motion.div>
                    </AnimatePresence>
                </Box>

                <Footer />
                <Toaster richColors position="bottom-right" />
            </Box>
        </ThemeProvider>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

