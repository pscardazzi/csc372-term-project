//PostListComponent.jsx: returns all posts coming from PostItem inside a general container
import PostItem from "./PostItemComponent";

export default function PostList({ posts, onEdit, onDelete }) {
  return (
    <div className="container">
      {posts.map((post) => (
        <div className="post">
        <PostItem
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        </div>
      ))}
    </div>
  );
}
