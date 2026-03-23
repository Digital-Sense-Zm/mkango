"use client";

import { useRef, type ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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

const imageTheme = {
  hero: "/images/mkango/IMG_8232.jpeg",
  stay: "/images/mkango/rooms/standard.png",
  functions: "/images/mkango/functions/wedding.png",
  dining: "/images/mkango/restaurant.png",
  roomsFeature: "/images/mkango/functions/conference.png",
};



const experiences: Experience[] = [
  {
    id: "stay",
    title: "Stay",
    description:
      "Choose from Standard Rooms, Junior Suites, Suites, and Apartments. Rack rates on the current hotel site include breakfast, and every room includes air conditioning, satellite television, and tea and coffee.",
    image: imageTheme.stay,
    cta: "View rooms",
    href: "#rooms",
    Icon: KeyIcon,
  },
  {
    id: "functions",
    title: "Functions",
    description:
      "M'kango is built for meetings and occasions, with 12 conference rooms, private meeting rooms, a marquee for larger events, garden wedding options, and outside catering.",
    image: imageTheme.functions,
    cta: "Plan an event",
    href: "#functions",
    Icon: FlagIcon,
  },
  {
    id: "dining",
    title: "Dining",
    description:
      "Baobab Bistro and Chatters Bar cover breakfast, buffet lunch, evening a la carte dining, cocktails, draft beer, and relaxed time in the lounge or on the outdoor patio.",
    image: imageTheme.dining,
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
  "/images/mkango/lobby.png",
  "/images/mkango/pool.png",
  "/images/mkango/gym.png",
  "/images/mkango/restaurant.png",
  "/images/mkango/meal.png",
  "/images/mkango/gate.png",
  "/images/mkango/afrotheme.png",
  "/images/mkango/gazelle.png",
];

const footerColumns: FooterColumn[] = [
  {
    title: "Stay",
    links: [
      { label: "Rooms", href: "#rooms" },
      { label: "Reservations", href: "https://nebulacrs.hti.app/apollo3/mkangogolfview/#/hotel/370" },
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
      { label: "Email Reservations", href: "mailto:res@golfview-hotels.com" },
      { label: "Call Front Desk", href: "tel:+260211290770" },
    ],
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative bg-white text-[var(--color-ink)]">
      <Header variant="transparent" /> 

      <main>
        {/* PARALLAX HERO SECTION */}
        <section
          ref={heroRef}
          id="hero"
          className="relative flex h-[100vh] min-h-[700px] w-full items-center justify-center overflow-hidden bg-black text-center text-white"
        >
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 h-[120%] w-full"
          >
            <Image
              src={imageTheme.hero}
              alt="View across the grounds of M'kango Golfview Hotel"
              fill
              priority
              className="object-cover opacity-60"
              sizes="100vw"
            />
            {/* Extremely dark gradient to guarantee pure legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0b1813]" />
          </motion.div>

          <motion.div 
            style={{ opacity: heroOpacity }}
            className="relative z-10 mt-16 flex w-full max-w-4xl flex-col items-center px-4"
          >
            <p className="text-xs uppercase tracking-[0.55em] text-white lg:text-sm font-thin">
              Conference venue and full service hotel in Lusaka
            </p>
            <h2 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.05] text-white sm:text-7xl lg:text-[6.5rem] tracking-tight">
              M&apos;kango Golfview Hotel
            </h2>
            <p className="mt-8 max-w-2xl text-lg text-white/90 lg:text-xl font-extralight leading-relaxed">
              Recently refreshed public areas, comfortable rooms, dependable dining, and event spaces that work for business travel, celebrations, and everyday stays on Great East Road.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link
                href="https://nebulacrs.hti.app/apollo3/mkangogolfview/#/hotel/370"
                className="rounded-none bg-[var(--color-gold)] px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#0b1813] transition hover:bg-white hover:text-black"
              >
                Make a Reservation
              </Link>
              <Link
                href="#rooms"
                className="rounded-none border border-white/50 bg-transparent px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                Explore Rooms
              </Link>
            </div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <div className="scroll-indicator text-[11px] text-white">Scroll</div>
          </div>
        </section>
        
        {/* EXPERIENCES MODULE */}
        <div className="bg-[#0b1813] text-white">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-32 px-4 py-32 sm:px-6 lg:gap-40 lg:px-10">
            <section
              id="experiences"
              className="space-y-16"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/20 pb-10">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-gold)] font-light">
                    The Hotel Experience
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-serif text-white tracking-wide">
                    A refined destination for stays, gatherings, and celebrations.
                  </h2>
                </div>
                <p className="max-w-xl text-lg text-white/80 font-light leading-relaxed">
                  M&apos;kango Golfview Hotel blends sophisticated comfort with intuitive service. From our beautifully appointed accommodations and versatile event spaces to our exceptional dining experiences, every detail is crafted to provide a seamless and memorable stay in Lusaka.
                </p>
              </div>
              <div className="grid gap-10 lg:grid-cols-3">
                {experiences.map((experience, idx) => (
                  <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    id={experience.id}
                    key={experience.id}
                    className="group relative flex min-h-[500px] flex-col justify-between overflow-hidden border border-white/10 bg-[#11231c]"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={experience.image}
                        alt={experience.title}
                        fill
                        className="object-cover transition duration-1000 ease-out group-hover:scale-110"
                        sizes="(min-width: 1024px) 30vw, 100vw"
                      />
                    </div>
                    <div className="relative space-y-6 p-8">
                      <div className="flex items-center gap-4 text-[var(--color-gold)]">
                        <experience.Icon />
                        <span className="text-sm uppercase tracking-[0.25em] text-white">
                          {experience.title}
                        </span>
                      </div>
                      <p className="text-base text-white/70 font-light leading-relaxed">{experience.description}</p>
                      <Link
                        href={experience.href}
                        className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)] transition hover:text-white"
                      >
                        {experience.cta}
                        <span
                          aria-hidden
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)] transition group-hover:bg-[var(--color-gold)] group-hover:text-black"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ROOMS MAPPING MODULE */}
        <div className="bg-white text-black py-32">
          <div className="mx-auto flex max-w-[1400px] flex-col px-4 sm:px-6 lg:px-10">
            <section id="rooms" className="space-y-16">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-black/10 pb-10">
                <div className="space-y-4 max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)] font-light">
                    Accommodations
                  </p>
                  <h2 className="text-4xl lg:text-6xl font-serif text-[#0b1813] tracking-tight">
                    Sanctuaries of Quiet Elegance.
                  </h2>
                </div>
                <p className="max-w-xl text-lg text-black/70 font-light leading-relaxed">
                  Discover a curated collection of Standard Rooms, Junior Suites, Executive Suites, and expansive Apartments. Each space is thoughtfully appointed with modern comforts, offering high-speed connectivity, climate refinement, and complimentary breakfast to ensure a restorative stay in the heart of Lusaka.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
                {showcaseRooms.map((room, idx) => {
                  return (
                    <motion.article
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      key={room.slug}
                      className="group relative flex flex-col overflow-hidden bg-white border border-black/5 shadow-[0_30px_90px_rgba(15,61,46,0.06)]"
                    >
                      <div className="relative h-96 overflow-hidden">
                        <Image
                          src={room.image}
                          alt={room.name}
                          unoptimized
                          fill
                          className="object-cover transition duration-1000 ease-in-out group-hover:scale-105"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between space-y-6 p-10">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)] font-semibold">
                              {room.category}
                            </p>
                            <h3 className="mt-2 text-4xl font-serif text-[#0b1813]">{room.name}</h3>
                          </div>
                          <p className="text-lg text-black/70 font-light leading-relaxed">{room.summary}</p>
                        </div>
                        <div className="mt-8 border-t border-black/10 pt-8 flex items-center justify-between">
                          <BookRoomButton slug={room.slug} label="Book Now" fullWidth={true} />
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        {/* FUNCTIONS MODULE */}
        <div className="bg-[#0b1813] text-white py-32 overflow-hidden">
          <div className="mx-auto flex max-w-[1400px] flex-col px-4 sm:px-6 lg:px-10">
            <section
              id="functions"
              className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center"
            >
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)] font-medium">
                    Functions
                  </p>
                  <h2 className="text-5xl lg:text-6xl leading-[1.1] font-serif text-white tracking-tight">
                    Conference rooms, social functions, and outside catering with real range.
                  </h2>
                </div>
                <p className="text-xl text-white/70 font-light leading-relaxed">
                  M&apos;kango positions itself as one of Lusaka&apos;s established venues for conferences and banqueting. The setup covers business meetings, weddings, garden events, and larger gatherings that need a venue able to adapt.
                </p>
                
                <div className="grid gap-6 sm:grid-cols-2 pt-6 border-t border-white/20">
                  {functionStats.map((stat) => (
                    <div key={stat.label} className="space-y-3">
                      <div className="flex items-center gap-4 text-[var(--color-gold)]">
                        <stat.Icon />
                        <span className="text-xs uppercase tracking-[0.25em] text-white font-medium">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-base text-white/60 font-light">{stat.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative min-h-[500px] lg:h-[800px] w-full"
              >
                <Image
                  src={imageTheme.roomsFeature}
                  alt="Function setup at the hotel"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </motion.div>
            </section>
          </div>
        </div>

        {/* DINING PARALLAX */}
        <section
          id="dining"
          className="relative flex h-[80vh] min-h-[700px] w-full items-end justify-start overflow-hidden px-4 pb-20 sm:px-10 lg:px-20"
        >
          <div className="absolute inset-0 h-[100%] w-full">
            <Image
              src={imageTheme.dining}
              alt="Dining at M'kango Golfview Hotel"
              fill
              className="object-cover opacity-80"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-3xl space-y-8 text-white"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)] font-medium">
                Dining
              </p>
              <h2 className="mt-4 text-5xl lg:text-7xl font-serif tracking-tight text-white">
                Baobab Bistro and Chatters Bar keep the day moving.
              </h2>
            </div>
            <p className="max-w-2xl text-xl text-white/80 font-light leading-relaxed">
              Guests can choose a traditional full breakfast or a lighter continental option, return for buffet lunch, and stay on for evening a la carte dining. The bar, lounge, and patio give the hotel an easy social rhythm.
            </p>
            <Link
              href="https://wa.me/260979727715"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-4 border-b border-[var(--color-gold)] pb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)] transition hover:text-white hover:border-white"
            >
              Ask About Dining
              <span aria-hidden>&rarr;</span>
            </Link>
          </motion.div>
        </section>

        {/* GALLERY & PROOF POINTS */}
        <div className="bg-[#f8f6f2] text-black py-32">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-32 px-4 sm:px-6 lg:px-10">
            
            <section id="gallery" className="space-y-16">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-black/10 pb-10">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)] font-light">
                    Gallery
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-serif text-[#0b1813]">Immerse yourself in the atmosphere.</h2>
                </div>
                <p className="max-w-2xl text-lg text-black/70 font-light leading-relaxed">
                  Take a visual journey through the defining spaces of M&apos;kango Golfview. From our elegantly refreshed lounges and tranquil poolside to our grand banqueting suites, discover the environments that set the stage for your extraordinary moments.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {galleryShots.map((src, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    key={src}
                    className={`relative aspect-[3/4] overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.06)] ${
                      index % 2 !== 0 ? "lg:translate-y-12" : ""
                    }`}
                  >
                    <Image
                      src={src}
                      alt="Gallery view of the hotel"
                      fill
                      className="object-cover opacity-90 transition duration-1000 ease-out hover:scale-110 hover:opacity-100"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)] font-medium">
                    The M&apos;kango Standard
                  </p>
                  <h2 className="text-5xl font-serif text-[#0b1813]">Elevating every aspect of your stay.</h2>
                  <p className="text-lg text-black/70 font-light max-w-xl">
                    We distinguish ourselves through a steadfast commitment to exceptional service and meticulously considered amenities. Discover the distinct hallmarks that define the M&apos;kango experience.
                  </p>
                </div>
                
                <div className="grid gap-8 sm:grid-cols-2">
                  {proofPoints.map((point) => (
                    <div key={point.title} className="border-t border-black/10 pt-6">
                      <h3 className="text-2xl font-serif text-[#0b1813]">{point.title}</h3>
                      <p className="mt-4 text-base text-black/60 font-light leading-relaxed">{point.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div id="reservations" className="bg-[#0b1813] text-white p-10 lg:p-14 border-t-8 border-[var(--color-gold)]">
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)] font-medium">
                  Reservations
                </p>
                <h3 className="mt-6 text-4xl font-serif leading-tight">Talk to the hotel for current availability, rates, and specials.</h3>
                <p className="mt-6 text-lg text-white/70 font-light leading-relaxed">
                  The live site directs guests to contact the team for reservations and for corporate or special arrangements. That keeps the information current and avoids stale offers or out of date rate claims.
                </p>
                
                <dl className="mt-12 space-y-6 text-base text-white/90">
                  <div className="border-b border-white/10 pb-4">
                    <dt className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Front Desk</dt>
                    <dd className="mt-2 font-light tracking-wide">+260 211 290 770 or +260 211 290 718</dd>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <dt className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Sales and Marketing Manager</dt>
                    <dd className="mt-2 font-light tracking-wide">+260 965 134 149</dd>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <dt className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Email</dt>
                    <dd className="mt-2 font-light tracking-wide">res@golfview-hotels.com</dd>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <dt className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Address</dt>
                    <dd className="mt-2 font-light tracking-wide">10247 Great East Road, Lusaka, Zambia</dd>
                  </div>
                </dl>
                
                <Link
                  href="mailto:res@golfview-hotels.com"
                  className="mt-12 inline-flex items-center justify-center border border-[var(--color-gold)] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)] transition hover:bg-[var(--color-gold)] hover:text-[#0b1813]"
                >
                  Email the Team
                </Link>
              </div>
            </section>

            <footer
              id="footer"
              className="mt-16 border-t border-black/10 pt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr]"
            >
              <div className="space-y-8 pr-12">
                <div className="flex items-center gap-6">
                  <Image
                    src="/logo/favicon.svg"
                    alt="M'kango Golfview Hotel mark"
                    width={48}
                    height={54}
                    className="h-12 w-auto opacity-90 mix-blend-multiply"
                  />
                  <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-black/80">
                    Conference venue and full service hotel in Lusaka
                  </p>
                </div>
                <p className="text-base text-black/60 font-light leading-loose">
                  +260 979 727 715 <br />
                  res@golfview-hotels.com <br />
                  10247 Great East Road, Lusaka, Zambia
                </p>
                <p className="text-sm text-black/50 font-light">
                  Front desk support is available 24 hours a day.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:gap-12 w-full">
                {footerColumns.map((column) => (
                  <div key={column.title} className="space-y-6">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#0b1813]">
                      {column.title}
                    </h4>
                    <ul className="space-y-4 text-sm font-light text-black/60">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                            className="transition hover:text-[var(--color-gold)]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="col-span-1 lg:col-span-2 mt-8 py-8 border-t border-black/5 text-center text-[10px] uppercase tracking-[0.3em] text-black/40 font-medium">
                © {new Date().getFullYear()} M'kango Golfview Hotel. All rights reserved.
              </div>
            </footer>
          </div>
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
