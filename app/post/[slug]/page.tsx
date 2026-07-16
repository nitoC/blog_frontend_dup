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
            <h1 className="text-5xl font-bold text-slate-900">
              Article not found
            </h1>

            <p className="mt-4 text-lg text-slate-500">
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

          <div className="mx-auto max-w-6xl px-6 pt-20 pb-36">

            {/* Categories */}

            {post.categories?.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-3">
                {post.categories.map((category: string) => (
                  <span
                    key={category}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md"
                  >
                    {category.replace("Tech ", "")}
                  </span>
                ))}
              </div>
            )}

            <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-6xl">
              {post.title}
            </h1>

            <div className="mt-10 flex flex-wrap items-center gap-8">

              <div className="flex items-center gap-4">

                {post.authorImage && (
                  <Image
                    src={urlFor(post.authorImage)
                      .width(60)
                      .height(60)
                      .url()}
                    alt={post.name}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-white/30"
                  />
                )}

                <div>

                  <p className="font-semibold">
                    {post.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm text-blue-100">
                    <FaRegUser />
                    Author
                  </div>

                </div>

              </div>

              <div className="flex items-center gap-2 text-blue-100">
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
          <section className="relative mx-auto -mt-24 max-w-6xl px-6">

            <div className="relative aspect-[16/8] overflow-hidden rounded-[32px] border border-white bg-white shadow-2xl">

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

        <section className="mx-auto max-w-4xl px-6 py-24">

          <article
            className="
            prose
            prose-lg
            max-w-none

            prose-headings:font-bold
            prose-headings:tracking-tight
            prose-headings:text-slate-900

            prose-h2:text-blue-700
            prose-h2:border-l-4
            prose-h2:border-blue-600
            prose-h2:pl-5
            prose-h2:mt-16

            prose-h3:text-indigo-700

            prose-p:text-slate-700
            prose-p:leading-9

            prose-strong:text-slate-900

            prose-a:text-blue-600
            prose-a:no-underline
            prose-a:font-semibold
            prose-a:border-b-2
            prose-a:border-blue-300
            hover:prose-a:border-blue-600
            hover:prose-a:text-blue-700

            prose-li:marker:text-blue-600

            prose-img:rounded-3xl
            prose-img:shadow-2xl

            prose-blockquote:border-l-4
            prose-blockquote:border-blue-600
            prose-blockquote:bg-blue-50
            prose-blockquote:rounded-r-xl
            prose-blockquote:px-8
            prose-blockquote:py-5
            prose-blockquote:not-italic

            prose-code:bg-pink-50
            prose-code:px-2
            prose-code:py-1
            prose-code:rounded
            prose-code:text-pink-600

            prose-pre:bg-slate-900
            prose-pre:text-gray-100
            prose-pre:rounded-2xl
            prose-pre:shadow-2xl
          "
          >
            <PortableTextRenderer value={post.body} />
          </article>

        </section>

      </main>
    </>
  );
}