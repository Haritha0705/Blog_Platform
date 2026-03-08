import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ApolloWrapper } from '@/lib/apollo-client';
import "./globals.css";

export const metadata: Metadata = {
  title: "BlogPlatform - Modern Blog",
  description: "A modern platform for writers and readers. Share your stories with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <ApolloWrapper>
            <AppRouterCacheProvider>
              {children}
            </AppRouterCacheProvider>
          </ApolloWrapper>
      </body>
    </html>
  );
}
