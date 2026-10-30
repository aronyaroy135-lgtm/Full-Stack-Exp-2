import { createSelector } from "@reduxjs/toolkit";

// Input selectors return stable references/primitives. The result function only
// recalculates when posts or the relevant filter values change.
const selectPostItems = state => state.posts.items;
const selectSearch = state => state.filters.search;
const selectCategory = state => state.filters.category;
const selectSortBy = state => state.filters.sortBy;
const selectLikedOnly = state => state.filters.likedOnly;

export const selectVisiblePosts = createSelector(
  [selectPostItems, selectSearch, selectCategory, selectSortBy, selectLikedOnly],
  (posts, search, category, sortBy, likedOnly) => {
    const query = search.trim().toLowerCase();
    const result = posts.filter(post => {
      const matchesSearch = !query || `${post.title} ${post.content} ${post.category}`.toLowerCase().includes(query);
      const matchesCategory = category === "All" || post.category === category;
      const matchesLiked = !likedOnly || post.liked;
      return matchesSearch && matchesCategory && matchesLiked;
    });

    result.sort((a, b) => {
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "likes") return Number(b.liked) - Number(a.liked) || a.title.localeCompare(b.title);
      return a.title.localeCompare(b.title);
    });
    return result;
  }
);

export const selectPostStats = createSelector(
  [selectPostItems],
  posts => ({
    total: posts.length,
    liked: posts.filter(post => post.liked).length,
    totalViews: posts.reduce((sum, post) => sum + post.views, 0)
  })
);
