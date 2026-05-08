"use client";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import Searchbar from "../ui/formItems/Searchbar";
import clsx from "clsx";
import { useState } from "react";

const Header = () => {
  const [drop, setdrop] = useState(false);
  return (
    <header className="relative bg-white">
      <div className="relative z-2">
        <div className="top flex items-center justify-between py-2 px-4">
          <Link href="/">
            <Image
              src="/logo/logo.png"
              alt="Genus Lab Logo"
              width={70}
              height={30}
            />
          </Link>
          <div className="menu_container">
            <button onClick={() => setdrop(!drop)} className="menu_button">
              <HiMenuAlt3 size={30} />
            </button>
          </div>
        </div>
        <nav className="hidden navigation md:flex gap-4 justify-center p-4 bg-primary text-white">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="/posts?category=games">
            Studio games
          </Link>
          <Link className="hover:underline" href="/posts?category=tips">
            Tech tips
          </Link>
          <Link className="hover:underline" href="/posts?category=updates">
            Tech updates
          </Link>
          <Link className="hover:underline" href="/posts?category=debates">
            Tech debates
          </Link>
          <Link className="hover:underline" href="/posts?category=review">
            Tech reviews
          </Link>
        </nav>
      </div>
      <div
        className={clsx(
          "dropdown absolute -top-250 inset-x-0 z-1 bg-white flex flex-col p-8",
          drop && "translate-y-263 md:translate-y-284",
        )}
      >
        <Searchbar placeholder="Search posts..." />
        <nav className="dropdown_menu md:hidden flex flex-col rounded-md p-4 gap-2">
          <Link className="hover:underline px-4 py-2 text-gray-500" href="/">
            Home
          </Link>
          <Link
            className="hover:underline px-4 py-2 text-gray-500"
            href="/posts?category=games"
          >
            Studio games
          </Link>
          <Link
            className="hover:underline px-4 py-2 text-gray-500"
            href="/posts?category=tips"
          >
            Tech tips
          </Link>
          <Link
            className="hover:underline px-4 py-2 text-gray-500"
            href="/posts?category=updates"
          >
            Tech updates
          </Link>
          <Link
            className="hover:underline px-4 py-2 text-gray-500"
            href="/posts?category=debates"
          >
            Tech debates
          </Link>
          <Link
            className="hover:underline px-4 py-2 text-gray-500"
            href="/posts?category=review"
          >
            Tech reviews
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
