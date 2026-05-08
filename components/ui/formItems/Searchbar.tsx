"use client";
import { useEffect, useState } from "react";

const Searchbar = ({ placeholder }: { placeholder: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setloading] = useState(false);
  const [drop, setdrop] = useState(false);
  // let debounceTimeout;

  useEffect(() => {
    if (searchTerm.length <= 2) {
      setSearchResults([]);
      setdrop(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setdrop(true);
        setloading(true);

        console.log("fetching data...");

        const res = await fetch(
          `/api/search?q=${encodeURIComponent(searchTerm)}`,
          { cache: "no-store" },
        );

        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setloading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    const clearSearch = () => {
      setSearchTerm("");
    };
    window.addEventListener("click", clearSearch);
    return () => window.removeEventListener("click", clearSearch);
  }, []);

  return (
    <div className="relative">
      <div className="search relative overflow-hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
      </div>
      {drop && (
        <div className="absolute z-2 border border-gray-100 rounded-medium left-[50%] -translate-x-[50%] -bottom-[400%] -my-5 h-50 max-w-150 m-auto w-full rounded-md bg-white">
          {searchResults.length > 0 ? (
            <div className="mt-4">
              {searchResults.length > 0 &&
                searchResults.map((post: any) => (
                  <a key={post._id} href={`/post/${post.slug.current}`}>
                    <div className="p-2 hover:underline py-2 px-4 text-sm text-gray-600">
                      {post.title}
                    </div>
                  </a>
                ))}
            </div>
          ) : (
            <div className="flex p-8 justify-center inset-0 bg-white items-center text-gray-500">
              {loading && " fetching posts..."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
