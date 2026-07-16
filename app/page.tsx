// blog-frontend/app/page.tsx

import Hero from "@/components/Hero";
import LatestUpdates from "@/components/LatestUpdates";
import Header from "@/components/layout/Header";
import { IPost } from "@/interfaces";
import { client } from "@/lib/sanity";
import { getDayBanner } from "@/lib/utils";

const query = `
*[_type == "post"]
| order(publishedAt desc)[$start...$end]{
  _id,
  title,
  slug,
  publishedAt,
  "authorName": author->name,
  "categories": categories[]->title,
  "mainImageUrl": mainImage.asset->url
}
`;

export default async function Home() {
  const now = new Date().toISOString();

  // Fetch the latest 10 posts directly from Sanity
  const posts: IPost[] = await client.fetch(query, {
    start: 0,
    end: 10, // GROQ ranges are end-exclusive, so this returns 10 posts (0-9)
  });

  console.log("Latest post:", posts[0]);
  console.log("Published at:", posts[0]?.publishedAt);

  const bannerPost = getDayBanner(now, posts);

  console.log("Banner post:", bannerPost);

  return (
    <main>
      <Header />

      {bannerPost && <Hero slug={bannerPost.slug.current} />}

      <LatestUpdates posts={posts} />
    </main>
  );
}