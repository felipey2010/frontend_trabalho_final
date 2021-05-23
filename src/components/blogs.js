import { useSnackbar } from "notistack";
import axios from "axios";

export default function Blogs({ blogs, title, getPosts, signedIn }) {
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
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
          <p>Publicado por: {blog.author}</p>

          {signedIn && (
            <button onClick={() => handleDelete(blog)}>Delete post</button>
          )}
        </div>
      ))}
    </div>
  );
}
