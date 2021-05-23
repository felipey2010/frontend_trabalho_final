import { useState, useEffect } from "react";
import Posts from "../components/Posts";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostedCategories from "../components/PostedCategories";
import Page404 from "./Page404";
import Login from "../components/Login";
import CadastroNoticia from "../components/CadastroNoticias";
import Article from "../components/Article";
import EditArticle from "../components/EditArticle";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [categories, setCategories] = useState([]);

  //the url of articles -> api/articles to pull all the articles from the database
  const dbArticles = "articles";
  const dbCategories = "categories";
  const dbUser = "user/verify_token/";

  //Get users from the database
  async function getUser() {
    //Check local storage for token
    const token = localStorage.getItem("token");

    if (token !== null) {
      //User has already signed in...verify the user's token
      axios
        .post(dbUser + token)
        .then(result => {
          setUser(result.data.user);
          setSignedIn(true);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setUser([]);
      setSignedIn(false);
    }
  }

  //Get categories from the database
  async function getCategories() {
    await axios
      .get(dbCategories)
      .then(result => {
        setCategories(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //Get posts from the database
  async function getPosts() {
    await axios
      .get(dbArticles)
      .then(result => {
        setBlogs(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUser();
    getPosts();
    getCategories();
  }, []);

  return (
    <Router>
      <div>
        <Navbar user={user} signedIn={signedIn} setSignedIn={setSignedIn} />
        <div className="content">
          <Switch>
            <Route
              path="/"
              exact
              component={() => {
                return (
                  <Posts
                    blogs={blogs}
                    getPosts={getPosts}
                    signedIn={signedIn}
                    title="Posts"
                  />
                );
              }}
            />
            <Route
              path="/categorias"
              component={() => {
                return (
                  <PostedCategories
                    categories={categories}
                    getCategories={getCategories}
                    getPosts={getPosts}
                    blogs={blogs}
                    signedIn={signedIn}
                  />
                );
              }}
            />
            <Route
              path="/criar-noticia"
              component={() => {
                return (
                  <CadastroNoticia
                    signedIn={signedIn}
                    categories={categories}
                    getPosts={getPosts}
                  />
                );
              }}
            />
            <Route
              path="/login"
              component={() => {
                return <Login signedIn={signedIn} setSignedIn={setSignedIn} />;
              }}
            />
            <Route
              path="/post/:id"
              render={props => <Article {...props} signedIn={signedIn} />}
            />
            <Route
              path="/post/edit/:id"
              render={props => (
                <EditArticle
                  {...props}
                  signedIn={signedIn}
                  getPosts={getPosts}
                  categories={categories}
                />
              )}
            />
            <Route
              path="*"
              component={() => {
                return <Page404 />;
              }}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
