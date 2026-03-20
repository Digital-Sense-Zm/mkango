import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import BookRoomButton from "@/components/booking/book-room-button";
import WhatsAppWidget from "@/components/whatsapp-widget";
import Header from "@/components/header";
import { rooms as suiteInventory } from "@/data/rooms";

type IconComponent = () => ReactElement;

type Experience = {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  href: string;
  Icon: IconComponent;
};

type ShowcaseRoom = {
  name: string;
  category: string;
  summary: string;
  image: string;
  slug: string;
};

type FunctionStat = {
  label: string;
  detail: string;
  Icon: IconComponent;
};

type ProofPoint = {
  title: string;
  description: string;
};

type FooterColumn = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

const experiences: Experience[] = [
  {
    id: "stay",
    title: "Stay",
    description:
      "Choose from Standard Rooms, Junior Suites, Suites, and Apartments. Rack rates on the current hotel site include breakfast, and every room includes air conditioning, satellite television, and tea and coffee.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    cta: "View rooms",
    href: "#rooms",
    Icon: KeyIcon,
  },
  {
    id: "functions",
    title: "Functions",
    description:
      "M'kango is built for meetings and occasions, with 12 conference rooms, private meeting rooms, a marquee for larger events, garden wedding options, and outside catering.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    cta: "Plan an event",
    href: "#functions",
    Icon: FlagIcon,
  },
  {
    id: "dining",
    title: "Dining",
    description:
      "Baobab Bistro and Chatters Bar cover breakfast, buffet lunch, evening a la carte dining, cocktails, draft beer, and relaxed time in the lounge or on the outdoor patio.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    cta: "See dining",
    href: "#dining",
    Icon: ClocheIcon,
  },
];

const showcaseRooms: ShowcaseRoom[] = suiteInventory.map((room) => ({
  name: room.title,
  category: room.category,
  summary: room.summary,
  image: room.featuredImage,
  slug: room.slug,
}));

const functionStats: FunctionStat[] = [
  {
    label: "12 conference rooms",
    detail: "Suitable for smaller meetings through to larger conferences.",
    Icon: FlagIcon,
  },
  {
    label: "Marquee for 200+",
    detail: "Used for weddings, matabetos, and other large social gatherings.",
    Icon: ClubhouseIcon,
  },
  {
    label: "Private meeting rooms",
    detail: "Board rooms and smaller executive spaces for focused sessions.",
    Icon: SwingIcon,
  },
  {
    label: "Outside catering",
    detail: "Menus can be prepared to match the event brief and budget.",
    Icon: ClocheIcon,
  },
];

const proofPoints: ProofPoint[] = [
  {
    title: "Breakfast included in rack rates",
    description:
      "The current hotel site states that rack rates include breakfast as well as government levies and taxes.",
  },
  {
    title: "Public areas recently refreshed",
    description:
      "The hotel highlights recent renovations to the reception and lounge areas as part of the guest experience.",
  },
  {
    title: "Useful guest amenities",
    description:
      "Complimentary high speed Wi Fi, satellite television in every room, plus a gym and spa for hotel residents.",
  },
  {
    title: "Direct access to the team",
    description:
      "Guests can reserve through the hotel site, WhatsApp the team, or contact the front desk at any hour.",
  },
];

const galleryShots = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
];

const footerColumns: FooterColumn[] = [
  {
    title: "Stay",
    links: [
      { label: "Rooms", href: "#rooms" },
      { label: "Corporate & Specials", href: "#offers" },
      { label: "Reservations", href: "#reservations" },
    ],
  },
  {
    title: "Dining",
    links: [
      { label: "Baobab Bistro", href: "#dining" },
      { label: "Chatters Bar", href: "#dining" },
      { label: "Breakfast", href: "#dining" },
    ],
  },
  {
    title: "Functions",
    links: [
      { label: "Conferences", href: "#functions" },
      { label: "Weddings", href: "#functions" },
      { label: "Outside Catering", href: "#functions" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "WhatsApp", href: "https://wa.me/260979727715" },
      { label: "Email Reservations", href: "mailto:res@golfview-hotels.com" },
      { label: "Call Front Desk", href: "tel:+260211290770" },
    ],
  },
];

export default function Home() {
  return (
    <div className="relative bg-[var(--color-canvas)] text-ink">
      <Header />

      <main>
        <section
          id="hero"
          className="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden text-center text-white"
        >
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80"
            alt="View across the grounds of M'kango Golfview Hotel"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 mt-16 flex w-full max-w-4xl flex-col items-center px-4">
            <p className="text-xs uppercase tracking-[0.45em] text-white/90 lg:text-sm">
              Conference venue and full service hotel in Lusaka
            </p>
            <h2 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.05] text-[var(--color-gold)] sm:text-7xl lg:text-[6.5rem]">
              M&apos;kango Golfview Hotel
            </h2>
            <p className="mt-8 max-w-2xl text-base text-white/90 lg:text-xl">
              Recently refreshed public areas, comfortable rooms, dependable dining, and event spaces that work for business travel, celebrations, and everyday stays on Great East Road.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link
                href="/checkout"
                className="rounded-none bg-[var(--color-gold)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-emerald-deep)] transition hover:bg-white hover:text-[var(--color-ink)]"
              >
                Make a Reservation
              </Link>
              <Link
                href="#rooms"
                className="rounded-none border border-white/50 bg-black/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--color-ink)]"
              >
                Explore Rooms
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <div className="scroll-indicator text-[11px] text-white">Scroll</div>
          </div>
        </section>

        <div className="mx-auto mt-24 flex max-w-[1400px] flex-col gap-24 px-4 pb-24 sm:px-6 lg:mt-32 lg:gap-32 lg:px-10">
          <section
            id="experiences"
            className="space-y-10 rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-[0_40px_120px_rgba(15,61,46,0.08)] lg:p-12"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-fern)]">
                  Why Stay Here
                </p>
                <h2 className="text-3xl lg:text-4xl">
                  A practical choice for stays, meetings, and occasions in Lusaka.
                </h2>
              </div>
              <p className="max-w-xl text-base text-black/70">
                The hotel&apos;s appeal is straightforward: comfortable accommodation, flexible event facilities, solid food and drink, and a team guests can reach directly.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {experiences.map((experience) => (
                <article
                  id={experience.id}
                  key={experience.id}
                  className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[32px] border border-black/5 bg-white/60"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      sizes="(min-width: 1024px) 30vw, 100vw"
                    />
                  </div>
                  <div className="relative space-y-4 p-6">
                    <div className="flex items-center gap-3 text-[var(--color-emerald-dark)]">
                      <experience.Icon />
                      <span className="text-sm uppercase tracking-[0.25em]">
                        {experience.title}
                      </span>
                    </div>
                    <p className="text-base text-black/70">{experience.description}</p>
                    <Link
                      href={experience.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-emerald-dark)]"
                    >
                      {experience.cta}
                      <span
                        aria-hidden
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-emerald-dark)] transition group-hover:bg-[var(--color-emerald-dark)] group-hover:text-white"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/85 opacity-0 transition group-hover:opacity-100" />
                </article>
              ))}
            </div>
          </section>

          <section id="rooms" className="space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                  Rooms
                </p>
                <h2 className="text-3xl lg:text-4xl">
                  Four room categories, clearly presented.
                </h2>
              </div>
              <p className="max-w-2xl text-base text-black/70">
                The current hotel site lists Standard Rooms, Junior Suites, Suites, and Apartments. Rack rates are presented as bed and breakfast, with breakfast included.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {showcaseRooms.map((room) => (
                <article
                  key={room.slug}
                  className="group relative flex flex-col overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_25px_80px_rgba(15,61,46,0.06)] transition hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-fern)]">
                          {room.category}
                        </p>
                        <h3 className="text-2xl">{room.name}</h3>
                      </div>
                      <p className="text-base text-black/70">{room.summary}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="font-semibold text-black/55">Rates confirmed directly with the hotel</span>
                      <BookRoomButton slug={room.slug} label="Start reservation" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div
              id="offers"
              className="rounded-[32px] border border-[var(--color-emerald-dark)]/10 bg-white/90 p-8 shadow-[0_20px_55px_rgba(15,61,46,0.05)]"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Corporate & Specials
              </p>
              <h3 className="mt-3 text-2xl">Direct contact is the clearest route to current offers.</h3>
              <p className="mt-3 max-w-3xl text-base text-black/70">
                The live hotel site lists Corporate and Specials, but it does not publish fixed offer details on the page. For up to date rates, company arrangements, and special requests, contact the reservations team directly.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="https://wa.me/260979727715"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-none bg-[var(--color-emerald-dark)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--color-emerald-deep)]"
                >
                  Message on WhatsApp
                </Link>
                <Link
                  href="mailto:res@golfview-hotels.com"
                  className="rounded-none border border-black/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:border-black hover:bg-black hover:text-white"
                >
                  Email Reservations
                </Link>
              </div>
            </div>
          </section>

          <section
            id="functions"
            className="grid gap-10 rounded-[40px] border border-black/5 bg-white/70 p-8 lg:grid-cols-[1fr_0.9fr] lg:p-14"
          >
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Functions
              </p>
              <h2 className="text-4xl leading-tight">
                Conference rooms, social functions, and outside catering with real range.
              </h2>
              <p className="text-lg text-black/70">
                M&apos;kango positions itself as one of Lusaka&apos;s established venues for conferences and banqueting. The setup covers business meetings, weddings, garden events, and larger gatherings that need a venue able to adapt.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {functionStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-[0_20px_45px_rgba(15,61,46,0.05)]"
                  >
                    <div className="mb-3 flex items-center gap-3 text-[var(--color-emerald-dark)]">
                      <stat.Icon />
                      <span className="text-xs uppercase tracking-[0.25em]">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-sm text-black/70">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[40px]">
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
                alt="Function setup at the hotel"
                fill
                className="object-cover brightness-[0.9]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute bottom-6 left-6 rounded-3xl bg-white/85 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-emerald-deep)]">
                Conferences, weddings, private meetings
              </div>
            </div>
          </section>

          <section
            id="dining"
            className="relative overflow-hidden rounded-[48px] border border-black/5"
          >
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1900&q=80"
              alt="Dining at M'kango Golfview Hotel"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="relative z-10 flex min-h-[520px] flex-col justify-between px-10 py-14 text-white lg:px-20 lg:py-20">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
                  Dining
                </p>
                <h2 className="mt-6 text-4xl text-white lg:text-5xl">
                  Baobab Bistro and Chatters Bar keep the day moving.
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-white/80">
                  Guests can choose a traditional full breakfast or a lighter continental option, return for buffet lunch, and stay on for evening a la carte dining. The bar, lounge, and patio give the hotel an easy social rhythm.
                </p>
              </div>
              <Link
                href="https://wa.me/260979727715"
                target="_blank"
                rel="noreferrer"
                className="flex w-fit items-center gap-3 rounded-none border border-white/50 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition hover:border-white"
              >
                Ask About Dining
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </section>

          <section id="gallery" className="space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                  Gallery
                </p>
                <h2 className="text-3xl">A closer look at the atmosphere of the hotel.</h2>
              </div>
              <p className="max-w-2xl text-base text-black/70">
                The visual language here is calmer and more grounded, reflecting a business minded hotel that also knows how to host, feed, and welcome people properly.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryShots.map((src, index) => (
                <div
                  key={src}
                  className={`relative aspect-[3/4] overflow-hidden rounded-[28px] border border-black/5 ${
                    index % 2 === 0 ? "lg:translate-y-8" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt="Gallery view of the hotel"
                    fill
                    className="object-cover transition duration-700 ease-out hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 rounded-[40px] border border-black/5 bg-white/90 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Why Guests Choose M&apos;kango
              </p>
              <h2 className="text-4xl">Useful strengths, stated clearly.</h2>
              <p className="text-base text-black/70">
                Strong hospitality sites earn trust by being specific. These are the details the hotel itself consistently emphasizes across its current materials.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {proofPoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_45px_rgba(15,61,46,0.05)]"
                  >
                    <h3 className="text-xl">{point.title}</h3>
                    <p className="mt-3 text-sm text-black/70">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              id="reservations"
              className="rounded-[32px] border border-black/5 bg-white/80 p-8 shadow-[0_50px_120px_rgba(15,61,46,0.08)]"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Reservations
              </p>
              <h3 className="mt-4 text-3xl">Talk to the hotel for current availability, rates, and specials.</h3>
              <p className="mt-3 text-base text-black/70">
                The live site directs guests to contact the team for reservations and for corporate or special arrangements. That keeps the information current and avoids stale offers or out of date rate claims.
              </p>
              <dl className="mt-8 space-y-4 text-sm text-black/75">
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-black/50">WhatsApp</dt>
                  <dd className="mt-1 font-medium">+260 979 727 715</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-black/50">Front Desk</dt>
                  <dd className="mt-1 font-medium">+260 211 290 770 or +260 211 290 718</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-black/50">Sales and Marketing Manager</dt>
                  <dd className="mt-1 font-medium">+260 965 134 149</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-black/50">Email</dt>
                  <dd className="mt-1 font-medium">res@golfview-hotels.com</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-black/50">Address</dt>
                  <dd className="mt-1 font-medium">10247 Great East Road, Lusaka, Zambia</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="https://wa.me/260979727715"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center rounded-none bg-[var(--color-emerald-dark)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#124533]"
                >
                  Message on WhatsApp
                </Link>
                <Link
                  href="mailto:res@golfview-hotels.com"
                  className="flex flex-1 items-center justify-center rounded-none border border-black/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:border-black hover:bg-black hover:text-white"
                >
                  Email the Team
                </Link>
              </div>
            </div>
          </section>

          <footer
            id="footer"
            className="grid gap-8 rounded-[36px] border border-black/5 bg-white/80 p-10 lg:grid-cols-[1.1fr_1fr]"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-none border border-black/10">
                  <span className="text-lg font-semibold">M&apos;G</span>
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-black/60">
                  Conference venue and full service hotel in Lusaka
                </p>
              </div>
              <p>
                +260 979 727 715
                <br />
                res@golfview-hotels.com
                <br />
                10247 Great East Road, Lusaka, Zambia
              </p>
              <p className="text-sm text-black/60">
                Front desk support is available 24 hours a day.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {footerColumns.map((column) => (
                <div key={column.title} className="space-y-3">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-black/60">
                    {column.title}
                  </h4>
                  <ul className="space-y-2 text-sm text-black/70">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                          className="transition hover:text-black"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </footer>
        </div>
      </main>
      <WhatsAppWidget />
    </div>
  );
}

function KeyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.2 14.2L23 23M20 23L23 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M7 4v20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 5c4-2 7 2 11 0v8c-4 2-7-2-11 0V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClocheIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M5 18h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 18a6 6 0 1 1 12 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

function SwingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M9 21c1.5-4.5 3.5-9 9-14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="19" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ClubhouseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M6 18V9l8-5 8 5v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
