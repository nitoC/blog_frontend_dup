import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("q") || "";

  const posts = await client.fetch(
    `*[_type == "post" && title match $searchTerm]{
      _id,
      title,
      slug,
      "mainImageUrl": mainImage.asset->url
    }`,
    {
      searchTerm: `${searchTerm}*`, // prefix match
    },
  );

  return NextResponse.json(posts);
}
