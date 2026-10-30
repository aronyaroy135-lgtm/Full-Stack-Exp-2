import { createSlice, nanoid } from "@reduxjs/toolkit";

const samplePosts = [
  { id: "p1", title: "Memoization in Redux", content: "Memoized selectors reuse calculated results when their inputs have not changed.", category: "Technology", liked: true, views: 125 },
  { id: "p2", title: "Efficient React Rendering", content: "Stable props and focused subscriptions help prevent unnecessary component updates.", category: "Education", liked: false, views: 87 },
  { id: "p3", title: "State Management Basics", content: "A predictable store keeps shared application data organized.", category: "Education", liked: true, views: 210 },
  { id: "p4", title: "Frontend Performance Tips", content: "Measure before optimizing, and avoid repeating expensive calculations.", category: "Technology", liked: false, views: 156 },
  { id: "p5", title: "A Personal Update", content: "Sharing a short update with the community.", category: "Personal", liked: false, views: 45 }
];

const postsSlice = createSlice({
  name: "posts",
  initialState: { items: samplePosts },
  reducers: {
    addPost: {
      reducer(state, action) { state.items.unshift(action.payload); },
      prepare({ title, content, category }) {
        return { payload: { id: nanoid(), title: title.trim(), content: content.trim(), category, liked: false, views: 0 } };
      }
    },
    toggleLike(state, action) {
      const post = state.items.find(item => item.id === action.payload);
      if (post) post.liked = !post.liked;
    },
    deletePost(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    incrementViews(state, action) {
      const post = state.items.find(item => item.id === action.payload);
      if (post) post.views += 1;
    },
    addSamplePosts(state, action) {
      const count = Math.min(Math.max(Number(action.payload) || 0, 0), 5000);
      for (let i = 0; i < count; i++) {
        const id = nanoid();
        state.items.push({
          id,
          title: `Performance sample post ${i + 1}`,
          content: `Generated sample content for selector performance testing. Item ${i + 1}.`,
          category: i % 3 === 0 ? "Technology" : i % 3 === 1 ? "Education" : "Personal",
          liked: i % 4 === 0,
          views: (i * 17) % 300
        });
      }
    },
    resetPosts() {
      return { items: samplePosts };
    }
  }
});

export const { addPost, toggleLike, deletePost, incrementViews, addSamplePosts, resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
