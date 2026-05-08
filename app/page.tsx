// blog-frontend/app/page.tsx
import Hero from "@/components/Hero";
import LatestUpdates from "@/components/LatestUpdates";
import Header from "@/components/layout/Header";
import PostCard from "@/components/ui/cards/PostCard";
import { IPost } from "@/interfaces";
import { client } from "@/lib/sanity";
import { getDayBanner } from "@/lib/utils";
import Image from "next/image";

const query = `*[_type == "post"][$start...$end]{
  _id,
  title,
  slug,
  publishedAt,
  "authorName": author->name,
  "categories": categories[]->title,
  "mainImageUrl": mainImage.asset->url
}| order(publishedAt desc)`;

export default async function Home() {
  const now = new Date().toISOString();
  const posts = await client.fetch(query, { start: 0, end: 9 });
  console.log("Posts:", posts[0]);
  console.log("Posts: date", posts[0].publishedAt);
  console.log(typeof posts[0].publishedAt);

  const sortedPosts = posts
    .sort((a: IPost, b: IPost) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10);

  const bannerPost = getDayBanner(now, sortedPosts);
  console.log("Banner post:", bannerPost);

  return (
    <main>
      <Header />
      <Hero slug={bannerPost.slug.current} />
      <LatestUpdates posts={sortedPosts} />
    </main>
  );
}
