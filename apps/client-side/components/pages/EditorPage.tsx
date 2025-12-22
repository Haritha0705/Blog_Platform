'use client';

import React from 'react';
import { motion } from 'framer-motion';
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

interface EditorPageProps {
  setCurrentPage: (page: string) => void;
}

const MotionCard = motion(Card);

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
    const words = content.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  }, [content]);

  React.useEffect(() => {
    if (title) {
      setSlug(
          title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
      );
    }
  }, [title]);

  const handleSave = () => setLastSaved(new Date());
  const handlePublish = () => setCurrentPage('dashboard');

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
      <Box minHeight="100vh" bgcolor="grey.100">
        {/* ================= TOP BAR ================= */}
        <Box position="sticky" top={0} zIndex={10} bgcolor="background.paper" borderBottom={1} borderColor="divider">
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent="space-between" alignItems="center" height={56}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="text" size="small" onClick={() => setCurrentPage('dashboard')}>
                  ← Back
                </Button>
                {lastSaved && (
                    <Typography variant="caption" color="text.secondary">
                      Saved {lastSaved.toLocaleTimeString()}
                    </Typography>
                )}
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button size="small" variant="outlined" startIcon={<Save />} onClick={handleSave}>
                  Save Draft
                </Button>
                <Button size="small" variant="outlined" startIcon={<Visibility />}>
                  Preview
                </Button>
                <Button size="small" variant="contained" startIcon={<Send />} onClick={handlePublish}>
                  Publish
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
                <Card>
                  <CardContent>
                    <TextField
                        fullWidth
                        placeholder="Post Title"
                        variant="standard"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputProps={{
                          disableUnderline: true,
                          sx: { fontSize: 32, fontWeight: 'bold' },
                        }}
                    />
                  </CardContent>
                </Card>

                {/* Content */}
                <Card>
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
                        InputProps={{ disableUnderline: true }}
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
              <Card>
                <CardContent>
                  <Typography fontWeight="bold" mb={2}>
                    Featured Image
                  </Typography>
                  <Box
                      border="2px dashed"
                      borderColor="divider"
                      borderRadius={2}
                      p={4}
                      textAlign="center"
                      sx={{ cursor: 'pointer' }}
                  >
                    <ImageIcon color="disabled" fontSize="large" />
                    <Typography variant="body2" color="text.secondary">
                      Click to upload image
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardContent>
                  <Typography fontWeight="bold" mb={2}>
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
              <Card>
                <CardContent>
                  <Typography fontWeight="bold" mb={2}>
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
              <Card>
                <CardContent>
                  <Typography fontWeight="bold" mb={2}>
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
                        inputProps={{ maxLength: 160 }}
                    />
                  </Stack>
                </CardContent>
              </Card>

              {/* Publish Settings */}
              <Card>
                <CardContent>
                  <Typography fontWeight="bold" mb={2}>
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
