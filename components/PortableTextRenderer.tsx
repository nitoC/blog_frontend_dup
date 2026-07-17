// components/PortableTextRenderer.tsx
import { urlFor } from "@/lib/image";
import { PortableText } from "@portabletext/react";
import type { ComponentProps, ReactNode } from "react";

type PortableTextValue = ComponentProps<typeof PortableText>["value"];

type ImageValue = {
  _type: "image";
  _key: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
};

type BlockProps = { children?: ReactNode };

const components: ComponentProps<typeof PortableText>["components"] = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        /* Wrapped in a container block to handle layout boundaries cleanly */
        <span className="block my-8 md:my-12 clear-both w-full overflow-hidden">
          <img
            src={urlFor(value).width(1200).url()}
            // block mx-auto centers it; object-cover max-h controls shape dynamically
            className="block mx-auto w-full max-h-[300px] sm:max-h-[450px] md:max-h-[550px] object-cover rounded-xl md:rounded-2xl border border-slate-200/60 shadow-md"
            alt={value.alt || ""}
          />
          {value.alt && (
            <span className="block text-center text-xs md:text-sm text-slate-400 mt-3 italic px-4">
              {value.alt}
            </span>
          )}
        </span>
      );
    },
  },
  block: {
    // Explicit style injection for headers with tailored line-height (leading) and margins
    h1: ({ children }: BlockProps) => (
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-indigo-950 mt-10 mb-5 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: BlockProps) => (
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-indigo-950 mt-10 mb-4 pb-1 border-l-4 border-emerald-500 pl-3 md:pl-4 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }: BlockProps) => (
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-violet-800 mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }: BlockProps) => (
      <h4 className="text-base sm:text-lg md:text-xl font-bold text-sky-800 mt-6 mb-2 leading-normal">
        {children}
      </h4>
    ),
    normal: ({ children }: BlockProps) => (
      /* Controlled line height (leading-relaxed) and tight horizontal paragraph compression */
      <p className="text-base md:text-lg text-slate-700 leading-relaxed md:leading-loose mb-6 font-normal">
        {children}
      </p>
    ),
    blockquote: ({ children }: BlockProps) => (
      <blockquote className="border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50/60 to-transparent rounded-r-xl px-4 py-3 md:px-6 md:py-4 my-8 text-slate-800 font-normal italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Exact style overrides for inline bold text highlights
    strong: ({ children }: BlockProps) => (
      <strong className="text-slate-900 bg-indigo-50/80 px-1.5 py-0.5 mx-0.5 rounded font-semibold inline-block md:inline">
        {children}
      </strong>
    ),
    // Exact style overrides for hyperlinked components
    link: ({ children, value }: BlockProps & { value?: { href?: string } }) => (
      <a
        href={value?.href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-600 font-semibold no-underline border-b-2 border-emerald-200 hover:border-emerald-500 hover:text-emerald-700 transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
};

export default function PortableTextRenderer({
  value,
}: {
  value: PortableTextValue;
}) {
  return <PortableText value={value} components={components} />;
}
