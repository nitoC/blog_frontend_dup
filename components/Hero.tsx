import { IPost } from "@/interfaces";

import { client } from "@/lib/sanity";
import { defineQuery } from "next-sanity";
import Link from "next/link";

const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug]{
  title,
  slug,
  publishedAt,
  "name": author->name,
  "authorName": author->name,
  "mainImageUrl": mainImage.asset->url,
  description
}`);
const Hero = async ({ slug }: { slug: string }) => {
  const [post] = await client.fetch(POST_QUERY, { slug });
  console.log("PostHero:", post);
  const { title, mainImageUrl, authorName, publishedAt, description } = post;
  return (
    <div
      style={{ backgroundImage: `url(${mainImageUrl})` }}
      className="hero w-full aspect-6/2 p-4 md:p-8 flex items-end"
    >
      <div className="clip">
        <div className="hero_content text-white max-w-3xl p-8">
          <h1 className="title text-white">{title}</h1>

          <p>
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
          <div className="flex gap-4">
            <p className="text-sm text-gray-400">
              <span className="text-[1rem]">By </span>
              {authorName}
            </p>
            <p className="text-sm">
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "medium",
              }).format(new Date(publishedAt))}
            </p>
          </div>
          <div className="cta_container my-8">
            <Link
              href={`/post/${slug}`}
              className="text-sm bg-primary text-white py-4 px-8 hover:bg-primary-transluscent transition-colors duration-300"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
