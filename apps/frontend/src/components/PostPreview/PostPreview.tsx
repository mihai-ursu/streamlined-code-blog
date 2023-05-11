import { usePreview } from "@/lib/sanity";
import { postQuery } from "@/lib/queries";
import Post from "@/components/Post/Post";

const PostPreview = ({ data }: any) => {
  const slug = data?.post?.slug;
  const previewData = usePreview(null, postQuery, { slug });
  return <Post data={previewData ?? data} preview />;
};

export default PostPreview;
