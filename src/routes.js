import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Noticia from "./components/CadastroNoticias";
import Page404 from "./pages/Page404";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/login" exact component={Login} />
        <Route path="/criar-noticia" exact component={Noticia} />
        <Route path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
