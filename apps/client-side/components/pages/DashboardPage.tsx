import React from 'react';
import { TrendingUp, Eye, MessageSquare, Heart, FileText, Clock, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface DashboardPageProps {
  setCurrentPage: (page: string) => void;
}

export function DashboardPage({ setCurrentPage }: DashboardPageProps) {
  const stats = [
    {
      label: 'Total Views',
      value: '24.5K',
      change: '+12.5%',
      icon: Eye,
      trend: 'up'
    },
    {
      label: 'Published Posts',
      value: '18',
      change: '+2',
      icon: FileText,
      trend: 'up'
    },
    {
      label: 'Total Comments',
      value: '342',
      change: '+28',
      icon: MessageSquare,
      trend: 'up'
    },
    {
      label: 'Total Likes',
      value: '1.2K',
      change: '+156',
      icon: Heart,
      trend: 'up'
    }
  ];

  const recentPosts = [
    {
      id: '1',
      title: 'The Future of Web Development',
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
      date: 'Nov 25, 2025',
      views: '2.8K',
      comments: 18,
      likes: 142
    },
    {
      id: '3',
      title: 'Design Systems Guide',
      status: 'draft',
      date: 'Nov 24, 2025',
      views: '0',
      comments: 0,
      likes: 0
    }
  ];

  const notifications = [
    {
      id: '1',
      type: 'comment',
      message: 'Michael Chen commented on your post',
      post: 'The Future of Web Development',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'like',
      message: '24 people liked your post',
      post: 'Building Scalable React Applications',
      time: '5 hours ago'
    },
    {
      id: '3',
      type: 'milestone',
      message: 'Your post reached 3K views!',
      post: 'The Future of Web Development',
      time: '1 day ago'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your content.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.label === 'Total Views' ? 'bg-primary/10 text-primary' :
                  stat.label === 'Published Posts' ? 'bg-secondary/10 text-secondary' :
                  stat.label === 'Total Comments' ? 'bg-chart-3/10 text-chart-3' :
                  'bg-chart-5/10 text-chart-5'
                }`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Posts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Posts</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage('my-posts')}
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </p>
                    </div>
                  </div>

                  {post.status === 'published' && (
                    <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        {post.views}
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </div>
                    </div>
                  )}

                  {post.status === 'draft' && (
                    <div className="pt-4 border-t border-border">
                      <Button size="sm" variant="outline">Continue Editing</Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start gap-2"
                  onClick={() => setCurrentPage('editor')}
                >
                  <FileText className="h-4 w-4" />
                  Write New Post
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => setCurrentPage('my-posts')}
                >
                  <Clock className="h-4 w-4" />
                  View Drafts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => setCurrentPage('settings')}
                >
                  <TrendingUp className="h-4 w-4" />
                  View Analytics
                </Button>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Activity</h3>
                <Badge variant="secondary">{notifications.length}</Badge>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <p className="text-sm font-medium mb-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mb-1">{notification.post}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Tip */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Performance Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Posts with featured images get 3x more engagement. Add one to your drafts!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
