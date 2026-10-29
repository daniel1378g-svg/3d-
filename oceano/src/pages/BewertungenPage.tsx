// Kundenbewertungen: the live intro set large (the live page shows no reviews, so the wall stays out).
import { Bewertungen } from "@/components/home/Bewertungen";

export default function BewertungenPage() {
  return (
    <div style={{ paddingTop: "calc(var(--label-h) + 60px)" }}>
      <Bewertungen full />
    </div>
  );
}
