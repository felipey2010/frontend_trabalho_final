import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Noticia from "./components/CadastroNoticias";
import Categories from "./components/Categories";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/criar-noticia" exact component={Noticia} />
        <Route path="/categories" exact component={Categories} />
        {/* <Route path="/pagina2" component={Pagina2}> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
