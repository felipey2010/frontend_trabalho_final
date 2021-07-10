import axios from "axios";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

const Article = props => {
  const [post, setPost] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(true);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { id } = props.match.params;

  const { getPosts } = props.match.params;

  const dbArticle = "article/";

  function checkLoginState() {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  function showNotFound() {
    const timer = setTimeout(() => {
      setNotFound(false);
    }, 3000);

    return () => clearTimeout(timer);
  }

  async function getArticle() {
    await axios
      .get(dbArticle + id)
      .then(result => {
        if (result.data) {
          setPost(result.data);
          setLoading(false);
          setNotFound(true);
        } else {
          setPost([]);
          setLoading(true);
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(true);
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
          getPosts();
          getArticle();
          setLoading(true);
          window.locaton.reload(true);
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        enqueueSnackbar("Falha em excluir", { variant: "error" });
        console.log(error);
      });
  }

  useEffect(() => {
    console.log(props);
    getArticle();
    showNotFound();
    checkLoginState();
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="blog-preview">
          <div className="blog-container">
            <div className="loading-container">
              {notFound ? (
                <h2>Carregando notícia...</h2>
              ) : (
                <h2>Oops...algo deu errado. Não achamos este post</h2>
              )}
              <FadeLoader
                height={15}
                margin={2}
                radius={2}
                width={5}
                color="#b72166"
              />
              {notFound ? <></> : <Link to="/">Página Inicial</Link>}
            </div>
          </div>
        </div>
      ) : (
        <div className="post-preview">
          <h2>{post.title}</h2>
          <div className="post-image">
            <img src={post.image} alt={post.title} />
          </div>
          <p>{post.body}</p>

          <p className="post-author">Publicado por: {post.author}</p>

          {loggedIn && (
            <div className="post-buttons">
              <button onClick={() => handleDelete(post)}>Delete</button>

              <Link to={"/post/edit/" + post._id}>Edit</Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Article;
