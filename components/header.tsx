import Link from "next/link";

const navPrimary = [
  { label: "Home", href: "/#hero" },
  { label: "Rooms", href: "/#rooms" },
  { label: "Dining", href: "/#dining" },
];

const navSecondary = [
  { label: "Functions", href: "/#functions" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#footer" },
];

export default function Header({ variant = "transparent" }: { variant?: "transparent" | "dark" }) {
  const textColor = variant === "transparent" ? "text-white" : "text-[var(--color-emerald-deep)]";

  return (
    <header className={`absolute inset-x-0 top-0 z-50 w-full px-4 py-8 sm:px-6 lg:px-10 ${textColor}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <nav className="hidden flex-1 items-center justify-start gap-8 text-[11px] font-medium uppercase tracking-[0.25em] lg:flex">
          {navPrimary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--color-gold)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Link href="/" className="transition hover:text-[var(--color-gold)]">
            <h1 className="font-serif text-3xl tracking-wide md:text-4xl">
              M&apos;kango Golfview
            </h1>
            <p className="mt-1 text-[10px] uppercase tracking-[0.28em] opacity-80">
              Lusaka
            </p>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-6">
          <nav className="hidden items-center gap-6 text-[11px] font-medium uppercase tracking-[0.25em] md:flex">
            {navSecondary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[var(--color-gold)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {variant === "transparent" && (
            <Link
              href="/checkout"
              className="rounded-none bg-[var(--color-gold)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-emerald-deep)] transition hover:bg-white"
            >
              Reserve
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
