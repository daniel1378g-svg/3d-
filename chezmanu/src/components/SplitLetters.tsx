import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Text that enters letter by letter (opacity + rise, transform only). Words break only after a hyphen; screen readers
 * get the plain text once. The whole entrance stays under ~0.7 s whatever the length.
 */
export function SplitLetters({ text, lang, className, delay = 0, still = false }: { text: string; lang?: string; className?: string; delay?: number; still?: boolean }) {
  const reduce = useReducedMotion();
  // Taking over the static first paint (scripts/postbuild-routes.mjs): the same plain text, nothing moves.
  if (still)
    return (
      <span className={className} lang={lang}>
        {text}
      </span>
    );
  const letters = [...text].length;
  const step = Math.min(0.03, 0.55 / Math.max(letters, 1));
  let n = 0;
  return (
    <span className={className} lang={lang}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, w) => (
          <Fragment key={w}>
            {w > 0 && " "}
            {/* a long compound («boulangerie-pâtisserie,») may still break after its hyphen */}
            {word.split(/(?<=-)/).map((part, h) => (
              <Fragment key={h}>
                {h > 0 && <wbr />}
                <span className="inline-block whitespace-nowrap">
                  {[...part].map((ch, i) => {
                    const k = n++;
                    return (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(0.45em) rotate(4deg)" }}
                        animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0em) rotate(0deg)" }}
                        transition={reduce ? { duration: 0.3, delay } : { type: "spring", bounce: 0.3, duration: 0.55, delay: delay + k * step }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                </span>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
