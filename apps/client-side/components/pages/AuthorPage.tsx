import React from 'react';
import { Twitter, Github, Linkedin, Globe, Users, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface AuthorPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedPost?: (postId: string) => void;
}

export function AuthorPage({ setCurrentPage, setSelectedPost }: AuthorPageProps) {
  const author = {
    name: 'Sarah Johnson',
    username: '@sarahjohnson',
    avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200',
    bio: 'Senior Software Engineer and Tech Writer. Passionate about web technologies and developer experience. Sharing insights about React, TypeScript, and modern web development.',
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    twitter: 'https://twitter.com/sarahjohnson',
    github: 'https://github.com/sarahjohnson',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    stats: {
      followers: '12.5K',
      posts: '42',
      views: '156K'
    }
  };

  const posts = [
    {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2025',
      excerpt: 'Explore the cutting-edge technologies and methodologies that are shaping the future of web development.',
      category: 'Technology',
      date: 'Nov 28, 2025',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?w=600',
      views: '3.2K',
      likes: 156
    },
    {
      id: '2',
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices and patterns for creating maintainable React applications at scale.',
      category: 'Development',
      date: 'Nov 27, 2025',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1763568258226-3e3f67a6577e?w=600',
      views: '2.8K',
      likes: 142
    },
    {
      id: '3',
      title: 'Mastering TypeScript: Advanced Techniques',
      excerpt: 'Deep dive into advanced TypeScript features and how to leverage them in your projects.',
      category: 'Development',
      date: 'Nov 25, 2025',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600',
      views: '2.1K',
      likes: 98
    },
    {
      id: '4',
      title: 'Performance Optimization for Modern Web Apps',
      excerpt: 'Proven techniques to make your web applications faster and more efficient.',
      category: 'Performance',
      date: 'Nov 23, 2025',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
      views: '1.9K',
      likes: 87
    }
  ];

  const handlePostClick = (postId: string) => {
    setSelectedPost?.(postId);
    setCurrentPage('post');
  };

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <ImageWithFallback
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{author.name}</h1>
                  <p className="text-muted-foreground">{author.username}</p>
                </div>
                <Button size="lg" className="gap-2">
                  <Users className="h-4 w-4" />
                  Follow
                </Button>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {author.bio}
              </p>

              {/* Stats */}
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="font-bold text-xl">{author.stats.followers}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="font-bold text-xl">{author.stats.posts}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
                <div>
                  <p className="font-bold text-xl">{author.stats.views}</p>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <Button variant="outline" size="icon" asChild>
                  <a href={author.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={author.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={author.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="aspect-video overflow-hidden">
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
                      <span>{post.date}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">About {author.name}</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Sarah is a Senior Software Engineer with over 10 years of experience in web development. 
                  She specializes in building scalable React applications and has a passion for sharing 
                  her knowledge with the developer community.
                </p>
                
                <p>
                  Her expertise spans across modern JavaScript frameworks, TypeScript, performance 
                  optimization, and design systems. She regularly speaks at conferences and contributes 
                  to open-source projects.
                </p>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>React</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>Next.js</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>Design Systems</Badge>
                    <Badge>Performance</Badge>
                    <Badge>Testing</Badge>
                    <Badge>Architecture</Badge>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Achievements</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Speaker at React Conf 2024</li>
                    <li>Contributor to major open-source projects</li>
                    <li>Published author in leading tech publications</li>
                    <li>Mentor to junior developers</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
