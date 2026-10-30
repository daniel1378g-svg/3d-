// In the claude.ai preview the forms cannot send and mailto links are unreliable: the finished message is shown to
// copy instead, with the address as plain text. Nothing claims that a message was sent.
import { useRef, useState } from "react";
import { useSite } from "@/site";
import { EMAIL } from "@/content/facts";

export function ComposedMessage({ subject, body }: { subject: string; body: string }) {
  const { t } = useSite();
  const area = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);
  const text = `${subject}\n\n${body}`;
  const copy = () => {
    const done = () => { setCopied(true); window.setTimeout(() => setCopied(false), 2000); };
    navigator.clipboard?.writeText(text).then(done, () => { area.current?.select(); });
  };
  return (
    <div className="flex flex-col gap-3 rounded-[20px] bg-creme/[0.07] p-4 ring-1 ring-creme/15" role="status">
      <p className="text-sm">{t.contact.previewCompose}</p>
      <p className="select-all font-display text-[1.05rem] font-bold">{EMAIL}</p>
      <textarea ref={area} readOnly id="composed-message" className="field min-h-[140px] text-sm" value={text} aria-label={t.contact.message} />
      <button type="button" className="pill pill-sm self-start" onClick={copy}>{copied ? t.contact.copied : t.contact.copy}</button>
    </div>
  );
}
