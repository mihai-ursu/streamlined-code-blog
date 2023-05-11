import React from "react";
import PostProps from "./PostProps";

const Post = ({ data = {}, preview = false }: PostProps) => {
  return <div>{data.post.title ? <h1>{data.post.title}</h1> : null}</div>;
};

export default Post;
