import React from 'react';
import { ArrowRight, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
}

export function HomePage({ setCurrentPage, setSelectedPost }: HomePageProps) {
  const featuredPost = {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the cutting-edge technologies and methodologies that are shaping the future of web development.',
    category: 'Technology',
    author: 'Sarah Johnson',
    date: 'Nov 28, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3B8ZW58MXx8fHwxNzY0MzM5NjMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const latestPosts = [
    {
      id: '2',
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices and patterns for creating maintainable React applications at scale.',
      category: 'Development',
      author: 'Michael Chen',
      date: 'Nov 27, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1763568258226-3e3f67a6577e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZGV2ZWxvcG1lbnQlMjBjb2RlfGVufDF8fHx8MTc2NDQxMjc4M3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '3',
      title: 'Design Systems: A Complete Guide',
      excerpt: 'Everything you need to know about creating and maintaining effective design systems.',
      category: 'Design',
      author: 'Emily Davis',
      date: 'Nov 26, 2025',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjQzOTA5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '4',
      title: 'Mastering TypeScript: Advanced Techniques',
      excerpt: 'Deep dive into advanced TypeScript features and how to leverage them in your projects.',
      category: 'Development',
      author: 'David Wilson',
      date: 'Nov 25, 2025',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlfGVufDF8fHx8MTc2NDMxMzkxNXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '5',
      title: 'The Art of Technical Writing',
      excerpt: 'Tips and strategies for writing clear, concise, and effective technical documentation.',
      category: 'Writing',
      author: 'Jessica Brown',
      date: 'Nov 24, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ0MDE1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '6',
      title: 'Performance Optimization for Modern Web Apps',
      excerpt: 'Proven techniques to make your web applications faster and more efficient.',
      category: 'Performance',
      author: 'Alex Martinez',
      date: 'Nov 23, 2025',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQ0MTUwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '7',
      title: 'CSS Grid vs Flexbox: When to Use Each',
      excerpt: 'A comprehensive comparison of CSS Grid and Flexbox with practical examples.',
      category: 'CSS',
      author: 'Ryan Thompson',
      date: 'Nov 22, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3B8ZW58MXx8fHwxNzY0MzM5NjMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const popularPosts = [
    { id: '8', title: 'Getting Started with Next.js 15', readTime: '8 min', views: '12.5K' },
    { id: '9', title: 'Understanding React Server Components', readTime: '10 min', views: '9.8K' },
    { id: '10', title: 'Modern CSS Techniques for 2025', readTime: '7 min', views: '8.3K' },
    { id: '11', title: 'API Design Best Practices', readTime: '12 min', views: '7.1K' }
  ];

  const categories = [
    { name: 'Development', count: 124, color: 'bg-primary' },
    { name: 'Design', count: 87, color: 'bg-secondary' },
    { name: 'Technology', count: 156, color: 'bg-chart-3' },
    { name: 'Writing', count: 43, color: 'bg-chart-4' }
  ];

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Featured Post */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary text-primary-foreground">{featuredPost.category}</Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                {featuredPost.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{featuredPost.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {featuredPost.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readTime}
                </span>
              </div>
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => handlePostClick(featuredPost.id)}
              >
                Read Article <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <Button variant="outline" onClick={() => setCurrentPage('blog')}>
              View All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
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
                      <span>{post.date}</span>
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
        </div>
      </section>

      {/* Popular Posts & Categories */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Popular Posts */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Popular This Week</h2>
              </div>
              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <Card 
                    key={post.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <div className="flex gap-4">
                      <div className="text-3xl font-bold text-primary/20 leading-none">
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Categories Showcase */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Card
                    key={category.name}
                    className="p-6 hover:shadow-lg transition-all cursor-pointer group hover:scale-105"
                    onClick={() => setCurrentPage('blog')}
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-lg mb-4 group-hover:scale-110 transition-transform`} />
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} articles</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Get the latest articles and insights delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-foreground border-0"
              />
              <Button type="submit" variant="secondary" size="lg">
                Subscribe
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
