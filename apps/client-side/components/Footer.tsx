'use client';

import * as React from 'react';
import { Box, Stack, Typography, Link, Avatar, IconButton, Divider } from '@mui/material';
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
    { icon: <TwitterIcon />, label: 'Twitter', href: '#' },
    { icon: <GithubIcon />, label: 'GitHub', href: '#' },
    { icon: <LinkedinIcon />, label: 'LinkedIn', href: '#' },
    { icon: <MailIcon />, label: 'Email', href: '#' },
  ];

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Use Cases', 'FAQ'],
    Resources: ['Blog', 'Documentation', 'Help Center', 'Community'],
    Company: ['About', 'Careers', 'Privacy', 'Terms'],
  };

  return (
      <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider', mt: 'auto', py: 8 }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={8}>

            {/* Brand */}
            <Stack spacing={2} flex={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  <Typography fontWeight={700} color="common.white">B</Typography>
                </Avatar>
                <Typography fontWeight={600} variant="h6">
                  BlogPlatform
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                A modern platform for writers and readers. Share your stories with the world.
              </Typography>
              <Stack direction="row" spacing={1}>
                {socialLinks.map((link) => (
                    <MotionBox
                        key={link.label}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      <IconButton
                          component="a"
                          href={link.href}
                          aria-label={link.label}
                          size="small"
                          sx={{ color: 'text.secondary' }}
                      >
                        {link.icon}
                      </IconButton>
                    </MotionBox>
                ))}
              </Stack>
            </Stack>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
                <Stack key={section} spacing={1} flex={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {section}
                  </Typography>
                  <Stack spacing={0.5}>
                    {links.map((link) => (
                        <Link
                            key={link}
                            href="#"
                            underline="hover"
                            color="text.secondary"
                            sx={{ '&:hover': { color: 'primary.main' } }}
                            variant="body2"
                        >
                          {link}
                        </Link>
                    ))}
                  </Stack>
                </Stack>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Typography variant="caption" color="text.secondary" textAlign="center">
            &copy; {new Date().getFullYear()} BlogPlatform. All rights reserved.
          </Typography>
        </Box>
      </Box>
  );
}
