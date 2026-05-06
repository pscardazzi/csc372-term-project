/* JournalComponent.jsx: Handles the journal itself, fetching the posts, 
and displaying them with help of PostList, and displaying PostForm's text box and button.
Also handles posting/editing/deleting posts. */
import { useEffect, useState } from "react";
import PostList from "../components/PostListComponent";
import PostForm from "../components/PostFormComponent";

export default function JournalPage({user, onLogout}) {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const API_URL = "http://localhost:3000/api/posts";

  // Load posts on mount
  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPosts(data);
  }

  async function handleCreate(content) {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    loadPosts();
  }

  async function handleUpdate(content) {
    await fetch(`${API_URL}/${editingPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    setEditingPost(null);
    loadPosts();
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    loadPosts();
  }

  return (
    <div className="page-layout">
      <main className="journal-content">
        <h1>Pedro's Journal App</h1>
        <h2>Welcome, {user.name}!</h2>

        <PostList
          posts={posts}
          onEdit={setEditingPost}
          onDelete={handleDelete}
        />
        
        <PostForm
          onSubmit={editingPost ? handleUpdate : handleCreate}
          existingPost={editingPost}
        />

        <button onClick={onLogout}>Logout</button>
      </main>
    </div>
  );
}
