import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import Blogs from "./blogs";

export default function PostedCategories({
  categories,
  getCategories,
  getPosts,
  signedIn,
  blogs,
}) {
  const [openedCategory, setOpenCategory] = useState(false);
  const [title, setTitle] = useState("");

  //for notifications
  const { enqueueSnackbar } = useSnackbar();
  const dbRequest = "category/";

  async function handleDelete(data) {
    await axios
      .delete(dbRequest + data._id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar("Categoria excluida", { variant: "success" });
          getCategories();
        }
      })
      .catch(error => {
        enqueueSnackbar("Falha em excluir", { variant: "error" });
        console.log(error);
      });
  }

  async function openCategories(categoryTitle) {
    setTitle(categoryTitle);
    setOpenCategory(!openedCategory);
  }

  if (openedCategory) {
    return (
      <div className="content">
        {blogs && (
          <Blogs
            blogs={blogs.filter(blog => blog.category === { title })}
            title={title}
            getPosts={getPosts}
            signedIn={signedIn}
          />
        )}
      </div>
    );
  } else {
    return (
      <>
        {categories.map(category => (
          <div
            className="category-preview"
            key={category._id}
            onClick={() => openCategories(category.title)}>
            <h2>{category.title}</h2>
            {signedIn && (
              <button onClick={() => handleDelete(category)}>
                Delete Category
              </button>
            )}
          </div>
        ))}
      </>
    );
  }
}
