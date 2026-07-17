// blog-frontend/app/posts/page.tsx

import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import PostCard from "@/components/ui/cards/PostCard";
import { IPost } from "@/interfaces";
import { client } from "@/lib/sanity";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const pageTotal = 10;

const query = `
*[_type == "post" && (!defined($category) || $category in categories[]->title)]
| order(publishedAt desc)[$start...$end]{
  _id,
  title,
  slug,
  publishedAt,
  "authorName": author->name,
  "mainImageUrl": mainImage.asset->url,
  "categories": categories[]->title
}
`;

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}) {
  const { category, page } = await searchParams;

  const pageNumber = Math.max(Number(page ?? 1), 1);

  const start = (pageNumber - 1) * pageTotal;
  const end = start + pageTotal + 1;

  const posts: IPost[] = await client.fetch(query, {
    category: category ? `Tech ${category}` : null,
    start,
    end,
  });

  const hasNextPage = posts.length > pageTotal;
  const visiblePosts = posts.slice(0, pageTotal);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="text-sm text-gray-500 mb-3">Home / Posts</p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {category || "Latest Articles"}
              </h1>

              <p className="mt-3 text-gray-600 max-w-2xl">
                Explore tutorials, engineering insights, web development
                techniques, cloud computing, AI, and software architecture
                articles.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              {category && (
                <span className="rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
                  {category}
                </span>
              )}

              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                {visiblePosts.length} Articles
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        {visiblePosts.length ? (
          <>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {visiblePosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}

            <div className="flex items-center justify-center gap-5 mt-16">
              {pageNumber > 1 && (
                <Button
                  type="link"
                  href={`/posts?page=${pageNumber - 1}${
                    category ? `&category=${category}` : ""
                  }`}
                  text="Previous"
                  leftIcon={<HiChevronLeft />}
                />
              )}

              <div className="px-5 py-2 rounded-full bg-white border shadow-sm text-sm font-medium">
                Page {pageNumber}
              </div>

              {hasNextPage && (
                <Button
                  type="link"
                  href={`/posts?page=${pageNumber + 1}${
                    category ? `&category=${category}` : ""
                  }`}
                  text="Next"
                  rightIcon={<HiChevronRight />}
                />
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border py-24 flex flex-col items-center">
            <MdOutlineImageNotSupported size={70} className="text-gray-300" />

            <h3 className="text-2xl font-semibold mt-6">No articles found</h3>

            <p className="text-gray-500 mt-2">
              We couldn't find any articles in this category.
            </p>

            <Button
              type="link"
              href="/posts"
              text="Browse all articles"
              styles="mt-8"
            />
          </div>
        )}
      </section>
    </main>
  );
}
