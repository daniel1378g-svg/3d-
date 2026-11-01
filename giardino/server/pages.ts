// Self-contained HTML answers for visitors without JavaScript (the fallback forms post here directly). No scripts and
// no external files, so the strict CSP holds; the look follows the site (ivory, charcoal, olive).
import { escapeHtml as e } from "./http.ts";
import { HTML_LANG, PHONE, TEXTS, formatDate, pagePath, type FieldCode, type FieldName, type Lang } from "./strings.ts";
import type { ScheduleError } from "../shared/schedule.ts";

const STYLE = `
:root{color-scheme:light;--ivory:#f6f1e7;--ink:#24231f;--olive:#29381b;--sage:#a9ad81;--line:#d9d1bf}
*{box-sizing:border-box}
body{margin:0;background:var(--ivory);color:var(--ink);font:17px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:640px;margin:0 auto;padding:56px 20px 72px}
.brand{font:600 13px/1 system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--olive);margin:0 0 40px}
h1{font:500 clamp(28px,6vw,40px)/1.15 Georgia,"Times New Roman",serif;margin:0 0 16px;color:var(--olive)}
dl{display:grid;grid-template-columns:auto 1fr;gap:6px 20px;margin:28px 0;padding:20px 0;border-block:1px solid var(--line)}
dt{color:#5d5a50}dd{margin:0;font-variant-numeric:tabular-nums}
ul{padding-left:20px}li{margin:4px 0}
a{color:var(--olive);text-underline-offset:3px}
a:focus-visible{outline:3px solid var(--olive);outline-offset:3px}
.btn{display:inline-block;margin:8px 12px 0 0;padding:12px 20px;border-radius:999px;background:var(--olive);color:var(--ivory);text-decoration:none;font-weight:600}
.btn--ghost{background:none;color:var(--olive);box-shadow:inset 0 0 0 1px var(--olive)}
.muted{color:#5d5a50;font-size:15px}
`;

export function page(lang: Lang, title: string, body: string) {
  const t = TEXTS[lang];
  return `<!doctype html>
<html lang="${HTML_LANG[lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${e(title)} · ${e(t.siteName)}</title>
<style>${STYLE}</style>
</head>
<body>
<main>
<p class="brand">${e(t.siteName)}</p>
${body}
</main>
</body>
</html>`;
}

const phoneLine = (lang: Lang) => `<p>${e(TEXTS[lang].phoneIntro)} <a href="${PHONE.href}">${e(PHONE.display)}</a></p>`;

export function reservationReceived(lang: Lang, r: { ref: string; token: string; date: string; time: string; party: number; duplicate: boolean }) {
  const t = TEXTS[lang];
  const status = `${pagePath(lang, "status")}?ref=${encodeURIComponent(r.ref)}&token=${encodeURIComponent(r.token)}`;
  return page(
    lang,
    t.received,
    `<h1>${e(t.received)}</h1>
<p>${e(t.receivedBody)}</p>
${r.duplicate ? `<p class="muted">${e(t.duplicate)}</p>` : ""}
<dl>
<dt>${e(t.reference)}</dt><dd><strong>${e(r.ref)}</strong></dd>
<dt>${e(t.date)}</dt><dd>${e(formatDate(lang, r.date))}</dd>
<dt>${e(t.time)}</dt><dd>${e(r.time)}</dd>
<dt>${e(t.party)}</dt><dd>${e(r.party)}</dd>
</dl>
<p><a class="btn" href="${e(status)}">${e(t.statusLink)}</a></p>
<p class="muted">${e(t.statusHint)}</p>
${phoneLine(lang)}
<p><a href="/${lang}">${e(t.home)}</a></p>`,
  );
}

export type Problems = { fields?: Partial<Record<string, FieldCode>>; codes?: ScheduleError[] };

export function problemsPage(lang: Lang, back: string, problems: Problems) {
  const t = TEXTS[lang];
  const items = [
    ...Object.entries(problems.fields ?? {}).map(([field, code]) => {
      const label = t.fields[field as FieldName] ?? field;
      return `<li><strong>${e(label)}</strong>: ${e(t.fieldErrors[code as FieldCode] ?? t.fieldErrors.invalid)}</li>`;
    }),
    ...(problems.codes ?? []).map((c) => `<li>${e(t.schedule[c] ?? c)}</li>`),
  ];
  return page(
    lang,
    t.errorTitle,
    `<h1>${e(t.errorTitle)}</h1>
<p>${e(t.errorBody)}</p>
<ul>${items.join("")}</ul>
<p><a class="btn btn--ghost" href="${e(back)}">${e(t.back)}</a></p>
${phoneLine(lang)}`,
  );
}

export function noticePage(lang: Lang, title: string, text: string, back?: string) {
  const t = TEXTS[lang];
  return page(
    lang,
    title,
    `<h1>${e(title)}</h1>
<p>${e(text)}</p>
${back ? `<p><a class="btn btn--ghost" href="${e(back)}">${e(t.back)}</a></p>` : ""}
${phoneLine(lang)}
<p><a href="/${lang}">${e(t.home)}</a></p>`,
  );
}

export function messageReceived(lang: Lang, ref: string) {
  const t = TEXTS[lang];
  return page(
    lang,
    t.messageReceived,
    `<h1>${e(t.messageReceived)}</h1>
<p>${e(t.messageBody)}</p>
<dl><dt>${e(t.reference)}</dt><dd><strong>${e(ref)}</strong></dd></dl>
${phoneLine(lang)}
<p><a href="/${lang}">${e(t.home)}</a></p>`,
  );
}
