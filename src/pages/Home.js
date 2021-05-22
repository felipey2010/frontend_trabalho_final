import { useState, useEffect } from "react";
import Blogs from "../components/Blogs";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

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
    <div className="home">
      {blogs && (
        <Blogs blogs={blogs} title="Notícias" handleDelete={handleDelete} />
      )}
      {/* <Blogs blogs={blogs.filter(blog => blog.id >= 4)} title="Recente" /> */}
    </div>
  );
};

export default Home;
