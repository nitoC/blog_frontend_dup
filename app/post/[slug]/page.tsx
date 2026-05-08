// frontend/src/app/[slug]/page.tsx
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { client } from "@/lib/sanity";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { urlFor } from "@/lib/image";
import Header from "@/components/layout/Header";
// import { urlFor } from "@/lib/sanity/image";

const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  publishedAt,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  mainImage,
  body
}`);

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  return (
    <>
      <Header />
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
        <div className="flex items-center gap-4 mb-8">
          {post?.authorImage && (
            <Image
              src={urlFor(post?.authorImage).width(48).height(48).url()}
              alt={post?.name || ""}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-medium">{post?.name}</p>
            {post?.publishedAt && (
              <time className="text-gray-500 text-sm">
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            )}
          </div>
        </div>
        {post?.categories && (
          <div className="flex gap-2 mb-8">
            {post.categories.map((category: string) => (
              <span
                key={category}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        <PortableTextRenderer value={post?.body} />
        {/* {post?.mainImage && (
        <Image
        src={urlFor(post.mainImage).width(800).url()}
        alt={post?.title || ""}
        width={800}
        height={450}
        className="rounded-lg mb-8 w-full"
        />
        )} */}
      </main>
    </>
  );
}
