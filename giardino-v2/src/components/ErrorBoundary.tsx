// If a part of the page fails, the rest of the site stays: the visitor sees the restaurant's phone and e-mail instead
// of an empty page.
import { Component, type ReactNode } from "react";
import { BUSINESS } from "@/content/business";

export class ErrorBoundary extends Component<{ children: ReactNode; label?: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error(error);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className="container-x py-24 text-center">
        <p className="font-display text-[28px] font-extrabold uppercase">{BUSINESS.name}</p>
        <p className="mt-3">
          <a className="link" href={`tel:${BUSINESS.tel}`}>
            {BUSINESS.phone}
          </a>{" "}
          ·{" "}
          <a className="link" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
        </p>
      </div>
    );
  }
}
