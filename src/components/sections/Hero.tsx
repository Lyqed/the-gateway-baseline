import Link from "next/link";
import { GATEWAYS } from "@/lib/gateways";
import { CANDIDATES, SPEC_CHECKS, SPEC_VERSION } from "@/lib/spec";

/**
 * The promise first, then the numbers as typography. The product (the
 * scoreboard) follows immediately; nobody scrolls through the argument
 * to reach it.
 */
export function Hero() {
  const facts: readonly { n: string; k: string }[] = [
    { n: `${SPEC_CHECKS.length}`, k: "checks" },
    { n: `${GATEWAYS.length}`, k: "gateways" },
    { n: `${CANDIDATES.length}`, k: "candidates" },
    { n: SPEC_VERSION, k: "current" },
  ];

  return (
    <section id="top" aria-labelledby="hero-heading">
      <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 sm:pb-14 sm:pt-20">
        <p className="text-[0.9375rem] font-semibold text-monarch-deep">
          The Gateway Baseline
        </p>
        <h1
          id="hero-heading"
          className="text-hero mt-3 max-w-4xl text-ink"
        >
          Know where the money went.
        </h1>
        <p className="mt-6 max-w-2xl text-[1.125rem] leading-snug text-steel-dark sm:text-[1.375rem]">
          <strong className="font-semibold text-ink">
            To know that, you have to attribute requests properly.
          </strong>{" "}
          Know which application, team or person each request belongs to.
          Carry that context through usage, policy decisions and provider billing.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a href="#tracker" className="btn-primary">
            See the scoreboard
          </a>
          <Link href="/spec" className="link-more">
            Read the spec <span aria-hidden="true">&rsaquo;</span>
          </Link>
        </div>

        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-y-8 border-t border-steel pt-8 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k}>
              <dd className="text-[2.5rem] font-semibold leading-none tracking-tight text-ink sm:text-[3rem]">
                {f.n}
              </dd>
              <dt className="mt-2 text-[0.9375rem] text-steel-dark">{f.k}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
