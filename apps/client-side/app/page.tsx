'use client';

import { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import HomePage from '@/components/pages/HomePage';
import {BlogListingPage} from '@/components/pages/BlogListingPage';
import SinglePostPage from '@/components/pages/SinglePostPage';
import LoginPage from '@/components/pages/LoginPage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import {EditorPage} from '@/components/pages/EditorPage';
import MyPostsPage from '@/components/pages/MyPostsPage';
import SettingsPage from '@/components/pages/SettingsPage';
import {AuthorPage} from '@/components/pages/AuthorPage';
import  SearchResultsPage from '@/components/pages/SearchResultsPage';

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // MUI Theme
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleSearch = (query: string) => setSearchQuery(query);

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
                return <LoginPage setCurrentPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} />;
            case 'dashboard':
                return isAuthenticated ? <DashboardPage setCurrentPage={setCurrentPage} /> : <LoginPage setCurrentPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} />;
            case 'editor':
                return isAuthenticated ? <EditorPage setCurrentPage={setCurrentPage} /> : <LoginPage setCurrentPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} />;
            case 'my-posts':
                return isAuthenticated ? <MyPostsPage setCurrentPage={setCurrentPage} /> : <LoginPage setCurrentPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} />;
            case 'settings':
                return isAuthenticated ? <SettingsPage setCurrentPage={setCurrentPage} /> : <LoginPage setCurrentPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPostId} />;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
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
                <Toaster />
            </Box>
        </ThemeProvider>
    );
}
