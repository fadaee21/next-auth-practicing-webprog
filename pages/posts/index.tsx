import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";
import { Post } from "../../type";

const Posts = ({ posts, error }: { posts: Post[]; error: any }) => {
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <ul>
      {posts.slice(0, 5).map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <h4>{post.body}</h4>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default Posts;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const resApi = await fetch("http://localhost:8000/api/posts", {
    headers: {
      Authorization: `Bearer ${req.cookies.token} `,
    },
  });
  const data = await resApi.json();

  try {
    if (resApi.ok) {
      return {
        props: { posts: data.posts },
      };
    } else {
      return {
        props: {
          posts: null,
          error: data,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        posts: null,
        error: "SERVER ERROR",
      },
    };
  }
};
