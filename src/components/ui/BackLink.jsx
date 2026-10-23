import Link from "next/link";

/* "← Back to home" — the one way out of every sub-page, styled identically. */
export default function BackLink({ href = "/#home", children, className = "" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink ${className}`}
    >
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:-translate-x-1"
      >
        &larr;
      </span>
      <span className="link-underline">{children}</span>
    </Link>
  );
}
