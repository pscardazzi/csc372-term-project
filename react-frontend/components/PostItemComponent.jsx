export default function PostItem({ post, onEdit, onDelete }) {
  
  function formatTimestamp(ts) {
    return new Date(ts).toLocaleString([], {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  return (
    <div className="post-item">
      <div className="timestamp">
        {formatTimestamp(post.created_at)}
      </div>

      <p className="content">{post.content}</p>

      <div className="actions">
        <button onClick={() => onEdit(post)}>Edit</button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
}
