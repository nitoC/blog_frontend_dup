import { IPost } from "@/interfaces";
import PostCard from "./ui/cards/PostCard";
import { MdOutlineImageNotSupported } from "react-icons/md";
import Button from "./ui/Button";

const LatestUpdates = ({ posts }: { posts: IPost[] }) => {
  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <h2 className="heading">
              Latest <span className="text-primary">Updates</span>
            </h2>

            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest articles, tutorials, product
              updates, and software engineering insights.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 mt-12">
              <MdOutlineImageNotSupported
                size={64}
                className="text-gray-300"
              />

              <h3 className="mt-5 text-xl font-semibold text-gray-700">
                No articles yet
              </h3>

              <p className="mt-2 text-gray-500">
                Check back soon for new updates.
              </p>
            </div>
          )}

          {posts.length > 0 && (
            <div className="mt-14 flex justify-center">
              <Button
                type="link"
                href="/posts"
                text="View All Articles"
                size="medium"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LatestUpdates;