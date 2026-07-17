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

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
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

      <main className="bg-slate-50/50">
        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
          {/* Decorative blobs */}

          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl" />

          <div className="absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 md:pt-20 md:pb-36">
            {/* Categories */}

            {post.categories?.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2 md:mb-8 md:gap-3">
                {post.categories.map((category: string) => (
                  <span
                    key={category}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md md:px-4 md:py-2 md:text-sm"
                  >
                    {category.replace("Tech ", "")}
                  </span>
                ))}
              </div>
            )}

            {/* Stylish Gradient Heading */}
            <h1 className="max-w-4xl bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-4xl md:text-6xl">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:mt-10 md:gap-8">
              <div className="flex items-center gap-3 md:gap-4">
                {post.authorImage && (
                  <Image
                    src={urlFor(post.authorImage).width(60).height(60).url()}
                    alt={post.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white/20 shadow-lg md:h-[60px] md:w-[60px]"
                  />
                )}

                <div>
                  <p className="text-sm font-semibold text-slate-100 md:text-base">
                    {post.name}
                  </p>

                  <div className="mt-0.5 flex items-center gap-2 text-xs text-indigo-200 md:mt-1 md:text-sm">
                    <FaRegUser className="text-emerald-400" />
                    Author
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-indigo-200 md:text-sm">
                <FaRegCalendarAlt className="text-emerald-400" />

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
          <section className="relative mx-auto -mt-12 max-w-6xl px-4 sm:px-6 md:-mt-24">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-2 shadow-2xl md:aspect-[16/8] md:rounded-[32px]">
              <Image
                src={urlFor(post.mainImage).width(1600).url()}
                alt={post.title}
                fill
                priority
                className="rounded-xl object-cover md:rounded-[24px]"
              />
            </div>
          </section>
        )}

        {/* ================= ARTICLE ================= */}

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-24">
          <article
            className="
              prose
              prose-base
              md:prose-lg
              max-w-none
              
              /* Global fallback resets to let custom block rendering take precedence cleanly */
              prose-headings:font-extrabold
              prose-headings:tracking-tight
              
              prose-img:rounded-xl
              md:prose-img:rounded-2xl
              prose-img:shadow-xl
            "
          >
            <PortableTextRenderer value={post.body} />
          </article>
        </section>
      </main>
    </>
  );
}
