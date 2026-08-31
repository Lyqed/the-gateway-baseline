"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type BoardCheck = {
  key: string;
  code: string;
  short: string;
  title: string;
  slug: string | null;
  side: string;
};

export type BoardCell = { status: "yes" | "partial" | "no"; note: string };

export type BoardRow = {
  id: string;
  name: string;
  kind: string;
  url: string;
  lastVerified: string;
  verified: number;
  cells: Record<string, BoardCell>;
};

const WORD: Record<BoardCell["status"], string> = {
  yes: "Verified",
  partial: "Partial",
  no: "Missing",
};

function StatusPill({ status, compact }: { status: BoardCell["status"]; compact?: boolean }) {
  const cls =
    status === "yes" ? "pill-yes" : status === "partial" ? "pill-partial" : "pill-no";
  return (
    <span className={`pill ${cls} ${compact ? "!px-2.5 !py-1 !text-[0.75rem]" : ""}`}>
      {WORD[status]}
    </span>
  );
}

/**
 * The comparison surface. Gateways across the top with their score in
 * large type and a sticky header; checks down the side; a word in each
 * cell. A cell is a button: it opens a sheet with the code, the title,
 * the status and the sourced note, plus the link to the normative text.
 * Below the lg breakpoint the same data is one card per gateway.
 */
export function TrackerBoard({
  rows,
  checks,
  max,
}: {
  rows: BoardRow[];
  checks: BoardCheck[];
  max: number;
}) {
  const [open, setOpen] = useState<{ g: BoardRow; c: BoardCheck } | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const best = rows.length ? rows[0].verified : 0;

  return (
    <>
      {/* Desktop: the board */}
      <div className="card-xl mt-10 hidden overflow-hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Gateway Baseline conformance, {checks[0]?.code} through{" "}
              {checks[checks.length - 1]?.code}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="border-b border-steel px-8 pb-5 pt-8 align-bottom">
                  <span className="sr-only">Check</span>
                </th>
                {rows.map((g) => (
                  <th
                    key={g.id}
                    scope="col"
                    className="border-b border-steel px-3 pb-5 pt-8 text-center align-bottom"
                  >
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[1.0625rem] font-semibold tracking-tight text-ink hover:underline"
                    >
                      {g.name}
                    </a>
                    <span className="mt-1 block text-[2rem] font-semibold leading-none tracking-tight text-ink">
                      {g.verified}
                      <span className="text-[1rem] font-normal text-steel-dark"> of {max}</span>
                    </span>
                    <span className="mt-2 block text-[0.75rem] text-steel-dark">
                      {g.verified === best && best > 0 ? "Highest verified · " : ""}
                      {g.lastVerified}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {checks.map((c, i) => {
                const sideStart = i === 0 || checks[i - 1].side !== c.side;
                return (
                  <tr key={c.key} className={sideStart && i > 0 ? "border-t border-steel" : ""}>
                    <th scope="row" className="px-8 py-5 align-middle font-normal">
                      {sideStart && (
                        <span className="mb-1 block text-[0.75rem] font-medium text-steel-faint">
                          {c.side}
                        </span>
                      )}
                      <span className="block text-[1rem] font-medium leading-snug text-ink">
                        {c.title}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.75rem] text-steel-dark">
                        {c.code}
                      </span>
                    </th>
                    {rows.map((g) => {
                      const cell = g.cells[c.key];
                      return (
                        <td key={g.id} className="px-3 py-5 text-center align-middle">
                          <button
                            type="button"
                            onClick={() => setOpen({ g, c })}
                            className="rounded-full transition-transform hover:scale-[1.04] focus-visible:outline-2"
                            aria-label={`${g.name}, ${c.code}: ${WORD[cell.status]}. Show the reasoning.`}
                          >
                            <StatusPill status={cell.status} />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Below lg: one card per gateway */}
      <ul className="mt-8 space-y-4 lg:hidden">
        {rows.map((g) => (
          <li key={g.id} className="card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <a
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[1.125rem] font-semibold tracking-tight text-ink"
                >
                  {g.name}
                </a>
                <p className="mt-0.5 text-[0.8125rem] text-steel-dark">
                  {g.kind} · verified {g.lastVerified}
                </p>
              </div>
              <p className="shrink-0 text-right text-[2rem] font-semibold leading-none tracking-tight text-ink">
                {g.verified}
                <span className="text-[0.9375rem] font-normal text-steel-dark"> of {max}</span>
              </p>
            </div>
            <ul className="mt-5 divide-y divide-steel">
              {checks.map((c) => {
                const cell = g.cells[c.key];
                return (
                  <li key={c.key}>
                    <button
                      type="button"
                      onClick={() => setOpen({ g, c })}
                      className="flex w-full items-center justify-between gap-4 py-3 text-left"
                    >
                      <span className="text-[0.9375rem] leading-snug text-ink">
                        {c.title}
                        <span className="ml-2 font-mono text-[0.75rem] text-steel-dark">{c.code}</span>
                      </span>
                      <StatusPill status={cell.status} compact />
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      {/* The sheet: the evidence under the cell */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/30 p-0 sm:items-center sm:p-6"
          onClick={() => setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-t-[28px] bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,.18)] sm:rounded-[28px] sm:p-9"
          >
            <p className="text-[0.8125rem] text-steel-dark">
              <span className="font-mono">{open.c.code}</span> · {open.g.name}
            </p>
            <h3 id="sheet-title" className="mt-2 text-[1.375rem] font-semibold leading-snug tracking-tight text-ink">
              {open.c.title}
            </h3>
            <p className="mt-4">
              <StatusPill status={open.g.cells[open.c.key].status} />
            </p>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink">
              {open.g.cells[open.c.key].note}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              {open.c.slug && (
                <Link href={`/spec/${open.c.slug}`} className="link-more !text-[0.9375rem]">
                  Read the check <span aria-hidden="true">&rsaquo;</span>
                </Link>
              )}
              <a
                href={open.g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-more !text-[0.9375rem]"
              >
                {open.g.name} <span aria-hidden="true">&rsaquo;</span>
              </a>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="btn-primary ml-auto !px-4 !py-2 !text-[0.875rem]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
