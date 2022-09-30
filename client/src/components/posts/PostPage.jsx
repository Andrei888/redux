import React from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const params = useParams();
  console.log(params);
  return <div>PostPagessss {params.postId}</div>;
}

export default PostPage;
