import Link from "next/link";
import Image from "next/image";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { IPost } from "@/interfaces";

const PostCard = ({ post }: { post: IPost }) => {
  const category = post.categories?.[0]?.replace("Tech ", "");

  return (
    <Link
      href={`/post/${post.slug.current}`}
      className="group block h-full w-full"
    >
      <article className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl">

        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.mainImageUrl}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {category && (
            <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">

          <h2 className="line-clamp-2 text-xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
            {post.title}
          </h2>

          <div className="mt-auto pt-6">

            <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500">

              <div className="flex items-center gap-2">
                <FaRegUser className="text-gray-400" />
                <span>{post.authorName}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-gray-400" />

                <time dateTime={post.publishedAt}>
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(post.publishedAt))}
                </time>
              </div>

            </div>

            <div className="mt-5 flex items-center font-semibold text-blue-600">
              Read Article

              <HiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </div>

          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;