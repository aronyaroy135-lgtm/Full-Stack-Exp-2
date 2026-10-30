import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost, deletePost, toggleLike, updatePost, clearPosts
} from "./features/posts/postsSlice";
import {
  toggleTheme, toggleNotifications, setActiveCategory
} from "./features/platform/platformSlice";

const categories = ["All", "Announcement", "Technology", "Education", "Personal"];

export default function App() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.items);
  const platform = useSelector(state => state.platform);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filteredPosts = useMemo(() => posts.filter(post => {
    const matchesCategory = platform.activeCategory === "All" || post.category === platform.activeCategory;
    const matchesSearch = `${post.title} ${post.content} ${post.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [posts, platform.activeCategory, search]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage("Please enter both a title and content.");
      return;
    }
    if (editingId) {
      dispatch(updatePost({ id: editingId, title, content, category }));
      setMessage("Post updated in the Redux store.");
    } else {
      dispatch(addPost({ title, content, category }));
      setMessage("Post added to the Redux store.");
    }
    setTitle("");
    setContent("");
    setCategory("Technology");
    setEditingId(null);
  }

  function beginEdit(post) {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    setMessage("Edit the form and submit to update the post.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setCategory("Technology");
    setMessage("Editing cancelled.");
  }

  return (
    <div className={`app ${platform.theme}`}>
      <header className="topbar">
        <div className="brand-mark">P</div>
        <div className="brand-copy">
          <p className="eyebrow">REDUX TOOLKIT EXPERIMENT</p>
          <h1>{platform.platformName}</h1>
          <p className="subtitle">Centralized state for posts and platform settings</p>
        </div>
        <button className="theme-button" onClick={() => dispatch(toggleTheme())}>
          {platform.theme === "light" ? "☾ Dark mode" : "☀ Light mode"}
        </button>
      </header>

      <main className="container">
        <section className="stats-grid">
          <article className="stat-card"><span>Total posts</span><strong>{posts.length}</strong><small>Managed by postsSlice</small></article>
          <article className="stat-card"><span>Liked posts</span><strong>{posts.filter(post => post.liked).length}</strong><small>Derived from store state</small></article>
          <article className="stat-card"><span>Notifications</span><strong>{platform.notificationsEnabled ? "On" : "Off"}</strong><small>Managed by platformSlice</small></article>
        </section>

        <section className="settings panel">
          <div>
            <h2>Platform settings</h2>
            <p>These controls update the centralized platform state.</p>
          </div>
          <button className="secondary" onClick={() => dispatch(toggleNotifications())}>
            {platform.notificationsEnabled ? "Disable notifications" : "Enable notifications"}
          </button>
        </section>

        <div className="content-grid">
          <section className="panel form-panel">
            <div className="panel-heading">
              <div><h2>{editingId ? "Edit post" : "Create a post"}</h2><p>Dispatch an action to update shared state.</p></div>
              <span className="state-chip">{editingId ? "UPDATE" : "CREATE"}</span>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Post title</label>
              <input id="title" value={title} onChange={e => setTitle(e.target.value)} maxLength={100} placeholder="e.g. My first post" />
              <label htmlFor="content">Content</label>
              <textarea id="content" value={content} onChange={e => setContent(e.target.value)} maxLength={1200} rows={6} placeholder="Write something to share..." />
              <label htmlFor="category">Category</label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                {categories.filter(item => item !== "All").map(item => <option key={item}>{item}</option>)}
              </select>
              <div className="form-actions">
                <button className="primary" type="submit">{editingId ? "Update post" : "Add post"}</button>
                {editingId && <button className="secondary" type="button" onClick={cancelEdit}>Cancel</button>}
              </div>
              <p className="message" role="status">{message}</p>
            </form>
          </section>

          <section className="panel posts-panel">
            <div className="posts-heading">
              <div><h2>Community posts</h2><p>Search, filter, like, edit, or remove posts.</p></div>
              <button className="text-button" onClick={() => {
                if (window.confirm("Remove all posts from the current Redux state?")) dispatch(clearPosts());
              }}>Clear all</button>
            </div>
            <input className="search" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." aria-label="Search posts" />
            <div className="filters">
              {categories.map(item => (
                <button key={item} className={platform.activeCategory === item ? "filter active" : "filter"} onClick={() => dispatch(setActiveCategory(item))}>{item}</button>
              ))}
            </div>
            <div className="post-list">
              {filteredPosts.map(post => (
                <article className="post-card" key={post.id}>
                  <div className="post-top">
                    <span className="category-tag">{post.category}</span>
                    <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="post-content">{post.content}</p>
                  <div className="post-actions">
                    <button className={post.liked ? "like liked" : "like"} onClick={() => dispatch(toggleLike(post.id))}>{post.liked ? "♥ Liked" : "♡ Like"}</button>
                    <button className="text-button" onClick={() => beginEdit(post)}>Edit</button>
                    <button className="delete-button" onClick={() => {
                      if (window.confirm(`Delete "${post.title}"?`)) dispatch(deletePost(post.id));
                    }}>Delete</button>
                  </div>
                </article>
              ))}
              {filteredPosts.length === 0 && <div className="empty"><div>⌕</div><h3>No posts found</h3><p>Try another search or category.</p></div>}
            </div>
          </section>
        </div>

        <section className="architecture panel">
          <h2>How centralized state works</h2>
          <div className="flow">
            <div><strong>React UI</strong><span>useSelector / useDispatch</span></div><b>→</b>
            <div><strong>Redux Actions</strong><span>addPost, toggleLike, etc.</span></div><b>→</b>
            <div><strong>Reducers</strong><span>postsSlice / platformSlice</span></div><b>→</b>
            <div><strong>Redux Store</strong><span>Shared application state</span></div>
          </div>
          <p className="note">Demo note: the Redux store is in memory. Refreshing the page resets it to the sample initial state; no backend or persistent database is connected.</p>
        </section>
      </main>
      <footer>Built with React · Redux Toolkit · React Redux · Vite</footer>
    </div>
  );
}
