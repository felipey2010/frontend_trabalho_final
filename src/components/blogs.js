export default function Blog({ blogs }) {
  return (
    <div>
      {blogs.map(blog => (
        <div className="blog-preview">
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
          <p>Escrito port: {blog.author}</p>
        </div>
      ))}
    </div>
  );
}
