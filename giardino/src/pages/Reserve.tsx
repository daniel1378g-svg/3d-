// Reservation page and the status page a guest returns to with their reference and key.
import { useEffect, useState } from "react";
import { useSite, API_BASE } from "@/site";
import { ReservationFlow, StatusView } from "@/reservation/Flow";
import { useLocation } from "@/lib/router";
import { Img } from "@/components/Img";
import { HoursList, ClosureNotices } from "@/components/Hours";
import { RESTAURANT } from "@/content/restaurant";
import { Phone } from "@/components/icons";
import { Link } from "@/components/Link";
import { useReveals } from "@/lib/reveal";
import { fmtDayLong, fmtTime } from "@/lib/format";
import type { Status } from "@shared/reservation";

export default function Reserve() {
  const { t, lang } = useSite();
  useReveals(`reserve-${lang}`);
  return (
    <>
      <header className="page-head grain">
        <div className="engraving" aria-hidden="true" />
        <div className="wrap page-head__grid">
          <div>
            <p className="kicker">{t.reserve.kicker}</p>
            <h1 className="display h-xl">{t.reserve.title}</h1>
            <p className="lead">{t.reserve.lead}</p>
            <div className="notice" style={{ marginTop: 26, maxWidth: 560 }}>
              <strong>{t.reserve.phoneTitle}</strong>
              <p>{t.reserve.phoneBody}</p>
              <a className="textlink num" href={RESTAURANT.phoneHref}><Phone />{RESTAURANT.phoneDisplay}</a>
            </div>
          </div>
          <div className="page-head__media arch" style={{ overflow: "hidden" }}>
            <Img id="interior-stone" sizes="(min-width: 900px) 34vw, 92vw" priority style={{ height: "100%" }} />
          </div>
        </div>
      </header>
      <section className="wrap" style={{ paddingBottom: "clamp(80px, 10vw, 140px)" }} aria-label={t.reserve.title}>
        <ReservationFlow />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 32, marginTop: 64 }}>
          <div>
            <h2 className="display h-s" style={{ marginBottom: 12 }}>{t.hours.title}</h2>
            <HoursList />
          </div>
          <ClosureNotices />
        </div>
      </section>
    </>
  );
}

/** GET /api/reservations/:ref?token= (server/api.ts) – no name, phone or e-mail */
type StatusData = { ref: string; status: Status; date: string; time: string; party: number; staffNote: string | null; updatedAt: string };

export function StatusPage() {
  const { t, lang, href } = useSite();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const ref = params.get("ref") ?? "";
  const token = params.get("token") ?? "";
  const [data, setData] = useState<StatusData | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "missing" | "offline" | "proposal">("loading");
  const load = async () => {
    if (!API_BASE) return setState("proposal");
    if (!ref || !token) return setState("missing");
    try {
      const r = await fetch(`${API_BASE}/reservations/${encodeURIComponent(ref)}?token=${encodeURIComponent(token)}`, { headers: { Accept: "application/json" } });
      if (!r.ok) return setState("missing");
      setData(await r.json());
      setState("ok");
    } catch {
      setState("offline");
    }
  };
  useEffect(() => {
    load();
    const id = window.setInterval(() => document.visibilityState === "visible" && load(), 30000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, token]);
  return (
    <section className="page-head grain">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <p className="kicker">{t.reserve.kicker}</p>
        <h1 className="display h-l" style={{ margin: "20px 0 30px" }}>{t.reserve.states.statusLink}</h1>
        <div className="resv__card">
          {state === "loading" && <p className="result">{t.reserve.states.loading}</p>}
          {state === "missing" && <p className="result">{t.reserve.states.notFound}</p>}
          {state === "offline" && <p className="result">{t.reserve.errors.network}</p>}
          {state === "proposal" && <p className="result">{t.reserve.handoff.body}</p>}
          {state === "ok" && data && (
            <StatusView
              sub={{ ref: data.ref, status: data.status, duplicate: false, message: data.staffNote }}
              details={
                <p className="num">
                  {fmtDayLong(data.date, lang)} · {fmtTime(data.time, lang)} · {t.reserve.party.persons(data.party)}
                </p>
              }
            />
          )}
          <div className="result" style={{ paddingTop: 0, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {API_BASE && <button type="button" className="btn btn--ghost btn--small" onClick={load}>{t.reserve.states.refresh}</button>}
            {state === "ok" && data && (data.status === "pending" || data.status === "confirmed") && (
              <button type="button" className="btn btn--ghost btn--small" onClick={async () => {
                if (!window.confirm(t.reserve.states.cancelConfirm)) return;
                const r = await fetch(`${API_BASE}/reservations/${encodeURIComponent(ref)}/cancel`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ token }) }).catch(() => null);
                if (r?.ok) load();
              }}>{t.reserve.states.cancel}</button>
            )}
            <Link href={href("reserve")} className="btn btn--small">{t.reserve.states.newRequest}</Link>
            <a className="textlink num" href={RESTAURANT.phoneHref}><Phone />{RESTAURANT.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
