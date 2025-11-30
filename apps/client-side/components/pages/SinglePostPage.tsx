import React from 'react';
import { Clock, Calendar, Share2, Bookmark, Twitter, Facebook, Linkedin, Link2, MessageSquare, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SinglePostPageProps {
  setCurrentPage: (page: string) => void;
  postId?: string;
}

export function SinglePostPage({ setCurrentPage, postId }: SinglePostPageProps) {
  const [activeSection, setActiveSection] = React.useState('introduction');

  const post = {
    id: postId || '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    category: 'Technology',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
      bio: 'Senior Software Engineer and Tech Writer. Passionate about web technologies and developer experience.',
      followers: '12.5K'
    },
    date: 'November 28, 2025',
    readTime: '8 min read',
    views: '3.2K',
    image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3B8ZW58MXx8fHwxNzY0MzM5NjMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'ai-integration', title: 'AI Integration in Development' },
    { id: 'performance', title: 'Performance Optimization' },
    { id: 'frameworks', title: 'Modern Frameworks' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  const relatedPosts = [
    {
      id: '2',
      title: 'Building Scalable React Applications',
      image: 'https://images.unsplash.com/photo-1763568258226-3e3f67a6577e?w=400',
      category: 'Development'
    },
    {
      id: '3',
      title: 'Design Systems: A Complete Guide',
      image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400',
      category: 'Design'
    },
    {
      id: '4',
      title: 'Mastering TypeScript: Advanced Techniques',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400',
      category: 'Development'
    }
  ];

  const comments = [
    {
      id: '1',
      author: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=50',
      date: '2 hours ago',
      content: 'Great article! Really insightful perspective on where web development is heading.',
      likes: 12,
      replies: []
    },
    {
      id: '2',
      author: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=50',
      date: '5 hours ago',
      content: 'The section on AI integration is particularly interesting. Would love to see more examples.',
      likes: 8,
      replies: [
        {
          id: '2-1',
          author: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=50',
          date: '3 hours ago',
          content: 'Thanks Emily! I\'ll be writing a follow-up with more practical examples soon.',
          likes: 5
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            {/* Header */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                className="mb-6 gap-2"
                onClick={() => setCurrentPage('blog')}
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Articles
              </Button>
              
              <Badge className="mb-4">{post.category}</Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <ImageWithFallback
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3 py-4 border-y border-border">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Link2 className="h-4 w-4" />
                </Button>
                <div className="ml-auto">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12 rounded-xl overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="article-content space-y-6">
              <section id="introduction">
                <h2>Introduction</h2>
                <p>
                  The landscape of web development is constantly evolving, and 2025 promises to bring some of the most significant changes we've seen in years. From AI-powered development tools to revolutionary frameworks, developers need to stay ahead of the curve.
                </p>
                <p>
                  In this comprehensive guide, we'll explore the key trends that are shaping the future of web development and discuss how you can prepare for these changes.
                </p>
              </section>

              <section id="ai-integration">
                <h2>AI Integration in Development</h2>
                <p>
                  Artificial Intelligence is no longer just a buzzword—it's becoming an integral part of the development workflow. From code completion to automated testing, AI tools are revolutionizing how we build applications.
                </p>
                <blockquote>
                  "AI-powered development tools are not replacing developers; they're amplifying their capabilities and allowing them to focus on solving complex problems."
                </blockquote>
                <p>
                  Modern IDEs now come with sophisticated AI assistants that can understand context, suggest optimizations, and even generate entire components based on natural language descriptions.
                </p>
              </section>

              <section id="performance">
                <h2>Performance Optimization</h2>
                <p>
                  Performance has always been crucial, but with the proliferation of mobile devices and varying network conditions, it's more important than ever. Here are some key strategies:
                </p>
                <ul>
                  <li>Implement lazy loading for images and components</li>
                  <li>Use server-side rendering (SSR) and static site generation (SSG)</li>
                  <li>Optimize bundle sizes with code splitting</li>
                  <li>Leverage edge computing for faster response times</li>
                  <li>Implement efficient caching strategies</li>
                </ul>
                <p>
                  Let's look at a simple example of implementing lazy loading in React:
                </p>
                <pre><code>{`import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}`}</code></pre>
              </section>

              <section id="frameworks">
                <h2>Modern Frameworks</h2>
                <p>
                  The framework ecosystem continues to mature, with established players improving and new contenders emerging. Next.js, Remix, and SvelteKit are leading the charge with their innovative approaches to building web applications.
                </p>
                <p>
                  Key features to watch for:
                </p>
                <ol>
                  <li>Enhanced developer experience with better tooling</li>
                  <li>Improved performance through smart optimizations</li>
                  <li>Better integration with edge computing platforms</li>
                  <li>Simplified data fetching and state management</li>
                </ol>
              </section>

              <section id="conclusion">
                <h2>Conclusion</h2>
                <p>
                  The future of web development is bright and full of possibilities. By staying informed about these trends and continuously learning, you can position yourself at the forefront of the industry.
                </p>
                <p>
                  Remember, the goal isn't to master every new technology that emerges, but to understand the underlying principles and choose the right tools for your specific needs.
                </p>
              </section>
            </div>

            {/* Author Bio */}
            <Card className="p-6 mt-12 bg-muted/50">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16 flex-shrink-0">
                  <ImageWithFallback
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{post.author.name}</h3>
                      <p className="text-sm text-muted-foreground">{post.author.followers} followers</p>
                    </div>
                    <Button size="sm">Follow</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                </div>
              </div>
            </Card>

            {/* Related Posts */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => setCurrentPage('post')}
                  >
                    <div className="aspect-video overflow-hidden">
                      <ImageWithFallback
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2">{relatedPost.category}</Badge>
                      <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
              
              {/* Add Comment */}
              <Card className="p-6 mb-8">
                <Textarea
                  placeholder="Share your thoughts..."
                  className="mb-3 min-h-24"
                />
                <div className="flex justify-end">
                  <Button>Post Comment</Button>
                </div>
              </Card>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <Card className="p-6">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <ImageWithFallback
                            src={comment.avatar}
                            alt={comment.author}
                            className="w-full h-full object-cover"
                          />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-sm text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-sm mb-3">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="gap-2 h-8">
                              <ThumbsUp className="h-3 w-3" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2 h-8">
                              <MessageSquare className="h-3 w-3" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-12 mt-4 space-y-4">
                        {comment.replies.map((reply) => (
                          <Card key={reply.id} className="p-6 bg-muted/30">
                            <div className="flex gap-4">
                              <Avatar className="h-10 w-10 flex-shrink-0">
                                <ImageWithFallback
                                  src={reply.avatar}
                                  alt={reply.author}
                                  className="w-full h-full object-cover"
                                />
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium">{reply.author}</span>
                                  <span className="text-sm text-muted-foreground">{reply.date}</span>
                                </div>
                                <p className="text-sm mb-3">{reply.content}</p>
                                <Button variant="ghost" size="sm" className="gap-2 h-8">
                                  <ThumbsUp className="h-3 w-3" />
                                  {reply.likes}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Prev/Next Navigation */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                  <ChevronLeft className="h-4 w-4" />
                  Previous Article
                </div>
                <h3 className="font-semibold hover:text-primary transition-colors">
                  Mastering TypeScript: Advanced Techniques
                </h3>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-end gap-3 text-sm text-muted-foreground mb-2">
                  Next Article
                  <ChevronRight className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-right hover:text-primary transition-colors">
                  Design Systems: A Complete Guide
                </h3>
              </Card>
            </div>
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(item.id);
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </Card>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
