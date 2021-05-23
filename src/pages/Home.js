import { useState, useEffect } from "react";
import Posts from "../components/Posts";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostedCategories from "../components/PostedCategories";

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
          console.log(result.data.user);
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
        // console.log(result.data);
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
        // console.log(result.data);
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
                    title="Notícias"
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
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
