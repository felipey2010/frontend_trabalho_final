import { useState } from "react";
import "../styles/cadastroNoticias.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Redirect, useLocation } from "react-router";

export default function Noticia({ signedIn, categories, getPosts }) {
  const [title, setTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [author, setAuthor] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");

  let location = useLocation();

  //for notifications
  const { enqueueSnackbar } = useSnackbar();

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
        .post(dbArticle, data)
        .then(result => {
          if (result.data.success) {
            enqueueSnackbar("Post criado", { variant: "success" });
            getPosts();
            clearFields();
            window.location.reload(true);
          } else {
            enqueueSnackbar("Criação falhou", { variant: "error" });
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

  if (signedIn) {
    return (
      <div className="main-noticias">
        <div className="container" id="container">
          <div className="form-container noticias-sign-in-container">
            <div className="form">
              <h1>Criar Notícia</h1>
              <span>Por favor, informe os dados para cadastro</span>
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
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    enqueueSnackbar("Sem Autorização", { variant: "error" });
    <Redirect
      to={{
        pathname: "/",
        state: { from: location.pathname },
      }}
    />;
  }
}
