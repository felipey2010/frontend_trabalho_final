import { cleanup } from "@testing-library/react";
import { useState } from "react";
import "../styles/cadastroNoticias.css";

export default function Noticia (){
  const [title, setTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [author, setAuthor] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");

  const dbArticle = "article";

  async function saveData() {
    const data = {
      title: title,
      body: articleBody,
      author: author,
      image: imageURL,
      category: category,
    };
    if (
      title !== " " &&
      articleBody !== " " &&
      author !== " " &&
      category !== " "
    ) {
      await axios
        .post(dbArticle)
        .then(result => {
          if (result.data.success) {
            enqueueSnackbar("Post criado", { variant: "success" });
            cleanup();
          } else {
            enqueueSnackbar("Criação falhou", { variant: "error" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  const cleanup = () => {
    setTitle("");
    setArticleBody("");
    setCategory("");
    setAuthor("");
    setImageURL("");
  };

  return (
    <div className="main-noticias">
      <div className="container" id="container">
        <div className="form-container noticias-sign-in-container">
          <div className="form">
            <h1>Criar Notícia</h1>
            <span>Por favor, informe os dados para cadastro</span>
            <input type="text" placeholder="Título" />
            <input type="text" placeholder="Autor" />
            <textarea name="Text1" rows="13" placeholder="Conteúdo"></textarea>
            <button className="cadastrarNoticia">Cadastrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noticia;
