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
  // Directly fetching the object instead of an array
  const post = await client.fetch(POST_QUERY, { slug });

  console.log("PostHero:", post);

  if (!post) return null;

  const { title, mainImageUrl, authorName, publishedAt, description } = post[0];

  console.log(mainImageUrl, "image url");

  // Fallback safe string rendering
  const safeDescription = description || "";
  const excerpt =
    safeDescription.length > 100
      ? `${safeDescription.slice(0, 100)}...`
      : safeDescription;

  return (
    <div
      style={{ backgroundImage: `url(${mainImageUrl})` }}
      className="hero w-full aspect-6/2 p-4 md:p-8 flex items-end"
    >
      <div className="clip">
        <div className="hero_content text-white max-w-3xl p-8">
          <h1 className="title text-white">{title}</h1>

          <p>{excerpt}</p>

          <div className="flex gap-4">
            <p className="text-sm text-gray-400">
              <span className="text-[1rem]">By </span>
              {authorName}
            </p>
            <p className="text-sm">
              {publishedAt && !isNaN(Date.parse(publishedAt))
                ? new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "medium",
                  }).format(new Date(publishedAt))
                : "Date Unavailable"}
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
