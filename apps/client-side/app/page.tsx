"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/components/pages/HomePage';
import { BlogListingPage } from '@/components/pages/BlogListingPage';
import { SinglePostPage } from '@/components/pages/SinglePostPage';
import { LoginPage } from '@/components/pages/LoginPage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { EditorPage } from '@/components/pages/EditorPage';
import { MyPostsPage } from '@/components/pages/MyPostsPage';
import { SettingsPage } from '@/components/pages/SettingsPage';
import { AuthorPage } from '@/components/pages/AuthorPage';
import { SearchResultsPage } from '@/components/pages/SearchResultsPage';
import { Toaster } from '@/components/ui/sonner';
import { useState, useEffect } from "react";

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
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
        <div className="min-h-screen flex flex-col">
            <Header
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                onSearch={handleSearch}
            />
            <main className="flex-1">
                {renderPage()}
            </main>
            <Footer />
            <Toaster />
        </div>
    );
}
