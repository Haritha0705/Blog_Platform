'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  Chip,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';

import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  FormatQuote,
  Visibility,
  Save,
  Send,
  Close,
} from '@mui/icons-material';
import {useEffect, useState, useMemo, useRef} from "react";
import { useMutation } from '@apollo/client/react';
import { CREATE_POST } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { uploadImage } from '@/lib/upload';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface EditorPageProps {
  setCurrentPage: (page: string) => void;
}

export function EditorPage({ setCurrentPage }: EditorPageProps) {
  const { user } = useAuth();
  const [createPost, { loading: publishing }] = useMutation<AnyData>(CREATE_POST);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    setUploadingImage(true);
    try {
      const result = await uploadImage(file, 'thumbnails');
      setThumbnail(result.url);
      toast.success('Thumbnail uploaded!');
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const wordCount = useMemo(() => {
    return content.trim().split(/\s+/).filter(Boolean).length;
  }, [content]);

  const autoSlug = useMemo(() => {
    if (!title) return '';
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }, [title]);

  useEffect(() => {
    setSlug(autoSlug);
  }, [autoSlug]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    if (!user) {
      toast.error('You must be logged in');
      return;
    }
    try {
      await createPost({
        variables: {
          createPostInput: {
            title,
            content,
            slug: slug || undefined,
            thumbnail: thumbnail || undefined,
            published: false,
            authorId: user.id,
            tags: tags.length > 0 ? tags : undefined,
          },
        },
      });
      setLastSaved(new Date());
      toast.success('Draft saved!');
    } catch {
      toast.error('Failed to save draft');
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    if (!user) {
      toast.error('You must be logged in');
      return;
    }
    try {
      await createPost({
        variables: {
          createPostInput: {
            title,
            content,
            slug: slug || undefined,
            thumbnail: thumbnail || undefined,
            published: true,
            authorId: user.id,
            tags: tags.length > 0 ? tags : undefined,
          },
        },
      });
      toast.success('Post published!');
      setCurrentPage('my-posts');
    } catch {
      toast.error('Failed to publish post');
    }
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

  const toolbarIcons = [
    { icon: <FormatBold />, label: 'Bold' },
    { icon: <FormatItalic />, label: 'Italic' },
    { icon: <FormatListBulleted />, label: 'Bullet List' },
    { icon: <FormatListNumbered />, label: 'Numbered List' },
    { icon: <LinkIcon />, label: 'Link' },
    { icon: <ImageIcon />, label: 'Image' },
    { icon: <Code />, label: 'Code' },
    { icon: <FormatQuote />, label: 'Quote' },
  ];

  return (
      <Box minHeight="100vh" sx={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
        {/* ================= TOP BAR ================= */}
        <Box
          position="sticky"
          top={0}
          zIndex={10}
          sx={{
            bgcolor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent="space-between" alignItems="center" height={60}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setCurrentPage('dashboard')}
                  sx={{ textTransform: 'none', fontWeight: 500, borderRadius: '10px' }}
                >
                  ← Back
                </Button>
                {lastSaved && (
                    <Typography variant="caption" color="text.disabled">
                      Saved {lastSaved.toLocaleTimeString()}
                    </Typography>
                )}
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, borderColor: 'divider' }}
                >
                  Save Draft
                </Button>
                <Button size="small" variant="outlined" startIcon={<Visibility />} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, borderColor: 'divider' }}>
                  Preview
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Send />}
                  onClick={handlePublish}
                  disabled={publishing}
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5558E8 0%, #7C4FE0 100%)',
                      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                    },
                  }}
                >
                  {publishing ? 'Publishing...' : 'Publish'}
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* ================= MAIN ================= */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="grid" gridTemplateColumns={{ lg: '2fr 1fr' }} gap={4}>
            {/* -------- Editor -------- */}
            <Box>
              <Stack spacing={3}>
                {/* Title */}
                <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <CardContent sx={{ p: 3 }}>
                    <TextField
                        fullWidth
                        placeholder="Post Title"
                        variant="standard"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        slotProps={{
                          input: {
                            disableUnderline: true,
                            sx: { fontSize: 32, fontWeight: 'bold' },
                          },
                        }}
                    />
                  </CardContent>
                </Card>

                {/* Content */}
                <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  {/* Toolbar */}
                  <Stack direction="row" spacing={1} alignItems="center" p={1} borderBottom={1} borderColor="divider">
                    <Select size="small" defaultValue="paragraph">
                      <MenuItem value="paragraph">Paragraph</MenuItem>
                      <MenuItem value="h1">Heading 1</MenuItem>
                      <MenuItem value="h2">Heading 2</MenuItem>
                      <MenuItem value="h3">Heading 3</MenuItem>
                    </Select>

                    <Divider orientation="vertical" flexItem />

                    {toolbarIcons.map((t) => (
                        <IconButton key={t.label} size="small" title={t.label}>
                          {t.icon}
                        </IconButton>
                    ))}
                  </Stack>

                  {/* Editor Area */}
                  <CardContent>
                    <TextField
                        fullWidth
                        multiline
                        minRows={20}
                        placeholder="Write your article here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        variant="standard"
                        slotProps={{ input: { disableUnderline: true } }}
                    />
                  </CardContent>
                </Card>

                <Typography variant="caption" textAlign="right" color="text.secondary">
                  {wordCount} words • {Math.ceil(wordCount / 200)} min read
                </Typography>
              </Stack>
            </Box>

            {/* -------- Settings -------- */}
            <Stack spacing={3}>
              {/* Featured Image */}
              <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography fontWeight={700} mb={2} fontSize="0.95rem">
                    Featured Image
                  </Typography>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    style={{ display: 'none' }}
                    onChange={handleThumbnailUpload}
                  />
                  {thumbnail ? (
                    <Box position="relative" borderRadius={2} overflow="hidden">
                      <Box
                        component="img"
                        src={thumbnail}
                        alt="Thumbnail"
                        sx={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2 }}
                      />
                      <Stack direction="row" spacing={1} mt={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          fullWidth
                          onClick={() => fileInputRef.current?.click()}
                          sx={{ textTransform: 'none', borderRadius: '8px', fontSize: '0.75rem' }}
                        >
                          Change
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          fullWidth
                          onClick={() => setThumbnail('')}
                          sx={{ textTransform: 'none', borderRadius: '8px', fontSize: '0.75rem' }}
                        >
                          Remove
                        </Button>
                      </Stack>
                    </Box>
                  ) : (
                    <Box
                      border="2px dashed"
                      borderColor="divider"
                      borderRadius={2}
                      p={4}
                      textAlign="center"
                      sx={{ cursor: 'pointer', '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(99,102,241,0.02)' }, transition: 'all 0.2s' }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploadingImage ? (
                        <>
                          <Typography variant="body2" color="primary.main" fontWeight={600}>
                            Uploading...
                          </Typography>
                        </>
                      ) : (
                        <>
                          <ImageIcon color="disabled" fontSize="large" />
                          <Typography variant="body2" color="text.secondary">
                            Click to upload image
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            JPEG, PNG, GIF, WebP • Max 5MB
                          </Typography>
                        </>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Category */}
              <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography fontWeight={700} mb={2} fontSize="0.95rem">
                    Category
                  </Typography>
                  <Select fullWidth value={category} onChange={(e) => setCategory(e.target.value)}>
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="development">Development</MenuItem>
                    <MenuItem value="design">Design</MenuItem>
                    <MenuItem value="writing">Writing</MenuItem>
                    <MenuItem value="performance">Performance</MenuItem>
                  </Select>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography fontWeight={700} mb={2} fontSize="0.95rem">
                    Tags
                  </Typography>
                  <TextField
                      fullWidth
                      placeholder="Add tags (press Enter)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      size="small"
                  />
                  <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                    {tags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            onDelete={() => setTags(tags.filter((t) => t !== tag))}
                            deleteIcon={<Close />}
                        />
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* SEO */}
              <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography fontWeight={700} mb={2} fontSize="0.95rem">
                    SEO Settings
                  </Typography>
                  <Stack spacing={2}>
                    <TextField label="URL Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                    <TextField
                        label="Excerpt"
                        multiline
                        maxRows={4}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        helperText={`${excerpt.length}/160`}
                        slotProps={{ htmlInput: { maxLength: 160 } }}
                    />
                  </Stack>
                </CardContent>
              </Card>

              {/* Publish Settings */}
              <Card sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography fontWeight={700} mb={2} fontSize="0.95rem">
                    Publish Settings
                  </Typography>
                  <Stack spacing={2}>
                    <Select defaultValue="public">
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                      <MenuItem value="unlisted">Unlisted</MenuItem>
                    </Select>
                    <Select defaultValue="enabled">
                      <MenuItem value="enabled">Comments Enabled</MenuItem>
                      <MenuItem value="disabled">Comments Disabled</MenuItem>
                    </Select>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Container>
      </Box>
  );
}
