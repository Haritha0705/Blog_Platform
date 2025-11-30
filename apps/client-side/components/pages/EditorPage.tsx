import React from 'react';
import { Bold, Italic, List, ListOrdered, Link2, Image, Code, Quote, Eye, Save, Send, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface EditorPageProps {
  setCurrentPage: (page: string) => void;
}

export function EditorPage({ setCurrentPage }: EditorPageProps) {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [excerpt, setExcerpt] = React.useState('');
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
  const [wordCount, setWordCount] = React.useState(0);

  React.useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  React.useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  }, [title]);

  const handleSave = () => {
    setLastSaved(new Date());
  };

  const handlePublish = () => {
    setCurrentPage('dashboard');
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Bold', action: () => {} },
    { icon: Italic, label: 'Italic', action: () => {} },
    { icon: List, label: 'Bullet List', action: () => {} },
    { icon: ListOrdered, label: 'Numbered List', action: () => {} },
    { icon: Link2, label: 'Insert Link', action: () => {} },
    { icon: Image, label: 'Insert Image', action: () => {} },
    { icon: Code, label: 'Code Block', action: () => {} },
    { icon: Quote, label: 'Quote', action: () => {} }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Bar */}
      <div className="sticky top-16 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('dashboard')}
              >
                ← Back
              </Button>
              {lastSaved && (
                <span className="text-xs text-muted-foreground">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleSave}>
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button size="sm" className="gap-2" onClick={handlePublish}>
                <Send className="h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card className="p-6">
              <Input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-bold border-0 px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40"
              />
            </Card>

            {/* Content Editor */}
            <Card className="p-0 overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-3 border-b border-border bg-muted/30">
                <Select defaultValue="paragraph">
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                    <SelectItem value="h1">Heading 1</SelectItem>
                    <SelectItem value="h2">Heading 2</SelectItem>
                    <SelectItem value="h3">Heading 3</SelectItem>
                  </SelectContent>
                </Select>
                <Separator orientation="vertical" className="h-6 mx-2" />
                {toolbarButtons.map((button) => (
                  <Button
                    key={button.label}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={button.action}
                    title={button.label}
                  >
                    <button.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>

              {/* Editor Area */}
              <div className="p-6">
                <Textarea
                  placeholder="Write your article here... Use the toolbar above to format your content."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[500px] border-0 focus-visible:ring-0 resize-none text-base leading-relaxed article-content"
                />
              </div>
            </Card>

            {/* Word Count */}
            <div className="text-sm text-muted-foreground text-right">
              {wordCount} words • {Math.ceil(wordCount / 200)} min read
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Featured Image */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Featured Image</h3>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload image
                </p>
              </div>
            </Card>

            {/* Category */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Category</h3>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Tags</h3>
              <Input
                type="text"
                placeholder="Add tags (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="mb-3"
              />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-2">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </Card>

            {/* SEO */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">URL Slug</label>
                  <Input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Excerpt <span className="text-muted-foreground font-normal">(160 chars)</span>
                  </label>
                  <Textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of your post..."
                    maxLength={160}
                    className="min-h-20"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {excerpt.length}/160
                  </p>
                </div>
              </div>
            </Card>

            {/* Publish Settings */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Publish Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Visibility</span>
                  <Select defaultValue="public">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Comments</span>
                  <Select defaultValue="enabled">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
