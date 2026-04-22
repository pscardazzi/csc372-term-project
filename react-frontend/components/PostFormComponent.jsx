import { useState, useEffect } from "react";

export default function PostForm({ onSubmit, existingPost }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (existingPost) {
      setContent(existingPost.content);
    }
  }, [existingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your journal entry..."
        required
      />
      <button type="submit">
        {existingPost ? "Update Entry" : "Add Entry"}
      </button>
    </form>
  );
}
