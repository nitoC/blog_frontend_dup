// components/PortableTextRenderer.tsx
import { urlFor } from "@/lib/image";
import { PortableText } from "@portabletext/react";
import type { ComponentProps, ReactNode } from "react";

type PortableTextValue = ComponentProps<typeof PortableText>["value"];
type ImageValue = { asset: { url: string } };
type BlockProps = { children?: ReactNode };

const components: ComponentProps<typeof PortableText>["components"] = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      return (
        <img
          src={urlFor(value).width(800).url()}
          className="m-4 rounded-lg w-full"
          width={600}
          height={400}
          alt=""
        />
      );
    },
  },
  block: {
    h1: ({ children }: BlockProps) => (
      <h1 className="text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }: BlockProps) => (
      <h2 className="text-2xl font-semibold">{children}</h2>
    ),
    normal: ({ children }: BlockProps) => <p className="mb-4">{children}</p>,
  },
};

export default function PortableTextRenderer({
  value,
}: {
  value: PortableTextValue;
}) {
  return <PortableText value={value} components={components} />;
}
