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
      createdAt
    }
  }
`;

// ==================== POSTS ====================

export const GET_POSTS = gql`
  query GetPosts {
    posts {
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
      createdAt
      updatedAt
      author {
        id
        name
        email
        avatar
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
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
      createdAt
      updatedAt
      author {
        id
        name
        email
        bio
        avatar
      }
    }
  }
`;

export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($authorId: Int!) {
    postsByAuthor(authorId: $authorId) {
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
      createdAt
      updatedAt
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($query: String!) {
    searchPosts(query: $query) {
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
      createdAt
      updatedAt
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
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
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($updatePostInput: UpdatePostInput!) {
    updatePost(updatePostInput: $updatePostInput) {
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
      createdAt
      updatedAt
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

export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: Int!) {
    commentsByPost(postId: $postId) {
      id
      content
      authorId
      postId
      createdAt
      updatedAt
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
      content
      authorId
      postId
      createdAt
      author {
        id
        name
        avatar
      }
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
    }
  }
`;

