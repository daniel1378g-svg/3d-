import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router";
import { HTML_LANG, TEXT, UI, fill } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "phone" | "message";
const FIELDS: Field[] = ["name", "email", "phone", "message"];
// Netlify Forms in the real build (VITE_FORM=netlify, form «contact» declared in the static HTML); anything else,
// and always the claude.ai preview, is test mode: nothing leaves the page. `?formerror` shows the error message.
const MODE = !__ARTIFACT__ && import.meta.env.VITE_FORM === "netlify" ? "netlify" : "test";

/** The live form (Nom, E-mail, Téléphone, Message, all required), its live confirmation and error messages. */
export function ContactForm() {
  const { lang } = useSite();
  const location = useLocation();
  const id = useId();
  const prefill = (location.state as { message?: string } | null)?.message ?? "";
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", phone: "", message: prefill });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const summary = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefill) {
      setValues((v) => ({ ...v, message: prefill }));
      setTimeout(() => nameInput.current?.focus({ preventScroll: true }), 600);
    }
  }, [prefill]);

  const labels: Record<Field, string> = { name: TEXT.formName[lang], email: TEXT.formEmail[lang], phone: TEXT.formPhone[lang], message: TEXT.formMessage[lang] };
  const validate = (v = values) => {
    const e: Partial<Record<Field, string>> = {};
    for (const f of FIELDS) if (!v[f].trim()) e[f] = UI.errRequired[lang];
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = UI.errEmail[lang];
    if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 6) e.phone = UI.errPhone[lang];
    return e;
  };

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    if ((ev.currentTarget.elements.namedItem("bot-field") as HTMLInputElement | null)?.value) return;
    setState("sending");
    try {
      if (MODE === "netlify") {
        const body = new URLSearchParams({ "form-name": "contact", ...values, langue: lang });
        const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((r) => setTimeout(r, 700));
        if (new URLSearchParams(location.search).has("formerror")) throw new Error("test");
      }
      setState("sent");
    } catch {
      setState("error");
    }
  };

  if (state === "sent")
    return (
      <div role="status" className="rounded-[26px] bg-flour p-8 shadow-set ring-1 ring-espresso/10">
        <p className="display text-2xl text-cocoa">{TEXT.formThanks[lang]}</p>
        {MODE === "test" && <p className="mt-3 text-sm text-espresso/75">{UI.testMode[lang]}</p>}
      </div>
    );

  const errorCount = Object.keys(errors).length;
  return (
    <form id="formulaire" name="contact" onSubmit={submit} noValidate className="rounded-[26px] bg-flour p-6 shadow-set ring-1 ring-espresso/10 md:p-9">
      <h2 className="display text-3xl text-cocoa">{TEXT.contactUs[lang]}</h2>
      {prefill && <p className="mt-2 text-sm font-semibold text-caramel">{UI.prefilled[lang]}</p>}
      <div ref={summary} tabIndex={-1} className="outline-none">
        {errorCount > 0 && (
          <div role="alert" className="mt-5 rounded-xl bg-swiss/10 p-4 text-[15px] text-swiss-text ring-1 ring-swiss/30">
            <p className="font-semibold">{fill(UI.errSummary[lang], { n: errorCount })}</p>
            <ul className="mt-1 list-disc pl-5">
              {FIELDS.filter((f) => errors[f]).map((f) => (
                <li key={f}>
                  <a href={`#${id}-${f}`} className="underline" onClick={(e) => { e.preventDefault(); document.getElementById(`${id}-${f}`)?.focus(); }}>
                    {labels[f].replace(/:$/, "")}: {errors[f]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="hidden">
        <label>
          Ne pas remplir <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {FIELDS.map((f) => {
          const common = {
            id: `${id}-${f}`,
            name: f,
            value: values[f],
            required: true,
            "aria-required": true,
            "aria-invalid": errors[f] ? true : undefined,
            "aria-describedby": errors[f] ? `${id}-${f}-err` : undefined,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((v) => ({ ...v, [f]: e.target.value })),
            onBlur: () => errors[f] && setErrors((er) => ({ ...er, [f]: validate()[f] })),
            className: cn("w-full rounded-xl bg-white px-4 text-[16px] ring-1 focus:outline-none focus:ring-2 focus:ring-azulejo", errors[f] ? "ring-swiss" : "ring-espresso/20"),
          };
          return (
            <div key={f} className={f === "name" || f === "message" ? "md:col-span-2" : undefined}>
              <label htmlFor={`${id}-${f}`} className="mb-1.5 block font-semibold">
                {labels[f]} <span aria-hidden="true" className="text-swiss-text">*</span>
                <span className="sr-only"> ({UI.required[lang]})</span>
              </label>
              {f === "message" ? (
                <textarea {...common} rows={6} lang={HTML_LANG[lang]} className={cn(common.className, "py-3")} />
              ) : (
                <input
                  {...common}
                  ref={f === "name" ? nameInput : undefined}
                  type={f === "email" ? "email" : f === "phone" ? "tel" : "text"}
                  autoComplete={f === "name" ? "name" : f === "email" ? "email" : "tel"}
                  inputMode={f === "phone" ? "tel" : f === "email" ? "email" : undefined}
                  className={cn(common.className, "h-12")}
                />
              )}
              {errors[f] && (
                <p id={`${id}-${f}-err`} className="mt-1.5 text-sm font-semibold text-swiss-text">
                  {errors[f]}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {state === "error" && (
        <p role="alert" className="mt-5 rounded-xl bg-swiss/10 p-4 font-semibold text-swiss-text ring-1 ring-swiss/30">
          {TEXT.formError[lang]}
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn btn-dark min-w-40">
          {state === "sending" ? UI.sending[lang] : TEXT.formSend[lang]}
        </button>
        {MODE === "test" && <p className="text-sm text-espresso/70">{UI.testMode[lang]}</p>}
      </div>
    </form>
  );
}
