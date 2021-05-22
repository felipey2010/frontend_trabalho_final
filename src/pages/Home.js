import { useState, useEffect } from "react";
import Blogs from "../components/blogs";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSnackbar } from "notistack";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [signedIn, setSignedIn] = useState(false);

  //for notifications
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //the url of articles -> api/articles to pull all the articles from the database
  const dbRequest = "articles";

  async function handleDelete(id) {
    await axios.delete(dbRequest + id).then((result) => {
      if (result.data.success) {
        enqueueSnackbar("Post Excluido", { variant: "success" });
        getPosts();
      } else {
        enqueueSnackbar("Error em excluir post", { variant: "error" });
      }
    });
  }

  //Get users from the database
  async function getUser() {
    //Check local storage for token
    const token = localStorage.getItem("token");
    if (token !== null) {
      //User has already signed in...verify the user's token
      axios
        .post("user/verify_token/" + token)
        .then((result) => {
          console.log(result.data.user);
          setUser(result.data.user);
          setSignedIn(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setUser([]);
      setSignedIn(false);
    }
  }

  //Get posts from the database
  async function getPosts() {
    await axios
      .get(dbRequest)
      .then((result) => {
        // console.log(result.data);
        setBlogs(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  return (
    <div>
      <Navbar user={user} signedIn={signedIn} setSignedIn={setSignedIn} />
      <div className="content">
        {blogs && (
          <Blogs blogs={blogs} title="Notícias" handleDelete={handleDelete} signedIn={signedIn} />
        )}
        {/* <Blogs blogs={blogs.filter(blog => blog.id >= 4)} title="Recente" /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
