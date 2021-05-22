import { useState, useEffect } from "react";
import Blogs from "../components/Blogs";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  //the url of articles -> api/articles to pull all the articles from the database
  const dbRequest = "articles";

  const handleDelete = id => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  };

  async function getPosts() {
    await axios
      .get(dbRequest)
      .then(result => {
        // console.log(result.data);
        setBlogs(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="content">
        {blogs && (
          <Blogs blogs={blogs} title="Notícias" handleDelete={handleDelete} />
        )}
        {/* <Blogs blogs={blogs.filter(blog => blog.id >= 4)} title="Recente" /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
