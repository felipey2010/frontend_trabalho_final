import "./styles.css";
import whatsapp from "../../images/whatsapp.png";

export default function footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <section className="footer-content">
          <article className="footer-content-item">
            <button className="footer-accordion">
              <h5 className="footer-button-text">Sobre Tech Blog</h5>
            </button>
            <div className="footer-panel">
              <a href="#">Saiba tudo sobre Tech Blog</a>
            </div>
          </article>

          <article className="footer-content-item">
            <button className="footer-accordion">
              <h5 className="footer-button-text">Notícias</h5>
            </button>
            <div className="footer-panel">
              <a href="#">Confira as notícias mais recentes</a>
            </div>
          </article>

          <article className="footer-content-item">
            <button className="footer-accordion">
              <h5 className="footer-button-text">Redes Sociais</h5>
            </button>
            <div className="footer-panel">
              <a href="#">Siga nossas páginas</a>
            </div>
          </article>

          <article className="footer-content-item">
            <button className="footer-accordion">
              <h5 className="footer-button-text">Vídeos</h5>
            </button>
            <div className="footer-panel">
              <a href="#">Os vídeos que chamaram nossa atenção</a>
            </div>
          </article>
        </section>
      </div>
      <div className="whatsapp">
        <a
          href="https://api.whatsapp.com/send?phone=559581158214&text=Ol%C3%A1%2C%20vim%20do%20site%20e%20preciso%20de%20ajuda."
          title="Atendimento Whatsapp"
          target="_blank">
          <img
            src={whatsapp}
            title="Atendimento Whatsapp"
            alt="Atendimento Whatsapp"
          />
        </a>
      </div>
      <footer className="footer-space">
        <div className="footer-blank"></div>
      </footer>
    </footer>
  );
}
