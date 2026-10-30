// Renders the blocks of a long text: headings, paragraphs (with **bold**), lists, quotes and photos.
import { Fragment, type ReactNode } from "react";
import type { Block } from "@/content/articles";
import { Img } from "./Img";

export function rich(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => (p.startsWith("**") && p.endsWith("**") ? <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong> : <Fragment key={i}>{p}</Fragment>));
}

export function ArticleBody({ blocks, dark = false }: { blocks: Block[]; dark?: boolean }) {
  const muted = dark ? "text-creme/85" : "text-tinta/85";
  const head = dark ? "text-creme" : "text-vinho";
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b, i) => {
        if (b.t === "img") return <Img key={i} id={b.id} sizes="(min-width: 900px) 760px, 100vw" className="my-6 aspect-[16/9] w-full rounded-[24px]" />;
        if (b.t === "ul") return <ul key={i} className={`flex flex-col gap-2 pl-1 ${muted}`}>{b.items.map((x) => <li key={x} className="flex gap-3"><span className="text-brasa" aria-hidden="true">✱</span><span>{rich(x)}</span></li>)}</ul>;
        if (b.t === "h2") return <h2 key={i} className={`display mt-8 text-[clamp(2rem,4vw,3.2rem)] ${head}`}>{b.text}</h2>;
        if (b.t === "h3") return <h3 key={i} className={`mt-4 font-display text-[1.45rem] font-bold leading-tight ${head}`} style={{ fontStretch: "88%" }}>{b.text}</h3>;
        if (b.t === "quote") return <blockquote key={i} className="serif-i border-l-4 border-brasa pl-5 text-[1.4rem]">{rich(b.text)}</blockquote>;
        return <p key={i} className={`text-[1.08rem] leading-[1.75] ${muted}`}>{rich(b.text)}</p>;
      })}
    </div>
  );
}
