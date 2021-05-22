import "../styles/cadastroNoticias.css";

const Noticia = () => {
  return (
    <div className="main-noticias">
      <div className="container" id="container">
        <div className="form-container noticias-sign-in-container">
          <form action="/">
            <h1>Criar Notícia</h1>
            <span>Por favor, informe os dados para cadastro</span>
            <input type="text" placeholder="Título" />
            <input type="text" placeholder="Autor" />
            <textarea name="Text1" rows="13" placeholder="Conteúdo"></textarea>
            <button className="cadastrarNoticia">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Noticia;
