import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "post-1",
      title: "Welcome to the platform",
      content: "This sample post demonstrates centralized state management with Redux Toolkit.",
      category: "Announcement",
      liked: false,
      createdAt: "2026-10-26T10:00:00.000Z"
    },
    {
      id: "post-2",
      title: "Learning React and Redux",
      content: "Redux Toolkit makes shared application state easier to organize and update.",
      category: "Technology",
      liked: true,
      createdAt: "2026-10-26T11:00:00.000Z"
    }
  ],
  status: "idle"
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ title, content, category }) {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            content: content.trim(),
            category,
            liked: false,
            createdAt: new Date().toISOString()
          }
        };
      }
    },
    deletePost(state, action) {
      state.items = state.items.filter(post => post.id !== action.payload);
    },
    toggleLike(state, action) {
      const post = state.items.find(item => item.id === action.payload);
      if (post) post.liked = !post.liked;
    },
    updatePost(state, action) {
      const { id, title, content, category } = action.payload;
      const post = state.items.find(item => item.id === id);
      if (post) {
        post.title = title.trim();
        post.content = content.trim();
        post.category = category;
      }
    },
    clearPosts(state) {
      state.items = [];
    }
  }
});

export const { addPost, deletePost, toggleLike, updatePost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
