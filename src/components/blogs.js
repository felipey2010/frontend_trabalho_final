import { useSnackbar } from "notistack";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blogs({ blogs, title, getPosts, signedIn }) {
  const maxLength = 300;
  const maxTitle = 300;
  //for notifications
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dbRequest = "article/";

  async function handleDelete(data) {
    closeSnackbar();
    await axios
      .delete(dbRequest + data._id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar("Categoria excluida", { variant: "success" });
          getPosts();
        }
      })
      .catch(error => {
        enqueueSnackbar("Falha em excluir", { variant: "error" });
        console.log(error);
      });
  }
  return (
    <div>
      <h2>{title}</h2>
      {blogs.map(blog => (
        <div className="blog-preview" key={blog._id}>
          <div className="blog-container">
            <div className="blog-image">
              <img src={blog.image} alt={blog.title} />
            </div>
            {blog.body.length > maxTitle ? (
              <Link to={"/post/" + blog._id}>
                <h2>{`${blog.title.substring(0, maxTitle)} . . .`}</h2>
              </Link>
            ) : (
              <Link to={"/post/" + blog._id}>
                <h2>{blog.title}</h2>
              </Link>
            )}

            {blog.body.length > maxLength ? (
              <p>{`${blog.body.substring(0, maxLength)} . . .`}</p>
            ) : (
              <p>{blog.body}</p>
            )}
          </div>

          <p className="blog-author">Publicado por: {blog.author}</p>

          {signedIn && (
            <div className="blog-buttons">
              <button onClick={() => handleDelete(blog)}>Delete</button>
              <Link to={"/post/edit/" + blog._id}>Edit</Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
