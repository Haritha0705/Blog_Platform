'use client';

import { Box, Stack, Typography, Link, IconButton, Divider, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Twitter as TwitterIcon,
  GitHub as GithubIcon,
  LinkedIn as LinkedinIcon,
  MailOutline as MailIcon,
} from '@mui/icons-material';

const MotionBox = motion(Box);

export function Footer() {
  const socialLinks = [
    { icon: <TwitterIcon fontSize="small" />, label: 'Twitter', href: '#' },
    { icon: <GithubIcon fontSize="small" />, label: 'GitHub', href: '#' },
    { icon: <LinkedinIcon fontSize="small" />, label: 'LinkedIn', href: '#' },
    { icon: <MailIcon fontSize="small" />, label: 'Email', href: '#' },
  ];

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Use Cases', 'FAQ'],
    Resources: ['Blog', 'Documentation', 'Help Center', 'Community'],
    Company: ['About', 'Careers', 'Privacy', 'Terms'],
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#FAFBFC',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 5 },
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, md: 4 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 5, md: 8 }}>
          {/* Brand */}
          <Stack spacing={2.5} flex={1.2}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '10px',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: 18,
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                }}
              >
                B
              </Box>
              <Typography fontWeight={700} fontSize="1.15rem" letterSpacing="-0.02em">
                BlogPlatform
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, lineHeight: 1.7 }}>
              A modern platform for writers and readers. Share your stories, grow your audience, and connect with a community of creators.
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {socialLinks.map((link) => (
                <MotionBox key={link.label} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    component="a"
                    href={link.href}
                    aria-label={link.label}
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      bgcolor: (theme) => alpha(theme.palette.action.hover, 0.06),
                      borderRadius: '10px',
                      width: 36,
                      height: 36,
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    {link.icon}
                  </IconButton>
                </MotionBox>
              ))}
            </Stack>
          </Stack>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <Stack key={section} spacing={2} flex={1}>
              <Typography
                variant="overline"
                fontWeight={700}
                letterSpacing="0.08em"
                color="text.primary"
                sx={{ fontSize: '0.7rem' }}
              >
                {section}
              </Typography>
              <Stack spacing={1}>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="none"
                    color="text.secondary"
                    sx={{
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateX(2px)',
                      },
                      transition: 'all 0.2s',
                      display: 'inline-block',
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: (theme) => alpha(theme.palette.divider, 0.6) }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ sm: 'center' }}
          spacing={1}
        >
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} BlogPlatform. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#" underline="none" color="text.secondary" sx={{ fontSize: '0.75rem', '&:hover': { color: 'primary.main' } }}>
              Privacy Policy
            </Link>
            <Link href="#" underline="none" color="text.secondary" sx={{ fontSize: '0.75rem', '&:hover': { color: 'primary.main' } }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
