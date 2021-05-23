import Blogs from "./blogs";

export default function Posts({ blogs, getPosts, signedIn, title }) {
  return (
    <>
      {blogs && (
        <Blogs
          blogs={blogs}
          title={title}
          getPosts={getPosts}
          signedIn={signedIn}
        />
      )}
    </>
  );
}
