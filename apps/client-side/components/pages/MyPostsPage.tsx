import React from 'react';
import { Search, Plus, Eye, Edit, Trash2, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface MyPostsPageProps {
  setCurrentPage: (page: string) => void;
}

export function MyPostsPage({ setCurrentPage }: MyPostsPageProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [selectedPosts, setSelectedPosts] = React.useState<string[]>([]);

  const posts = [
    {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2025',
      status: 'published',
      date: 'Nov 28, 2025',
      views: '3.2K',
      comments: 24,
      likes: 156
    },
    {
      id: '2',
      title: 'Building Scalable React Applications',
      status: 'published',
      date: 'Nov 27, 2025',
      views: '2.8K',
      comments: 18,
      likes: 142
    },
    {
      id: '3',
      title: 'Design Systems: A Complete Guide',
      status: 'draft',
      date: 'Nov 26, 2025',
      views: '-',
      comments: 0,
      likes: 0
    },
    {
      id: '4',
      title: 'Mastering TypeScript: Advanced Techniques',
      status: 'published',
      date: 'Nov 25, 2025',
      views: '2.1K',
      comments: 15,
      likes: 98
    },
    {
      id: '5',
      title: 'The Art of Technical Writing',
      status: 'draft',
      date: 'Nov 24, 2025',
      views: '-',
      comments: 0,
      likes: 0
    },
    {
      id: '6',
      title: 'Performance Optimization for Modern Web Apps',
      status: 'published',
      date: 'Nov 23, 2025',
      views: '1.9K',
      comments: 12,
      likes: 87
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  const handleSelectPost = (postId: string) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Posts</h1>
            <p className="text-muted-foreground">Manage and track your content</p>
          </div>
          <Button className="gap-2" onClick={() => setCurrentPage('editor')}>
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Drafts</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          {selectedPosts.length > 0 && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">
                {selectedPosts.length} selected
              </span>
              <Button variant="outline" size="sm">
                Bulk Edit
              </Button>
              <Button variant="outline" size="sm" className="text-destructive">
                Delete Selected
              </Button>
            </div>
          )}
        </Card>

        {/* Posts Table - Desktop */}
        <Card className="hidden md:block overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Comments</TableHead>
                <TableHead className="text-right">Likes</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onCheckedChange={() => handleSelectPost(post.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{post.date}</TableCell>
                  <TableCell className="text-right">{post.views}</TableCell>
                  <TableCell className="text-right">{post.comments}</TableCell>
                  <TableCell className="text-right">{post.likes}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {post.status === 'published' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setCurrentPage('editor')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Posts Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <Checkbox
                  checked={selectedPosts.includes(post.id)}
                  onCheckedChange={() => handleSelectPost(post.id)}
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </div>
                  {post.status === 'published' && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.views} views</span>
                      <span>{post.comments} comments</span>
                      <span>{post.likes} likes</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                {post.status === 'published' && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setCurrentPage('editor')}
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive ml-auto">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'Start creating your first post'}
              </p>
              {!searchQuery && (
                <Button className="gap-2" onClick={() => setCurrentPage('editor')}>
                  <Plus className="h-4 w-4" />
                  Create Your First Post
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="secondary">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">Next</Button>
          </div>
        )}
      </div>
    </div>
  );
}
