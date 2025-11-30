import React from 'react';
import { Search, Filter, Calendar, Clock, FileText } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SearchResultsPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
  searchQuery?: string;
}

export function SearchResultsPage({ setCurrentPage, setSelectedPost, searchQuery: initialQuery = '' }: SearchResultsPageProps) {
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);

  const results = [
    {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2025',
      excerpt: 'Explore the cutting-edge technologies and methodologies that are shaping the future of web development.',
      category: 'Technology',
      author: 'Sarah Johnson',
      date: 'Nov 28, 2025',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=400'
    },
    {
      id: '2',
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices and patterns for creating maintainable React applications at scale.',
      category: 'Development',
      author: 'Michael Chen',
      date: 'Nov 27, 2025',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1763568258226-3e3f67a6577e?w=400'
    },
    {
      id: '4',
      title: 'Mastering TypeScript: Advanced Techniques',
      excerpt: 'Deep dive into advanced TypeScript features and how to leverage them in your projects.',
      category: 'Development',
      author: 'David Wilson',
      date: 'Nov 25, 2025',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400'
    }
  ];

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={index} className="bg-primary/20 text-foreground">{part}</mark>
        : part
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-6">Search Results</h1>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
              autoFocus
            />
          </form>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Select defaultValue="relevance">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <p className="text-muted-foreground mb-6">
            Found <span className="font-semibold text-foreground">{results.length}</span> results 
            for "<span className="font-semibold text-foreground">{searchQuery}</span>"
          </p>
        )}

        {/* Results */}
        {results.length > 0 ? (
          <div className="space-y-6 mb-12">
            {results.map((result) => (
              <Card
                key={result.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handlePostClick(result.id)}
              >
                <div className="flex flex-col sm:flex-row gap-6 p-6">
                  <div className="w-full sm:w-48 aspect-video sm:aspect-square overflow-hidden rounded-lg flex-shrink-0">
                    <ImageWithFallback
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <Badge variant="secondary">{result.category}</Badge>
                    <h3 className="font-semibold text-xl leading-tight group-hover:text-primary transition-colors">
                      {highlightText(result.title, searchQuery)}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {highlightText(result.excerpt, searchQuery)}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{result.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {result.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {result.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any articles matching your search. Try different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => setCurrentPage('blog')}>
                  Browse Articles
                </Button>
                <Button onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Pagination */}
        {results.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="secondary">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">Next</Button>
          </div>
        )}

        {/* Search Tips */}
        {results.length === 0 && searchQuery && (
          <Card className="p-6 mt-6">
            <h4 className="font-semibold mb-3">Search Tips</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Check your spelling and try again</li>
              <li>• Try more general keywords</li>
              <li>• Try different keywords that mean the same thing</li>
              <li>• Use fewer keywords to get more results</li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
