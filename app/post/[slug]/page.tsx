// frontend/src/app/[slug]/page.tsx

import Image from "next/image";
import { defineQuery } from "next-sanity";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";

import Header from "@/components/layout/Header";
import PortableTextRenderer from "@/components/PortableTextRenderer";

import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";

const POST_QUERY = defineQuery(`
*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  publishedAt,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  mainImage,
  body
}
`);

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    return (
      <>
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
              Article not found
            </h1>

            <p className="mt-4 text-base text-slate-500 md:text-lg">
              The article you're looking for doesn't exist.
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-slate-50">
        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
          {/* Decorative blobs */}

          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Fixed padding: Less bottom padding on mobile so negative margin doesn't overlap metadata */}
          <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 md:pt-20 md:pb-36">
            {/* Categories */}

            {post.categories?.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2 md:mb-8 md:gap-3">
                {post.categories.map((category: string) => (
                  <span
                    key={category}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-md md:px-4 md:py-2 md:text-sm"
                  >
                    {category.replace("Tech ", "")}
                  </span>
                ))}
              </div>
            )}

            {/* Responsive title font size */}
            <h1 className="max-w-4xl text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
              {post.title}
            </h1>

            {/* Meta tags stack on mobile, go row-wide on desktop */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:mt-10 md:gap-8">
              <div className="flex items-center gap-3 md:gap-4">
                {post.authorImage && (
                  <Image
                    src={urlFor(post.authorImage).width(60).height(60).url()}
                    alt={post.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white/30 md:h-[60px] md:w-[60px]"
                  />
                )}

                <div>
                  <p className="text-sm font-semibold md:text-base">
                    {post.name}
                  </p>

                  <div className="mt-0.5 flex items-center gap-2 text-xs text-blue-100 md:mt-1 md:text-sm">
                    <FaRegUser />
                    Author
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-blue-100 md:text-sm">
                <FaRegCalendarAlt />

                <time dateTime={post.publishedAt}>
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(post.publishedAt))}
                </time>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURE IMAGE ================= */}

        {post.mainImage && (
          /* Adjusted margins and padding for mobile */
          <section className="relative mx-auto -mt-12 max-w-6xl px-4 sm:px-6 md:-mt-24">
            {/* Changed aspect-ratio to 16/10 on mobile so it has visual height, 16/8 on desktop */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white bg-white shadow-2xl md:aspect-[16/8] md:rounded-[32px]">
              <Image
                src={urlFor(post.mainImage).width(1600).url()}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </section>
        )}

        {/* ================= ARTICLE ================= */}

        {/* Reduced vertical padding on mobile */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-24">
          <article
            className="
            prose
            prose-base
            md:prose-lg
            max-w-none

            prose-headings:font-bold
            prose-headings:tracking-tight
            prose-headings:text-slate-900

            prose-h2:text-xl
            md:prose-h2:text-2xl
            prose-h2:text-blue-700
            prose-h2:border-l-4
            prose-h2:border-blue-600
            prose-h2:pl-4
            md:prose-h2:pl-5
            prose-h2:mt-10
            md:prose-h2:mt-16

            prose-h3:text-lg
            md:prose-h3:text-xl
            prose-h3:text-indigo-700

            prose-p:text-slate-700
            prose-p:leading-7
            md:prose-p:leading-9

            prose-strong:text-slate-900

            prose-a:text-blue-600
            prose-a:no-underline
            prose-a:font-semibold
            prose-a:border-b-2
            prose-a:border-blue-300
            hover:prose-a:border-blue-600
            hover:prose-a:text-blue-700

            prose-li:marker:text-blue-600

            prose-img:rounded-xl
            md:prose-img:rounded-3xl
            prose-img:shadow-xl

            prose-blockquote:border-l-4
            prose-blockquote:border-blue-600
            prose-blockquote:bg-blue-50
            prose-blockquote:rounded-r-xl
            prose-blockquote:px-4
            md:prose-blockquote:px-8
            prose-blockquote:py-4
            md:prose-blockquote:py-5
            prose-blockquote:not-italic

            prose-code:bg-pink-50
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:rounded
            prose-code:text-pink-600
            prose-code:break-words

            prose-pre:bg-slate-900
            prose-pre:text-gray-100
            prose-pre:rounded-xl
            md:prose-pre:rounded-2xl
            prose-pre:shadow-2xl
            prose-pre:overflow-x-auto
          "
          >
            <PortableTextRenderer value={post.body} />
          </article>
        </section>
      </main>
    </>
  );
}
