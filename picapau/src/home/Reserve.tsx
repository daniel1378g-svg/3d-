// Section 7 (#reservation, port wine): the live booking heading and its three rules as three rows; on the
// right a white card with "Combien êtes-vous ?", chairs around a table and the right way to book.
import { copy } from "@/copy";
import { CONTACT } from "@/contact";
import { useSite } from "@/site";
import { PartyPicker } from "@/components/PartyPicker";
import { SplitText } from "@/components/ui";
import { LottieIcon } from "@/lottie/LottieIcon";

export function Reserve() {
  const { lang } = useSite();
  const t = copy(lang);
  const rows = [
    { who: t.info.bookingOnline, how: t.info.bookingOnlineAction, icon: "clock" as const },
    { who: t.info.bookingPhone, how: t.info.bookingPhoneAction, icon: "phone" as const },
    { who: t.info.bookingLarge, how: t.info.bookingLargeAction, icon: "wine" as const },
  ];
  return (
    <section id="reservation" className="tone-vinho tex-cork relative z-[2] py-[clamp(90px,11vw,170px)]" aria-labelledby="reservation-title">
      <div className="container grid items-start gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid gap-8 lg:sticky lg:top-[calc(var(--header-h)+var(--label-h)+32px)]">
          <p className="eyebrow text-dourado">{t.nav.book}</p>
          <SplitText as="h2" id="reservation-title" text={t.reservation.kicker} className="display text-branco [hyphens:manual]" style={{ fontSize: "clamp(48px, 6.2vw, 120px)", lineHeight: 0.88 }} />
          <ul className="m-0 grid list-none p-0">
            {rows.map((r) => (
              <li key={r.who} className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 border-t border-branco/20 py-5 last:border-b sm:grid-cols-[auto_1fr_auto]">
                <LottieIcon name={r.icon} mode="hover" size={44} color="#FFFAF2" accent="#F2B84B" />
                <span className="font-display text-[clamp(24px,2.4vw,34px)] font-bold uppercase leading-none">{r.who}</span>
                <span className="col-start-2 font-display text-lg font-medium uppercase tracking-[0.08em] text-dourado sm:col-start-3">{r.how}</span>
              </li>
            ))}
          </ul>
          <p className="max-w-[52ch] text-branco/85">{t.info.bookingNote}</p>
          <a href={CONTACT.phoneHref} className="link-line justify-self-start text-branco">
            {t.info.callLabel}
          </a>
        </div>
        <div className="rounded-[28px] bg-branco p-[clamp(20px,3.4vw,44px)] text-tinta shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
          <PartyPicker tone="light" idPrefix="section" />
        </div>
      </div>
    </section>
  );
}
