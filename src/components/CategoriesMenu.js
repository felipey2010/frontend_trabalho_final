import "../styles/categoriesMenu.css";

export default function CategoriesMenu({ categories, title, handleDelete }) {
  return (
    <div className="divTotalCategories">
      {categories.map((category) => (
        <div className="category-preview">
          <h2>{category.title}</h2>
          <p>{category.body}</p>
          <p>Publicado por: {category.author}</p>
          <button onClick={() => handleDelete(category.id)}>Delete Category</button>
        </div>
      ))}
    </div>
  );
}
