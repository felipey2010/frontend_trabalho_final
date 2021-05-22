import { useState, useEffect } from "react";
import CategoriesM from "../components/CategoriesMenu";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  //the url of articles -> api/articles to pull all the articles from the database
  const dbRequest = "categories";

  const handleDelete = (id) => {
    const newCategoriess = categories.filter((categories) => categories.id !== id);
    setCategories(newCategoriess);
  };

  async function getPosts() {
    await axios
      .get(dbRequest)
      .then((result) => {
        // console.log(result.data);
        setCategories(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="divInternC">
        {categories && (
          <CategoriesM categories={categories} title="Categorias" handleDelete={handleDelete} />
        )}
        {/* <Blogs blogs={blogs.filter(blog => blog.id >= 4)} title="Recente" /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
