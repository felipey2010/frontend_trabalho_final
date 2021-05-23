import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/criar-noticia" component={Noticia} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
