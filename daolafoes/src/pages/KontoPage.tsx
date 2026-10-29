// Konto: the live login, register and password-reset forms, field for field, as honest test-mode front-ends.
// They check the entries and say "Vorschau: nichts wurde gesendet". Never a fake confirmation.
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { CANTONS, Field, fieldCls, labelCls } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { cn } from "@/lib/utils";

function useTestForm(required: string[], extra?: (d: FormData) => Record<string, string>) {
  const { lang } = useSite();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const validate = (form: HTMLFormElement) => {
    const d = new FormData(form);
    const errs: Record<string, string> = {};
    for (const k of required) if (!String(d.get(k) ?? "").trim()) errs[k] = UI.fieldMissing[lang];
    const em = String(d.get("email") ?? "").trim();
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) errs.email = UI.emailInvalid[lang];
    return { ...errs, ...(extra ? extra(d) : {}) };
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(e.currentTarget);
    setErrors(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setDone(true);
  };
  const blur = (e: React.FocusEvent<HTMLFormElement>) => {
    const name = (e.target as unknown as HTMLInputElement).name;
    if (name) setErrors((prev) => ({ ...prev, [name]: validate(e.currentTarget)[name] ?? "" }));
  };
  return { errors, done, submit, blur };
}

function Preview({ done }: { done: boolean }) {
  const { lang } = useSite();
  return (
    <p role="status" className="text-[15px]">
      {done && <span className="inline-block rounded-[14px] bg-marca px-4 py-3 text-fundo">{TX.n_formPreview[lang]}</span>}
    </p>
  );
}

function Login() {
  const { lang } = useSite();
  const f = useTestForm(["email", "password"]);
  return (
    <form noValidate onSubmit={f.submit} onBlur={f.blur} className="grid gap-4">
      <Field label={TX.emailL[lang]} name="email" type="email" required auto="email" error={f.errors.email} />
      <Field label={TX.passwort[lang]} name="password" type="password" required auto="current-password" error={f.errors.password} />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn">
          {TX.einloggen[lang]}
        </button>
        <span className="text-[13px] opacity-70">{TX.coRequired[lang]}</span>
      </div>
      <Preview done={f.done} />
    </form>
  );
}

function Register() {
  const { lang } = useSite();
  const f = useTestForm(["first_name", "last_name", "email", "password", "cpassword"], (d): Record<string, string> => (d.get("password") && d.get("password") !== d.get("cpassword") ? { cpassword: UI.passwordsDiffer[lang] } : {}));
  const field = fieldCls();
  return (
    <form noValidate onSubmit={f.submit} onBlur={f.blur} className="grid gap-5">
      <fieldset className="grid gap-4">
        <legend className="mb-2 font-display text-[22px] font-semibold">{TX.loginSub[lang]}</legend>
        <div role="radiogroup" className="flex gap-4 text-[15px]">
          {[TX.frau[lang], TX.herr[lang]].map((t, i) => (
            <label key={t} className="flex items-center gap-2">
              <input type="radio" name="title" value={i} className="h-4 w-4 accent-[var(--color-destaque)]" /> {t}
            </label>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={TX.vorname[lang]} name="first_name" required auto="given-name" error={f.errors.first_name} />
          <Field label={TX.nameL[lang]} name="last_name" required auto="family-name" error={f.errors.last_name} />
          <Field label={TX.emailL[lang]} name="email" type="email" required auto="email" error={f.errors.email} />
          <span />
          <Field label={TX.passwort[lang]} name="password" type="password" required auto="new-password" error={f.errors.password} />
          <Field label={TX.passwort2[lang]} name="cpassword" type="password" required auto="new-password" error={f.errors.cpassword} />
        </div>
      </fieldset>
      <fieldset className="grid gap-4">
        <legend className="mb-2 font-display text-[22px] font-semibold">{TX.adresseH[lang]}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={TX.firmaL[lang]} name="company" auto="organization" />
          <Field label={TX.adresseL[lang]} name="address" auto="street-address" />
          <Field label={TX.plzL[lang]} name="plz" auto="postal-code" />
          <Field label={TX.stadtL[lang]} name="city" auto="address-level2" />
          <Field label={TX.landL[lang]} name="country">
            <input name="country" defaultValue={TX.fSchweiz[lang]} className={field} />
          </Field>
          <Field label={TX.kantonL[lang]} name="state">
            <select name="state" className={field} defaultValue="">
              <option value="">{UI.choose[lang]}</option>
              {CANTONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label={TX.telL[lang]} name="tel" type="tel" auto="tel" />
        </div>
        <label className="flex items-center gap-3 text-[15px]">
          <input type="checkbox" name="newsletter" className="h-5 w-5 accent-[var(--color-destaque)]" /> {TX.newsletter[lang]}
        </label>
      </fieldset>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn">
          {TX.anmelden[lang]}
        </button>
        <span className="text-[13px] opacity-70">{TX.fRequired[lang]}</span>
      </div>
      <Preview done={f.done} />
    </form>
  );
}

function Reset() {
  const { lang } = useSite();
  const f = useTestForm(["email"]);
  return (
    <form noValidate onSubmit={f.submit} onBlur={f.blur} className="grid gap-4">
      <p className="text-[15px] text-linha">{TX.pwVergessen[lang]}</p>
      <Field label={TX.emailL[lang]} name="email" type="email" required auto="email" error={f.errors.email} />
      <div>
        <button type="submit" className="btn">
          {TX.pwReset[lang]}
        </button>
      </div>
      <Preview done={f.done} />
    </form>
  );
}

export default function KontoPage() {
  const { lang } = useSite();
  const [tab, setTab] = useState("login");
  const tabs = [
    { id: "login", label: TX.n_kontoTabLogin[lang] },
    { id: "register", label: TX.n_kontoTabRegister[lang] },
    { id: "reset", label: TX.n_kontoTabReset[lang] },
  ];
  return (
    <>
      <PageHero eyebrow={UI.testMode[lang]} title={TX.n_kontoTitle[lang].split(" | ")[0]} lang={lang}>
        <p className="mt-6 max-w-[640px] text-[clamp(16px,1.2vw,19px)] leading-relaxed text-fundo/80">{TX.n_kontoLine[lang]}</p>
      </PageHero>
      <section className="bg-fundo py-16 text-marca md:py-24">
        <div className="container-x max-w-[900px]">
          <Tabs.Root value={tab} onValueChange={setTab}>
            <Tabs.List aria-label={UI.konto[lang]} className="flex flex-wrap gap-1 border-b border-marca/20">
              {tabs.map((t) => (
                <Tabs.Trigger key={t.id} value={t.id} className={cn("relative px-4 pb-3 pt-1 font-body text-[14px] font-semibold uppercase tracking-[0.1em] opacity-70 data-[state=active]:opacity-100")}>
                  {t.label}
                  {tab === t.id && <motion.span layoutId="konto-tab" className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-destaque" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <div className="paper mt-8 p-6 md:p-10">
              <p className={cn(labelCls, "mb-5 rounded-[12px] bg-suave px-3 py-2 text-acento")}>{TX.n_formPreview[lang]}</p>
              <Tabs.Content value="login" className="outline-none">
                <Login />
              </Tabs.Content>
              <Tabs.Content value="register" className="outline-none">
                <Register />
              </Tabs.Content>
              <Tabs.Content value="reset" className="outline-none">
                <Reset />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </section>
    </>
  );
}
