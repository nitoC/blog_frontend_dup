import { IPost } from "@/interfaces";
import PostCard from "./ui/cards/PostCard";
import { MdOutlineImageNotSupported } from "react-icons/md";
import Button from "./ui/Button";

const LatestUpdates = ({ posts }: { posts: IPost[] }) => {
  return (
    <>
      <section className=" latest-updates bg-gray-50 text-center py-12 px-4">
        <div className="clip">
          <div className="flex flex-col items-center justify-center">
            <h2 className="heading">
              Latest <span className="text-primary">Updates</span>
            </h2>
            <p>Check out our latest blog posts and tech updates!</p>
          </div>
          {posts.length > 0 ? (
            <div className="updates_list w-full md:max-w-5xl justify-center justify-items-center md:justify-start m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {posts.map((post: IPost) => (
                <PostCard post={post} key={post._id} />
              ))}
            </div>
          ) : (
            <div className="m-auto flex justify-center items-center p-8 flex-col gap-2">
              <MdOutlineImageNotSupported size={60} className="text-gray-200" />
              <p>No content yet</p>
            </div>
          )}
        </div>
      </section>
      <div className="more_btn_container p-4 flex justify-center">
        <Button
          type="link"
          text="See More"
          size="medium"
          styles="mt-6"
          href="/posts"
        />
      </div>
    </>
  );
};

export default LatestUpdates;
