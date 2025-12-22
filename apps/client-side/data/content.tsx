import { Eye, MessageSquare, Heart, FileText } from 'lucide-react';

//AuthorPage

export const author = {
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
        followers: 12500,
        posts: 42,
        views: 156000,
    },
};

export const posts = [
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

//Blog page

export const blogPosts = [
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

//Dashboard page

export const stats = [
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

export const recentPosts = [
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

export const notifications = [
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

//home page

export const featuredPost = {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the cutting-edge technologies and methodologies that are shaping the future of web development.',
    category: 'Technology',
    author: 'Sarah Johnson',
    date: 'Nov 28, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1622131815183-e7f8bbac9cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3B8ZW58MXx8fHwxNzY0MzM5NjMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
};

export const latestPosts = [
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

export const popularPosts = [
    { id: '8', title: 'Getting Started with Next.js 15', readTime: '8 min', views: '12.5K' },
    { id: '9', title: 'Understanding React Server Components', readTime: '10 min', views: '9.8K' },
    { id: '10', title: 'Modern CSS Techniques for 2025', readTime: '7 min', views: '8.3K' },
    { id: '11', title: 'API Design Best Practices', readTime: '12 min', views: '7.1K' }
];

export const categories = [
    { name: 'Development', count: 124, color: 'bg-primary' },
    { name: 'Design', count: 87, color: 'bg-secondary' },
    { name: 'Technology', count: 156, color: 'bg-chart-3' },
    { name: 'Writing', count: 43, color: 'bg-chart-4' }
];

//my post

export const myPosts = [
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

//search result

export const results = [
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

//single post

export const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'ai-integration', title: 'AI Integration in Development' },
    { id: 'performance', title: 'Performance Optimization' },
    { id: 'frameworks', title: 'Modern Frameworks' },
    { id: 'conclusion', title: 'Conclusion' }
];

export const relatedPosts = [
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

export const comments = [
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