import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" style={{ minHeight: "100svh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div className="wrap">
        <p className="eyebrow">Erro 404</p>
        <h1 className="display" style={{ margin: "18px 0 28px" }}>
          Esta página não existe.
        </h1>
        <Link className="btn btn--solid" href="/">
          Voltar à Merendeira
        </Link>
      </div>
    </main>
  );
}
