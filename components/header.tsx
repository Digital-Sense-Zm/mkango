import Image from "next/image";
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
  const isTransparent = variant === "transparent";
  const textColor = isTransparent ? "text-white" : "text-[var(--color-emerald-deep)]";
  const headerPosition = isTransparent ? "absolute inset-x-0 top-0" : "relative";
  const logoSrc = isTransparent ? "/logo/logo-white.svg" : "/logo/logo.svg";
  const logoSizeClass = isTransparent
    ? "h-[5.5rem] w-[5.5rem] md:h-[7.25rem] md:w-[7.25rem]"
    : "h-[6.25rem] w-[6.25rem] md:h-[8.5rem] md:w-[8.5rem]";
  const navOffset = isTransparent ? "pt-5" : "pt-8";

  return (
    <header className={`${headerPosition} z-50 w-full px-4 py-8 sm:px-6 lg:px-10 ${textColor}`}>
      <div className="mx-auto flex max-w-[1400px] items-start justify-between gap-4">
        <nav className={`hidden flex-1 items-center justify-start gap-8 text-[11px] font-medium uppercase tracking-[0.25em] lg:flex ${navOffset}`}>
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

        <div className="flex flex-1 justify-center">
          <Link href="/" className="transition hover:opacity-90" aria-label="M'kango Golfview Hotel home">
            <Image
              src={logoSrc}
              alt="M'kango Golfview Hotel"
              width={172}
              height={172}
              priority
              className={logoSizeClass}
            />
          </Link>
        </div>

        <div className={`flex flex-1 items-start justify-end gap-6 ${navOffset}`}>
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
          {isTransparent && (
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
