import { useState, useEffect } from "react";
import "../styles/cadastroNoticias.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const EditArticle = (props, signedIn, categories, getPosts) => {
  const [post, setPost] = useState([]);
  const [postFound, setPostFound] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [articleBody, setArticleBody] = useState(post.body);
  const [author, setAuthor] = useState(post.author);
  const [imageURL, setImageURL] = useState(post.image);
  const [category, setCategory] = useState(post.categories);

  //for notifications
  const { enqueueSnackbar } = useSnackbar();

  const { id } = props.match.params;

  const dbArticle = "article";

  async function saveData() {
    const data = {
      title: title,
      body: articleBody,
      author: author,
      image: imageURL,
      category: category,
    };
    if (title && articleBody && author && category) {
      await axios
        .put(dbArticle, data)
        .then(result => {
          if (result.data.success) {
            enqueueSnackbar("Post atualizado", { variant: "success" });
            getPosts();
            clearFields();
            window.location.reload(true);
          } else {
            enqueueSnackbar("Atualização falhou", { variant: "error" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  const clearFields = () => {
    setTitle("");
    setArticleBody("");
    setAuthor("");
    setImageURL("");
  };

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

  useEffect(() => {
    getArticle();
  }, []);

  if (signedIn && postFound) {
    return (
      <div className="main-noticias">
        <div className="container" id="container">
          <div className="form-container noticias-sign-in-container">
            <div className="form">
              <h1>Editar Notícia</h1>
              <span>Por favor, informe os dados para atualizar</span>
              <input
                type="text"
                placeholder="Título"
                required
                onChange={e => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Autor"
                required
                onChange={e => setAuthor(e.target.value)}
              />
              <textarea
                name="Text1"
                rows="13"
                required
                placeholder="Conteúdo"
                onChange={e => setArticleBody(e.target.value)}></textarea>
              <input
                type="text"
                placeholder="URL Imagem"
                onChange={e => setImageURL(e.target.value)}
              />

              {/* Categories */}
              <div className="categoria-div">
                <label for="Categories">Categoria:</label>
                <select
                  name="Categories"
                  id="cars"
                  onChange={e => setCategory(e.target.value)}>
                  {categories.map(cat => (
                    <option value={cat.title}>{cat.title}</option>
                  ))}
                </select>
              </div>

              <button className="cadastrarNoticia" onClick={() => saveData()}>
                Atualizar
              </button>
            </div>
          </div>
        </div>
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
export default EditArticle;
