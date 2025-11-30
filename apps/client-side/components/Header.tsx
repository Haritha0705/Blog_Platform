import React from 'react';
import { Search, Moon, Sun, Menu, X, PenSquare, User, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  onSearch?: (query: string) => void;
}

export function Header({ 
  darkMode, 
  toggleDarkMode, 
  currentPage, 
  setCurrentPage,
  isAuthenticated,
  setIsAuthenticated,
  onSearch
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setCurrentPage('search');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    setUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">B</span>
              </div>
              <span className="font-semibold text-lg hidden sm:block">BlogPlatform</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`text-sm transition-colors hover:text-primary ${
                  currentPage === 'home' ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('blog')}
                className={`text-sm transition-colors hover:text-primary ${
                  currentPage === 'blog' ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => setCurrentPage('authors')}
                className={`text-sm transition-colors hover:text-primary ${
                  currentPage === 'authors' ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                Authors
              </button>
            </nav>
          </div>

          {/* Search, Theme Toggle, and Auth */}
          <div className="flex items-center gap-3">
            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9 h-9 bg-input-background"
                />
              </div>
            </form>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-9 w-9"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="h-9 w-9"
                >
                  <User className="h-5 w-5" />
                </Button>
                
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg py-1 z-50">
                      <button
                        onClick={() => {
                          setCurrentPage('dashboard');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setCurrentPage('editor');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2"
                      >
                        <PenSquare className="h-4 w-4" />
                        Write Article
                      </button>
                      <button
                        onClick={() => {
                          setCurrentPage('my-posts');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        My Posts
                      </button>
                      <button
                        onClick={() => {
                          setCurrentPage('settings');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Settings
                      </button>
                      <div className="border-t border-border my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2 text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('login')}
                className="hidden md:inline-flex"
              >
                Sign In
              </Button>
            )}

            {/* Write Button */}
            {isAuthenticated && (
              <Button
                size="sm"
                onClick={() => setCurrentPage('editor')}
                className="hidden md:inline-flex gap-2"
              >
                <PenSquare className="h-4 w-4" />
                Write
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-9 w-9"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 bg-input-background"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className="text-sm py-2 px-3 text-left rounded-lg hover:bg-accent"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('blog');
                  setMobileMenuOpen(false);
                }}
                className="text-sm py-2 px-3 text-left rounded-lg hover:bg-accent"
              >
                Articles
              </button>
              <button
                onClick={() => {
                  setCurrentPage('authors');
                  setMobileMenuOpen(false);
                }}
                className="text-sm py-2 px-3 text-left rounded-lg hover:bg-accent"
              >
                Authors
              </button>
            </nav>

            {/* Mobile Auth */}
            {isAuthenticated ? (
              <>
                <div className="border-t border-border pt-3 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setCurrentPage('dashboard');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setCurrentPage('editor');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <PenSquare className="h-4 w-4" />
                    Write Article
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Button
                className="w-full"
                onClick={() => {
                  setCurrentPage('login');
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
