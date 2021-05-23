import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Page404() {
  let location = useLocation();

  return (
    <div className="empty-page-container">
      <p className="empty-page-container-text">404</p>
      <p className="empty-page-container-description">
        Página <strong>{location.pathname} não encontrada</strong>
      </p>
      <p className="empty-page-container-button">
        <Link to="/">Página inicial</Link>
      </p>
    </div>
  );
}
