import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost, toggleLike, deletePost, incrementViews, addSamplePosts, resetPosts
} from "./features/posts/postsSlice";
import {
  setSearch, setCategory, setSortBy, setLikedOnly, resetFilters
} from "./features/filters/filtersSlice";
import { selectPostStats, selectVisiblePosts } from "./features/posts/postsSelectors";

const categories = ["All", "Technology", "Education", "Personal"];

const PostCard = memo(function PostCard({ post, onLike, onDelete, onView }) {
  return (
    <article className="post-card">
      <div className="post-top">
        <span className="category">{post.category}</span>
        <span className="views">{post.views.toLocaleString()} views</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="card-footer">
        <button className={post.liked ? "like liked" : "like"} onClick={() => onLike(post.id)}>
          {post.liked ? "♥ Liked" : "♡ Like"}
        </button>
        <button className="quiet" onClick={() => onView(post.id)}>+1 view</button>
        <button className="delete" onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </article>
  );
});

export default function App() {
  const dispatch = useDispatch();
  const visiblePosts = useSelector(selectVisiblePosts);
  const stats = useSelector(selectPostStats);
  const search = useSelector(state => state.filters.search);
  const category = useSelector(state => state.filters.category);
  const sortBy = useSelector(state => state.filters.sortBy);
  const likedOnly = useSelector(state => state.filters.likedOnly);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newCategory, setNewCategory] = useState("Technology");
  const [sampleCount, setSampleCount] = useState("100");
  const [message, setMessage] = useState("");

  // useMemo keeps handler identities stable for memoized PostCard children.
  const handlers = useMemo(() => ({
    onLike: id => dispatch(toggleLike(id)),
    onDelete: id => {
      if (window.confirm("Delete this post?")) dispatch(deletePost(id));
    },
    onView: id => dispatch(incrementViews(id))
  }), [dispatch]);

  function submitPost(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage("Enter both a title and post content.");
      return;
    }
    dispatch(addPost({ title, content, category: newCategory }));
    setTitle("");
    setContent("");
    setMessage("Post added. The memoized selector will recalculate when its inputs change.");
  }

  function generateSamples() {
    const count = Number(sampleCount);
    if (!Number.isInteger(count) || count < 1 || count > 5000) {
      setMessage("Choose a sample count from 1 to 5000.");
      return;
    }
    dispatch(addSamplePosts(count));
    setMessage(`${count.toLocaleString()} sample posts added for performance testing.`);
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="logo">⚡</div>
        <div className="hero-copy">
          <p className="eyebrow">REDUX TOOLKIT · PERFORMANCE LAB</p>
          <h1>Memoized Selectors</h1>
          <p>Optimize state access and reduce unnecessary calculations and rendering.</p>
        </div>
        <span className="pill">Reselect + React.memo</span>
      </header>

      <main className="container">
        <section className="stats">
          <div className="stat"><span>Total posts</span><strong>{stats.total.toLocaleString()}</strong><small>Derived from Redux state</small></div>
          <div className="stat"><span>Liked posts</span><strong>{stats.liked.toLocaleString()}</strong><small>Memoized aggregate</small></div>
          <div className="stat"><span>Total views</span><strong>{stats.totalViews.toLocaleString()}</strong><small>Memoized aggregate</small></div>
          <div className="stat"><span>Visible results</span><strong>{visiblePosts.length.toLocaleString()}</strong><small>Filtered by selector</small></div>
        </section>

        <div className="main-grid">
          <aside className="left-column">
            <section className="panel">
              <div className="panel-title"><div><h2>Create a post</h2><p>New posts update the shared store.</p></div><span className="mini-icon">＋</span></div>
              <form onSubmit={submitPost}>
                <label htmlFor="title">Title</label>
                <input id="title" value={title} onChange={e => setTitle(e.target.value)} maxLength={100} placeholder="Post title" />
                <label htmlFor="content">Content</label>
                <textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows={4} maxLength={1200} placeholder="Write a short post..." />
                <label htmlFor="newCategory">Category</label>
                <select id="newCategory" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                  {categories.filter(item => item !== "All").map(item => <option key={item}>{item}</option>)}
                </select>
                <button className="primary full" type="submit">Add post to store</button>
                <p className="message" role="status">{message}</p>
              </form>
            </section>

            <section className="panel performance-panel">
              <div className="panel-title"><div><h2>Performance testing</h2><p>Generate data to test selector work.</p></div><span className="mini-icon">↗</span></div>
              <label htmlFor="sampleCount">Number of sample posts (1–5000)</label>
              <div className="inline-form">
                <input id="sampleCount" type="number" min="1" max="5000" value={sampleCount} onChange={e => setSampleCount(e.target.value)} />
                <button className="primary" type="button" onClick={generateSamples}>Generate</button>
              </div>
              <button className="secondary full" type="button" onClick={() => {
                if (window.confirm("Reset posts to the original sample data?")) {
                  dispatch(resetPosts());
                  dispatch(resetFilters());
                  setMessage("Posts and filters reset.");
                }
              }}>Reset demo data</button>
              <p className="hint">Try searching or sorting after generating more posts. This is a learning demo, not a formal benchmark.</p>
            </section>
          </aside>

          <section className="panel feed-panel">
            <div className="feed-heading"><div><h2>Post feed</h2><p>Rendered from a memoized selector.</p></div><span className="result-count">{visiblePosts.length} results</span></div>
            <div className="controls">
              <input className="search" aria-label="Search posts" placeholder="Search title, content, category..." value={search} onChange={e => dispatch(setSearch(e.target.value))} />
              <div className="control-row">
                <div className="category-filters" aria-label="Category filters">
                  {categories.map(item => <button key={item} className={category === item ? "filter active" : "filter"} onClick={() => dispatch(setCategory(item))}>{item}</button>)}
                </div>
                <select aria-label="Sort posts" value={sortBy} onChange={e => dispatch(setSortBy(e.target.value))}>
                  <option value="title">Sort: Title</option>
                  <option value="views">Sort: Most views</option>
                  <option value="likes">Sort: Liked first</option>
                </select>
              </div>
              <label className="check-row"><input type="checkbox" checked={likedOnly} onChange={e => dispatch(setLikedOnly(e.target.checked))} /> Show liked posts only</label>
            </div>
            <div className="post-list">
              {visiblePosts.map(post => <PostCard key={post.id} post={post} {...handlers} />)}
              {visiblePosts.length === 0 && <div className="empty"><span>⌕</span><h3>No matching posts</h3><p>Change the search or filter settings.</p></div>}
            </div>
          </section>
        </div>

        <section className="panel concept-panel">
          <h2>Optimization strategy</h2>
          <div className="concept-grid">
            <div><b>01</b><h3>createSelector</h3><p>Recomputes filtered and sorted posts only when its input selectors change.</p></div>
            <div><b>02</b><h3>Focused subscriptions</h3><p>Components select only the state values they need using useSelector.</p></div>
            <div><b>03</b><h3>React.memo</h3><p>PostCard can skip parent-driven rerenders when its props remain shallowly equal.</p></div>
            <div><b>04</b><h3>Stable callbacks</h3><p>useMemo keeps event-handler references stable between parent renders.</p></div>
          </div>
          <p className="footnote">Memoization helps when inputs remain unchanged; it does not guarantee every render is avoided. React Strict Mode may call render-related logic more than once in development.</p>
        </section>
      </main>
      <footer>React · Redux Toolkit · Reselect · React.memo · Vite</footer>
    </div>
  );
}
