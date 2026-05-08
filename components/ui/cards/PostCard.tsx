import { IPost } from "@/interfaces";
import Image from "next/image";

const PostCard = ({ post }: { post: IPost }) => {
  return (
    <div
      className=" bg-white w-full justify-items-center max-w-100 shadow-[0_20px_80px_1px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
      key={post._id}
    >
      <a href={`/post/${post.slug.current}`}>
        <div className="post_content">
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              overflow: "hidden",
              position: "relative",
            }}
            className="post_image_wrapper"
          >
            <Image
              src={post.mainImageUrl}
              alt={post.title}
              className="post_image"
              fill
            />
          </div>
          <div className="post_info w-full flex flex-col items-start gap-1 p-4">
            <h2>
              {post.title.length > 30
                ? post.title.slice(0, 30) + "..."
                : post.title}
            </h2>
            <p className="text-gray-500 text-sm">{post.authorName}</p>
            <p className="text-xs text-white bg-purple-700 py-1 px-2">
              {" "}
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "medium",
                // timeStyle: "short",
              }).format(new Date(post.publishedAt))}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PostCard;
