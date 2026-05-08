// blog-frontend/app/page.tsx
import LatestUpdates from "@/components/LatestUpdates";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import PostCard from "@/components/ui/cards/PostCard";
import { IPost } from "@/interfaces";
import { client } from "@/lib/sanity";
import { MdOutlineImageNotSupported } from "react-icons/md";
// import { getDayBanner } from "@/lib/utils";
// import Image from "next/image";

const pageTotal = 10;
const query = `
*[_type == "post" && (!defined($category) || $category in categories[]->title)][$start...$end]{
  _id,
  title,
  slug,
  publishedAt,
  "authorName": author->name,
  "mainImageUrl": mainImage.asset->url,
  "categories": categories[]->title
} | order(publishedAt desc)
`;

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page: currentPage } = await searchParams;
  const currentPageNumber = Number(currentPage ?? 1);
  const pageNumber =
    Number.isInteger(currentPageNumber) && currentPageNumber > 0
      ? currentPageNumber
      : 1;
  console.log("Search params:", { category, currentPage });
  const now = new Date().toISOString();
  console.log("Category:", category);
  console.log("Category:", `Tech ${category ? category : ""}`);

  const start = (pageNumber - 1) * pageTotal;
  const end = start + pageTotal + 1;
  const posts = await client.fetch(query, {
    category: category ? `Tech ${category}` : null,
    start: start,
    end: end,
  });
  console.log("Posts:", posts);
  // console.log("Posts:", posts[0]);
  // console.log("Posts: date", posts[0].publishedAt);
  // console.log(typeof posts[0].publishedAt);

  const sortedPosts = posts.sort((a: IPost, b: IPost) => {
    if (!a.publishedAt || !b.publishedAt) return []; // Handle missing dates
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <main>
      <Header />
      <div className="clip">
        <section className="latest-updates bg-gray-50 py-12 px-4">
          <h2 className="text-gray-600 font-bold capitalize">
            {category || "All"}
          </h2>
          {/* <p>Check out our latest blog posts and tech updates!</p> */}
          {posts.length > 0 ? (
            <div className="updates_list w-full m-auto justify-items-center md:justify-items-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {sortedPosts.map((post: IPost) => (
                <PostCard post={post} key={post._id} />
              ))}
            </div>
          ) : (
            <div className="m-auto flex justify-center items-center p-8 flex-col gap-2">
              <MdOutlineImageNotSupported size={60} className="text-gray-200" />
              <p>No content yet</p>
            </div>
          )}
        </section>
        <div className="flex justify-center gap-4 mt-10">
          {pageNumber > 1 && (
            <Button
              type="link"
              href={`/posts?page=${pageNumber - 1}${category ? `&category=${category}` : ""}`}
              text="Previous"
              styles=""
            />
          )}
          <span className="self-center">Page {pageNumber}</span>
          {posts.length > pageTotal && (
            <Button
              type="link"
              href={`/posts?page=${pageNumber + 1}${category ? `&category=${category}` : ""}`}
              text="Next"
              styles=""
            />
          )}
        </div>
        {/* <div className="more_btn_container p-4 flex justify-center">
          <Button
            type="link"
            text="See More"
            size="medium"
            styles="mt-6"
            href="/posts"
          />
        </div> */}
      </div>
    </main>
  );
}
