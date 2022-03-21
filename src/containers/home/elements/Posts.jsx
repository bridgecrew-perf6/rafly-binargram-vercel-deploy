import { useEffect } from "react";
import { useHomeProvider } from "../HomeProvider";
import PostItem from "./PostItem";

const Posts = ({ data }) => {
  const { posts, loadPosts } = useHomeProvider();

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <section>
      {
        posts && posts.length > 0 && posts.map((post) => (
          <PostItem key={post.id} data={post.attributes} id={post.id} />
        ))
      }
    </section>
  )
}

export default Posts;