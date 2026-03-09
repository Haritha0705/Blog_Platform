<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/GraphQL-API-E10098?logo=graphql&logoColor=white" alt="GraphQL" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/AWS_S3-Upload-FF9900?logo=amazons3&logoColor=white" alt="AWS S3" />
  <img src="https://img.shields.io/badge/Turborepo-Monorepo-0F172A?logo=turborepo&logoColor=white" alt="Turborepo" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

# BlogPlatform

A production-grade, full-stack blogging platform built with a modern monorepo architecture. Designed for writers and readers — publish articles, engage with content through likes, comments, and bookmarks, follow authors, and manage your profile — all powered by a performant GraphQL API and a server-rendered React frontend.

> **Monorepo** managed by [Turborepo](https://turbo.build/) · **Frontend**: Next.js 16 (App Router) · **Backend**: NestJS 11 + Apollo GraphQL · **Database**: PostgreSQL (Neon) via Prisma ORM · **Storage**: AWS S3

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [GraphQL API Reference](#graphql-api-reference)
- [File Upload (S3)](#file-upload-s3)
- [Authentication Flow](#authentication-flow)
- [Scripts Reference](#scripts-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Turborepo Monorepo                       │
├────────────────────────────┬────────────────────────────────────┤
│        client-side         │           server-side              │
│     (Next.js 16 App)       │        (NestJS 11 API)            │
│                            │                                    │
│  ┌──────────────────────┐  │  ┌──────────────────────────────┐ │
│  │  React 19 + MUI 7    │  │  │  Apollo Server (GraphQL)     │ │
│  │  Apollo Client       │──┼──│  REST Endpoints (/upload)    │ │
│  │  Framer Motion       │  │  │  JWT Auth (Passport)         │ │
│  │  Tailwind CSS 4      │  │  │  Prisma ORM 7                │ │
│  └──────────────────────┘  │  └──────────┬───────────────────┘ │
│                            │             │                      │
│                            │  ┌──────────▼───────────────────┐ │
│                            │  │  PostgreSQL (Neon Serverless) │ │
│                            │  └──────────────────────────────┘ │
│                            │  ┌──────────────────────────────┐ │
│                            │  │  AWS S3 (Image Storage)      │ │
│                            │  └──────────────────────────────┘ │
└────────────────────────────┴────────────────────────────────────┘
```

---

## Tech Stack

### Frontend (`apps/client-side`)

| Technology         | Purpose                              |
|--------------------|--------------------------------------|
| **Next.js 16**     | React framework (App Router, SSR)    |
| **React 19**       | UI library                           |
| **TypeScript 5**   | Type safety                          |
| **Apollo Client**  | GraphQL state management & queries   |
| **MUI 7**          | Component library (Material Design)  |
| **Tailwind CSS 4** | Utility-first styling                |
| **Framer Motion**  | Animations & transitions             |
| **Recharts**       | Data visualization (dashboard)       |
| **Sonner**         | Toast notifications                  |
| **Radix UI**       | Headless accessible primitives       |

### Backend (`apps/server-side`)

| Technology              | Purpose                              |
|-------------------------|--------------------------------------|
| **NestJS 11**           | Progressive Node.js framework        |
| **Apollo Server 4**     | GraphQL server                       |
| **Prisma 7**            | Type-safe ORM & migrations           |
| **PostgreSQL (Neon)**   | Serverless relational database       |
| **Passport + JWT**      | Authentication strategy              |
| **Argon2**              | Password hashing                     |
| **AWS S3 SDK v3**       | Cloud image storage                  |
| **Multer**              | Multipart file upload handling       |
| **class-validator**     | DTO validation                       |

### DevOps & Tooling

| Technology       | Purpose                              |
|------------------|--------------------------------------|
| **Turborepo**    | Monorepo build orchestration         |
| **ESLint 9**     | Linting                              |
| **Prettier**     | Code formatting                      |
| **Jest 30**      | Unit & E2E testing                   |
| **npm Workspaces** | Dependency management              |

---

## Features

### Content Management
- **Rich Post Editor** — Create, edit, and publish articles with title, content, tags, categories, and SEO metadata (slug, excerpt)
- **Image Uploads** — Thumbnail and featured image upload to AWS S3 with drag-and-drop UI
- **Tagging System** — Organize posts with tags; filter and discover content by tag
- **Draft & Publish Workflow** — Save drafts before publishing; manage post visibility (public, private, unlisted)
- **Full-Text Search** — Search posts by title and content

### Social & Engagement
- **Likes** — Toggle likes on posts (unique per user per post)
- **Threaded Comments** — Nested comment replies with parent-child relationships
- **Bookmarks** — Save posts for later reading
- **Follow System** — Follow and unfollow authors; follower and following counts

### User Management
- **JWT Authentication** — Secure register and login with Argon2 password hashing
- **User Profiles** — Editable name, bio, avatar; author profile pages
- **Settings Dashboard** — Profile, account, notification, and security settings panels

### Platform
- **Dashboard** — Analytics overview with post stats, views, and engagement metrics
- **Responsive Design** — Mobile-first UI with MUI and Tailwind
- **Turbopack Dev** — Blazing-fast HMR in development
- **Modern UI/UX** — Gradient accents, glassmorphism, smooth animations

---

## Project Structure

```
Blog_Platform/
├── turbo.json                      # Turborepo pipeline configuration
├── package.json                    # Root workspace config
├── LICENSE                         # MIT License
│
├── apps/
│   ├── client-side/                # ── Next.js 16 Frontend ──
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout (Apollo + MUI providers)
│   │   │   ├── page.tsx            # Entry page
│   │   │   └── globals.css         # Global styles (Tailwind)
│   │   ├── components/
│   │   │   ├── Header.tsx          # App header / navigation
│   │   │   ├── Footer.tsx          # App footer
│   │   │   ├── pages/
│   │   │   │   ├── HomePage.tsx         # Landing / feed
│   │   │   │   ├── LoginPage.tsx        # Auth (login/register)
│   │   │   │   ├── DashboardPage.tsx    # User dashboard & stats
│   │   │   │   ├── EditorPage.tsx       # Post editor (create/edit)
│   │   │   │   ├── SinglePostPage.tsx   # Full post view
│   │   │   │   ├── BlogListingPage.tsx  # Browse all posts
│   │   │   │   ├── MyPostsPage.tsx      # User's own posts
│   │   │   │   ├── BookmarksPage.tsx    # Saved bookmarks
│   │   │   │   ├── AuthorPage.tsx       # Author profile
│   │   │   │   ├── SearchResultsPage.tsx # Search results
│   │   │   │   └── SettingsPage.tsx     # User settings
│   │   │   └── ui/                 # Reusable UI primitives
│   │   ├── lib/
│   │   │   ├── apollo-client.tsx   # Apollo Client setup (auth link)
│   │   │   ├── auth-context.tsx    # React auth context provider
│   │   │   ├── upload.ts           # S3 upload client helper
│   │   │   └── graphql/
│   │   │       └── operations.ts   # All GraphQL queries & mutations
│   │   └── data/
│   │       └── content.tsx         # Static/mock content
│   │
│   └── server-side/                # ── NestJS 11 Backend ──
│       ├── src/
│       │   ├── main.ts             # Bootstrap (CORS, validation, prefix)
│       │   ├── app.module.ts       # Root module (imports all features)
│       │   ├── config/
│       │   │   └── prisma/         # Prisma service & module
│       │   ├── graphql/
│       │   │   └── schema.gql      # Auto-generated GraphQL schema
│       │   └── modules/
│       │       ├── auth/           # Login, register, JWT strategy
│       │       ├── post/           # CRUD, search, filter
│       │       ├── user/           # Profile management
│       │       ├── comment/        # Threaded comments
│       │       ├── like/           # Toggle likes
│       │       ├── bookmark/       # Toggle bookmarks
│       │       ├── follow/         # Follow/unfollow
│       │       ├── tag/            # Tag management
│       │       └── upload/         # S3 file upload (REST)
│       ├── prisma/
│       │   ├── schema.prisma       # Data models
│       │   └── migrations/         # Migration history
│       ├── generated/prisma/       # Generated Prisma client
│       └── test/                   # E2E test setup
```

---

## Prerequisites

| Requirement         | Version      |
|---------------------|--------------|
| **Node.js**         | >= 18.x      |
| **npm**             | >= 10.x      |
| **PostgreSQL**      | 15+ (or Neon)|
| **AWS Account**     | S3 access    |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Blog_Platform.git
cd Blog_Platform
```

### 2. Install Dependencies

```bash
npm install
```

This installs dependencies for the root workspace and both `apps/client-side` and `apps/server-side`.

### 3. Configure Environment Variables

```bash
cp apps/server-side/.env.example apps/server-side/.env
```

Edit `apps/server-side/.env` with your credentials (see [Environment Variables](#environment-variables)).

### 4. Run Database Migrations

```bash
cd apps/server-side
npx prisma migrate deploy
npx prisma generate
```

### 5. Start Development

```bash
# From the root directory
npm run dev
```

This starts both services concurrently via Turborepo:

| Service        | URL                                  |
|----------------|--------------------------------------|
| Frontend       | http://localhost:3000                 |
| Backend API    | http://localhost:8000/api/v1          |
| GraphQL        | http://localhost:8000/graphql         |
| GQL Playground | http://localhost:8000/graphql         |

---

## Environment Variables

Create a `.env` file in `apps/server-side/`:

```env
# ── Database ──
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# ── Authentication ──
JWT_SECRET="your-secure-random-jwt-secret-key"

# ── AWS S3 (Image Uploads) ──
AWS_REGION="ap-south-1"
AWS_S3_BUCKET="your-s3-bucket-name"
AWS_ACCESS_KEY_ID="AKIAXXXXXXXXXXXXXXXX"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"

# ── Server ──
PORT=8000
```

> **Security Note:** Never commit `.env` files. The `.env` file is included in `.gitignore`. Rotate secrets regularly in production.

---

## Database Setup

### Schema Overview (Prisma)

```
User ──< Post ──< Comment (self-referencing for replies)
 │        │ ╲
 │        │   ──< Like (unique per user+post)
 │        │   ──< Bookmark (unique per user+post)
 │        └──<>── Tag (many-to-many via PostTags)
 │
 └──< Follow (self-referencing: follower ↔ following)
```

### Models

| Model       | Description                                              |
|-------------|----------------------------------------------------------|
| `User`      | Accounts with name, email, bio, avatar, password (hashed)|
| `Post`      | Articles with title, content, slug, thumbnail, tags      |
| `Comment`   | Threaded comments (supports nested replies via `parentId`)|
| `Tag`       | Post categorization labels (many-to-many)                |
| `Like`      | User-Post likes (unique constraint)                      |
| `Bookmark`  | User-Post bookmarks (unique constraint)                  |
| `Follow`    | User-User follow relationships (unique constraint)       |

### Migration Commands

```bash
cd apps/server-side

# Create a new migration after schema changes
npx prisma migrate dev --name <migration_name>

# Apply migrations to production
npx prisma migrate deploy

# Regenerate Prisma client
npx prisma generate

# Open Prisma Studio (visual DB browser)
npx prisma studio
```

---

## GraphQL API Reference

The API is available at `http://localhost:8000/graphql` with an interactive **Apollo Sandbox / Playground** enabled in development.

### Queries

| Query                          | Description                        | Auth Required |
|--------------------------------|------------------------------------|:------------:|
| `posts`                        | Fetch all published posts          | No           |
| `filteredPosts`                | Filter by tag, sort, paginate      | No           |
| `post(id)`                     | Get single post by ID              | No           |
| `postBySlug(slug)`             | Get single post by URL slug        | No           |
| `postsByAuthor(id)`            | Get all posts by an author         | No           |
| `searchPosts(query)`           | Full-text search across posts      | No           |
| `users`                        | List all users                     | No           |
| `user(id)`                     | Get user profile                   | No           |
| `me(userId)`                   | Get authenticated user profile     | Yes          |
| `commentsByPost(id)`           | Get threaded comments for a post   | No           |
| `tags`                         | List all tags                      | No           |
| `isLiked(userId, postId)`      | Check if user liked a post         | Yes          |
| `isBookmarked(userId, postId)` | Check if user bookmarked a post    | Yes          |
| `bookmarksByUser(id)`          | Get user's bookmarked posts        | Yes          |
| `isFollowing(a, b)`            | Check follow relationship          | Yes          |
| `followers(userId)`            | Get user's followers               | No           |
| `following(userId)`            | Get user's following list          | No           |

### Mutations

| Mutation               | Description                          | Auth Required |
|------------------------|--------------------------------------|:------------:|
| `register`             | Create new account                   | No           |
| `login`                | Authenticate and receive JWT         | No           |
| `createPost`           | Create a new post (draft/published)  | Yes          |
| `updatePost`           | Edit existing post                   | Yes          |
| `removePost`           | Delete a post                        | Yes          |
| `updateUser`           | Update profile (name, bio, avatar)   | Yes          |
| `createComment`        | Add a comment (supports replies)     | Yes          |
| `updateComment`        | Edit a comment                       | Yes          |
| `removeComment`        | Delete a comment                     | Yes          |
| `toggleLike`           | Like or unlike a post                | Yes          |
| `toggleBookmark`       | Bookmark or unbookmark a post        | Yes          |
| `toggleFollow`         | Follow or unfollow an author         | Yes          |
| `createTag`            | Create a new tag                     | Yes          |

### Example Query

```graphql
query GetFilteredPosts {
  filteredPosts(tag: "javascript", sortBy: "latest", limit: 10, offset: 0) {
    id
    title
    slug
    thumbnail
    views
    likesCount
    commentsCount
    createdAt
    author {
      name
      avatar
    }
    tags {
      name
    }
  }
}
```

---

## File Upload (S3)

Image uploads use a **REST endpoint** (not GraphQL) for multipart form-data handling.

### Endpoint

```
POST /api/v1/upload?folder=<folder_name>
```

### Configuration

| Parameter           | Description                                             |
|---------------------|---------------------------------------------------------|
| **Max file size**   | 5 MB                                                   |
| **Allowed types**   | `image/jpeg`, `image/png`, `image/gif`, `image/webp`   |
| **Storage**         | AWS S3 (memory buffer to S3 upload)                     |
| **Key format**      | `{folder}/{uuid}.{ext}`                                |

### Request

```bash
curl -X POST "http://localhost:8000/api/v1/upload?folder=thumbnails" \
  -H "Authorization: Bearer <jwt_token>" \
  -F "file=@/path/to/image.jpg"
```

### Response

```json
{
  "success": true,
  "url": "https://your-bucket.s3.ap-south-1.amazonaws.com/thumbnails/abc-123.jpg",
  "key": "thumbnails/abc-123.jpg"
}
```

### S3 Bucket Setup

1. Create an S3 bucket in your AWS console.
2. Configure a **Bucket Policy** for public read access (since ACLs are not used):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```
3. Create an IAM user with `s3:PutObject`, `s3:GetObject`, and `s3:DeleteObject` permissions.
4. Add the credentials to your `.env` file.

---

## Authentication Flow

```
┌──────────┐     Register/Login      ┌───────────┐
│  Client   │ ──────────────────────► │  Server   │
│ (Next.js) │                         │ (NestJS)  │
│           │ ◄────────────────────── │           │
│           │   { accessToken, user } │           │
│           │                         │           │
│  Store token in localStorage        │           │
│  Set Authorization header           │           │
│           │                         │           │
│           │   GraphQL + Bearer JWT  │           │
│           │ ──────────────────────► │  Verify   │
│           │                         │  via      │
│           │ ◄────────────────────── │  Passport │
│           │   Protected data        │           │
└──────────┘                         └───────────┘
```

- **Hashing:** Argon2 (winner of the Password Hashing Competition)
- **Token:** JWT signed with `JWT_SECRET`, includes `sub` (user ID) and `email`
- **Client storage:** `localStorage` (`blog_token`, `blog_user_id`)
- **Auto-restore:** Session restored on page reload via `GET_ME` query

---

## Scripts Reference

### Root (Turborepo)

| Script          | Command            | Description                        |
|-----------------|--------------------|------------------------------------|
| `npm run dev`   | `turbo run dev`    | Start all apps in development      |
| `npm run build` | `turbo run build`  | Build all apps for production      |
| `npm run lint`  | `turbo run lint`   | Lint all apps                      |

### Frontend (`apps/client-side`)

| Script          | Command               | Description                    |
|-----------------|------------------------|--------------------------------|
| `npm run dev`   | `next dev --turbopack` | Dev server with Turbopack HMR  |
| `npm run build` | `next build`           | Production build               |
| `npm run start` | `next start`           | Start production server        |
| `npm run lint`  | `eslint`               | Run ESLint                     |

### Backend (`apps/server-side`)

| Script               | Command                      | Description                    |
|----------------------|------------------------------|--------------------------------|
| `npm run dev`        | `nest start --watch`         | Dev server with file watching  |
| `npm run build`      | `nest build`                 | Compile TypeScript             |
| `npm run start`      | `nest start`                 | Start server                   |
| `npm run start:prod` | `node dist/main`             | Start production build         |
| `npm run start:debug`| `nest start --debug --watch` | Debug mode with watch          |
| `npm run format`     | `prettier --write ...`       | Format all source files        |
| `npm run lint`       | `eslint --fix`               | Lint and auto-fix              |
| `npm run test`       | `jest`                       | Run unit tests                 |
| `npm run test:watch` | `jest --watch`               | Run tests in watch mode        |
| `npm run test:cov`   | `jest --coverage`            | Run tests with coverage report |
| `npm run test:e2e`   | `jest --config ./test/...`   | Run end-to-end tests           |

---

## Testing

### Backend (Jest)

```bash
cd apps/server-side

# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

### GraphQL Playground

Navigate to `http://localhost:8000/graphql` in your browser to test queries and mutations interactively with the built-in Apollo Sandbox.

---

## Deployment

### Frontend (Vercel)

```bash
# Vercel auto-detects Next.js in the monorepo
# Set the root directory to apps/client-side
vercel --cwd apps/client-side
```

Set the environment variable:
```
NEXT_PUBLIC_API_BASE=https://your-api-domain.com/api/v1
```

### Backend (Railway / Render / AWS)

```bash
cd apps/server-side
npm run build
npm run start:prod
```

Required environment variables on the server:
- `DATABASE_URL`
- `JWT_SECRET`
- `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- `PORT`

### Database (Neon)

The project uses [Neon](https://neon.tech/) serverless PostgreSQL with the `@prisma/adapter-pg` driver adapter. No additional database server setup is required — provision a Neon project and use the connection string.

---

## Contributing

Contributions are welcome. Please follow these steps:

1. **Fork** the repository.
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** changes with clear messages:
   ```bash
   git commit -m "feat: add bookmark export functionality"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request against `main`.

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix     | Usage                            |
|------------|----------------------------------|
| `feat:`    | New feature                      |
| `fix:`     | Bug fix                          |
| `docs:`    | Documentation changes            |
| `style:`   | Formatting (no code change)      |
| `refactor:`| Code refactoring                 |
| `test:`    | Adding or updating tests         |
| `chore:`   | Maintenance tasks                |

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

```
MIT License · Copyright (c) 2025 Haritha Wickremesinghe
```

---

<p align="center">
  Built with Next.js, NestJS, GraphQL, and PostgreSQL
</p>
