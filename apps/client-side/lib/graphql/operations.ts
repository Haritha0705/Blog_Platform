import { gql } from '@apollo/client';

// ==================== AUTH ====================

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      user {
        id
        name
        email
        bio
        avatar
        postsCount
        followersCount
        followingCount
        createdAt
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      accessToken
      user {
        id
        name
        email
        bio
        avatar
        postsCount
        followersCount
        followingCount
        createdAt
      }
    }
  }
`;

export const GET_ME = gql`
  query Me($userId: Int!) {
    me(userId: $userId) {
      id
      name
      email
      bio
      avatar
      postsCount
      followersCount
      followingCount
      createdAt
    }
  }
`;

// ==================== POSTS ====================

const POST_FIELDS = `
  id
  title
  slug
  content
  thumbnail
  views
  published
  authorId
  likesCount
  commentsCount
  bookmarksCount
  createdAt
  updatedAt
  tags {
    id
    name
  }
  author {
    id
    name
    email
    avatar
    bio
    postsCount
    followersCount
    followingCount
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      ${POST_FIELDS}
    }
  }
`;

export const GET_FILTERED_POSTS = gql`
  query GetFilteredPosts($tag: String, $sortBy: String, $limit: Int, $offset: Int) {
    filteredPosts(tag: $tag, sortBy: $sortBy, limit: $limit, offset: $offset) {
      ${POST_FIELDS}
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      ${POST_FIELDS}
    }
  }
`;

export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($authorId: Int!) {
    postsByAuthor(authorId: $authorId) {
      ${POST_FIELDS}
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($query: String!) {
    searchPosts(query: $query) {
      ${POST_FIELDS}
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      ${POST_FIELDS}
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($updatePostInput: UpdatePostInput!) {
    updatePost(updatePostInput: $updatePostInput) {
      ${POST_FIELDS}
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    removePost(id: $id) {
      id
    }
  }
`;

// ==================== COMMENTS ====================

const COMMENT_FIELDS = `
  id
  content
  authorId
  postId
  parentId
  createdAt
  updatedAt
  author {
    id
    name
    avatar
  }
  replies {
    id
    content
    authorId
    postId
    parentId
    createdAt
    updatedAt
    author {
      id
      name
      avatar
    }
    replies {
      id
      content
      authorId
      postId
      parentId
      createdAt
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: Int!) {
    commentsByPost(postId: $postId) {
      ${COMMENT_FIELDS}
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      ${COMMENT_FIELDS}
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: Int!) {
    removeComment(id: $id) {
      id
    }
  }
`;

// ==================== LIKES ====================

export const TOGGLE_LIKE = gql`
  mutation ToggleLike($createLikeInput: CreateLikeInput!) {
    toggleLike(createLikeInput: $createLikeInput) {
      id
      userId
      postId
    }
  }
`;

export const IS_LIKED = gql`
  query IsLiked($userId: Int!, $postId: Int!) {
    isLiked(userId: $userId, postId: $postId)
  }
`;

// ==================== BOOKMARKS ====================

export const TOGGLE_BOOKMARK = gql`
  mutation ToggleBookmark($input: CreateBookmarkInput!) {
    toggleBookmark(input: $input) {
      id
      userId
      postId
    }
  }
`;

export const IS_BOOKMARKED = gql`
  query IsBookmarked($userId: Int!, $postId: Int!) {
    isBookmarked(userId: $userId, postId: $postId)
  }
`;

export const GET_BOOKMARKS_BY_USER = gql`
  query GetBookmarksByUser($userId: Int!) {
    bookmarksByUser(userId: $userId) {
      id
      userId
      postId
      createdAt
      post {
        ${POST_FIELDS}
      }
    }
  }
`;

// ==================== FOLLOWS ====================

export const TOGGLE_FOLLOW = gql`
  mutation ToggleFollow($input: CreateFollowInput!) {
    toggleFollow(input: $input) {
      id
      followerId
      followingId
    }
  }
`;

export const IS_FOLLOWING = gql`
  query IsFollowing($followerId: Int!, $followingId: Int!) {
    isFollowing(followerId: $followerId, followingId: $followingId)
  }
`;

export const GET_FOLLOWERS = gql`
  query GetFollowers($userId: Int!) {
    followers(userId: $userId) {
      id
      followerId
      follower {
        id
        name
        avatar
        bio
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowing($userId: Int!) {
    following(userId: $userId) {
      id
      followingId
      following {
        id
        name
        avatar
        bio
      }
    }
  }
`;

export const GET_FOLLOWERS_COUNT = gql`
  query GetFollowersCount($userId: Int!) {
    followersCount(userId: $userId)
  }
`;

export const GET_FOLLOWING_COUNT = gql`
  query GetFollowingCount($userId: Int!) {
    followingCount(userId: $userId)
  }
`;

// ==================== TAGS ====================

export const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;

// ==================== USERS ====================

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      bio
      avatar
      postsCount
      followersCount
      followingCount
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      email
      bio
      avatar
      postsCount
      followersCount
      followingCount
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      email
      bio
      avatar
      postsCount
      followersCount
      followingCount
    }
  }
`;

