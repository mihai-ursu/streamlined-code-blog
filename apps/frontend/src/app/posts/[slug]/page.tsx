import { lazy } from "react";
import { PreviewSuspense } from "next-sanity/preview";
import { postQuery, postSlugsQuery } from "@/lib/queries";
import { getClient, overlayDrafts, sanityClient } from "@/lib/sanity.server";
import Post from "@/components/Post/Post";

const PostPreview = lazy(() => import("@/components/PostPreview/PostPreview"));

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const data = await getData(params.slug);

  // if (preview) {
  //   return (
  //     <PreviewSuspense fallback="Loading...">
  //       <PostPreview data={data} />
  //     </PreviewSuspense>
  //   );
  // }

  return <Post data={data} />;
};

export default BlogPost;

async function getData(slug: string) {
  const posts = await sanityClient.fetch(postQuery, {
    slug: slug,
  });

  return posts;
}

export async function generateStaticParams() {
  const paths = await sanityClient.fetch(postSlugsQuery);
  return paths.map((slug: string) => ({ slug: slug }));
}
