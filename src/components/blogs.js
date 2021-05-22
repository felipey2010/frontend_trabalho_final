export default function Blogs({ blogs, title, handleDelete, signedIn }) {
  return (
    <div>
      <h2>{title}</h2>
      {blogs.map(blog => (
        <div className="blog-preview">
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
          <p>Publicado por: {blog.author}</p>

          {signedIn && (
            <button onClick={() => handleDelete(blog.id)}>Delete Blog</button>
          )}
        </div>
      ))}
    </div>
  );
}
