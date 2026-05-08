import { IPost } from "@/interfaces";

const dateFormatter = (dateString: string) => {
  // const date = new Date(dateString);
  // // return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
  // const currentDate = new Date();
};

// get posts for a specific day, optionally filtered by category
const getDayItems = (dateString: string, posts: IPost[], category?: string) => {
  const date = new Date(dateString);
  const dayPosts = posts.filter((post) => {
    const postDate = new Date(post.publishedAt);
    return (
      postDate.getFullYear() === date.getFullYear() &&
      postDate.getMonth() === date.getMonth() &&
      postDate.getDate() === date.getDate() &&
      (!category ||
        post.categories?.some(
          (cat: { title: string }) => cat.title === category,
        ))
    );
  });
  return {
    date: dateString,
    posts: dayPosts.length > 0 ? dayPosts : posts,
  };
};

// get the banner post for the day, with a special category for Thursdays
const getDayBanner = (dateString: string, posts: IPost[]) => {
  const date = new Date(dateString);

  const day = date.getDay();
  //   const month = date.getMonth();
  //   const year = date.getFullYear();
  //   const dateTime = date.getDate();
  //   const dateMatch = day === date.getDate() && month === date.getMonth() && year === date.getFullYear();
  let item: IPost;

  if (day === 4) {
    item = getDayItems(dateString, posts, "Tech games").posts[0];
    console.log("Tech games item:", item);
    return item;
  }

  return getDayItems(dateString, posts).posts[0];

  // const dayPosts = posts.find((post) => {
  //     const postDate = new Date(post.publishedAt);
  //     return (postDate.getFullYear() === date.getFullYear() &&
  //         postDate.getMonth() === date.getMonth() &&
  //         postDate.getDate() === date.getDate());
  // });
  // return {
  //     date: dateString,
  //     posts: dayPosts
  // };
};

export { dateFormatter, getDayItems, getDayBanner };
