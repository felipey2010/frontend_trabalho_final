import axios from "axios";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const Article = (props, signedIn) => {
  const [post, setPost] = useState([]);
  const [postFound, setPostFound] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { id } = props.match.params;

  const dbArticle = "article/";

  async function getArticle() {
    await axios
      .get(dbArticle + id)
      .then(result => {
        if (result.data) {
          setPostFound(true);
          setPost(result.data);
        } else {
          setPostFound(false);
          setPost([]);
        }
      })
      .catch(error => {
        console.log(error);
        setPostFound(false);
        setPost([]);
      });
  }

  async function handleDelete(data) {
    closeSnackbar();
    await axios
      .delete(dbArticle + data._id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar("Post excluido", { variant: "success" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Falha em excluir", { variant: "error" });
        console.log(error);
      });
  }

  useEffect(() => {
    getArticle();
  }, []);

  if (postFound) {
    return (
      <div className="post-preview">
        <h2>{post.title}</h2>
        <div className="post-image">
          <img src={post.image} alt={post.title} />
        </div>
        <p>{post.body}</p>

        <p className="post-author">Publicado por: {post.author}</p>

        {signedIn && (
          <div className="post-buttons">
            <button onClick={() => handleDelete(post)}>Delete</button>

            <Link to={"/post/edit/" + post._id}>Edit</Link>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="blog-preview">
        <div className="blog-container">
          <h2>Oops...we could not find this post</h2>
          <Link to="/">Página Inicial</Link>
        </div>
      </div>
    );
  }
};

export default Article;
