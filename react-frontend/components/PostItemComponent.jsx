export default function PostItem({ post, onEdit, onDelete }) {
  return (
    <div className="post-item">
      <p className="date">
        {new Date(post.created_at).toLocaleString()}
      </p>

      <p className="content">{post.content}</p>

      <div className="actions">
        <button onClick={() => onEdit(post)}>Edit</button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
}
