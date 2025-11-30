import React from 'react';
import { Grid, List, SlidersHorizontal, Clock, Calendar, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BlogListingPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
}

export function BlogListingPage({ setCurrentPage, setSelectedPost }: BlogListingPageProps) {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = React.useState('');

  const posts = [
    {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2025',
      excerpt: 'Explore the cutting-edge technologies and methodologies that are shaping the future of web development.',
      category: 'Technology',
      author: 'Sarah Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      date: 'Nov 28, 2025',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3B8ZW58MXx8fHwxNzY0MzM5NjMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '2',
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices and patterns for creating maintainable React applications at scale.',
      category: 'Development',
      author: 'Michael Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      date: 'Nov 27, 2025',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1763568258226-3e3f67a6577e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZGV2ZWxvcG1lbnQlMjBjb2RlfGVufDF8fHx8MTc2NDQxMjc4M3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '3',
      title: 'Design Systems: A Complete Guide',
      excerpt: 'Everything you need to know about creating and maintaining effective design systems.',
      category: 'Design',
      author: 'Emily Davis',
      authorAvatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      date: 'Nov 26, 2025',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjQzOTA5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '4',
      title: 'Mastering TypeScript: Advanced Techniques',
      excerpt: 'Deep dive into advanced TypeScript features and how to leverage them in your projects.',
      category: 'Development',
      author: 'David Wilson',
      authorAvatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      date: 'Nov 25, 2025',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlfGVufDF8fHx8MTc2NDMxMzkxNXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '5',
      title: 'The Art of Technical Writing',
      excerpt: 'Tips and strategies for writing clear, concise, and effective technical documentation.',
      category: 'Writing',
      author: 'Jessica Brown',
      authorAvatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      date: 'Nov 24, 2025',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ0MDE1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '6',
      title: 'Performance Optimization for Modern Web Apps',
      excerpt: 'Proven techniques to make your web applications faster and more efficient.',
      category: 'Performance',
      author: 'Alex Martinez',
      authorAvatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      date: 'Nov 23, 2025',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQ0MTUwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const categories = ['All', 'Technology', 'Development', 'Design', 'Writing', 'Performance'];
  const tags = ['React', 'TypeScript', 'CSS', 'Next.js', 'Design Systems', 'Performance', 'API'];

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">All Articles</h1>
              <p className="text-muted-foreground">Discover insights, tutorials, and stories from our community.</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                  <div className="flex gap-1 border border-border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="h-8 w-8"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="h-8 w-8"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select defaultValue="latest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Posts Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <h3 className="font-semibold text-xl leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                        <span>{post.author}</span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6 mb-12">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <div className="flex flex-col sm:flex-row gap-6 p-6">
                      <div className="w-full sm:w-48 aspect-[16/10] sm:aspect-square overflow-hidden rounded-lg flex-shrink-0">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <h3 className="font-semibold text-2xl leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="secondary">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            {/* Categories */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="font-semibold mb-2">Newsletter</h3>
              <p className="text-sm mb-4 text-primary-foreground/90">
                Get the latest articles delivered to your inbox.
              </p>
              <Input
                type="email"
                placeholder="Your email"
                className="mb-2 bg-white text-foreground border-0"
              />
              <Button variant="secondary" className="w-full">Subscribe</Button>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
