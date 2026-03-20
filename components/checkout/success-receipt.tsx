"use client";

import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/types";

type SuccessReceiptProps = {
  reference: string;
  room?: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  guest: string;
  total: number;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

const confettiPieces = Array.from({ length: 22 }).map((_, index) => ({
  left: `${(index * 11) % 100}%`,
  delay: `${(index * 0.08).toFixed(2)}s`,
  top: `${(index * 7) % 20}%`,
  rotation: `${(index * 37) % 360}deg`,
}));

const Confetti = () => {
  const palette = ["#1e5a46", "#4e8a64", "#c8a96a", "#f3d9b1", "#0f3d2e"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {confettiPieces.map((piece, index) => (
        <span
          key={index}
          className="absolute block h-6 w-2 animate-[confettiFall_2.8s_ease_forwards] rounded-full opacity-80"
          style={{
            left: piece.left,
            top: piece.top,
            animationDelay: piece.delay,
            transform: `rotate(${piece.rotation})`,
            backgroundColor: palette[index % palette.length],
          }}
        />
      ))}
    </div>
  );
};

const SuccessReceipt = ({
  reference,
  room,
  checkIn,
  checkOut,
  nights,
  guest,
}: SuccessReceiptProps) => {
  return (
    <div className="relative overflow-hidden bg-canvas px-4 pb-20 pt-16">
      <Confetti />
      <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-[40px] border border-[#d6cbbd] bg-white/95 p-10 text-center shadow-[0_40px_140px_rgba(0,0,0,0.12)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-emerald-dark)] text-2xl text-white">
          OK
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6c665b]">Reservation reference</p>
          <p className="text-3xl font-semibold tracking-tight text-[var(--color-emerald-dark)]">
            #{reference.toUpperCase()}
          </p>
          <p className="text-sm text-[#6c665b]">
            Your reservation request has been received. The hotel team will confirm details directly using the contact information you provided.
          </p>
        </div>
        {room && (
          <div className="grid gap-6 rounded-[32px] border border-[#efe8dc] bg-[#f8f5f0] p-6 text-left md:grid-cols-[160px_1fr]">
            <div className="overflow-hidden rounded-3xl">
              <Image src={room.featuredImage} alt={room.title} width={320} height={200} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#7a7368]">{room.category}</p>
                <p className="text-xl font-semibold">{room.title}</p>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm text-[#5a5348]">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.3em] text-[#8a8275]">Check-in</dt>
                  <dd className="font-medium">{formatDate(checkIn)}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.3em] text-[#8a8275]">Check-out</dt>
                  <dd className="font-medium">{formatDate(checkOut)}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.3em] text-[#8a8275]">Nights</dt>
                  <dd className="font-medium">{nights}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.3em] text-[#8a8275]">Guest</dt>
                  <dd className="font-medium">{guest || "Primary guest"}</dd>
                </div>
              </dl>
              <div className="rounded-2xl bg-white/70 p-4 text-sm text-[#6b6458]">
                Keep this reference for any follow up with the hotel team.
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4 text-sm text-[#5b5449]">
          <p>
            Need to make a change? Email <span className="font-semibold">res@golfview-hotels.com</span> or message <span className="font-semibold">+260 979 727 715</span> on WhatsApp and quote #{reference.toUpperCase()}.
          </p>
          <div className="flex flex-col gap-3 text-center sm:flex-row">
            <Link
              href="/"
              className="flex flex-1 items-center justify-center rounded-none border border-[#d8cfc2] px-6 py-3 font-semibold uppercase tracking-[0.35em] text-[#5a5348] transition hover:border-[var(--color-emerald-dark)] hover:text-[var(--color-emerald-dark)]"
            >
              Return Home
            </Link>
            <Link
              href="/checkout"
              className="flex flex-1 items-center justify-center rounded-none bg-[var(--color-emerald-dark)] px-6 py-3 font-semibold uppercase tracking-[0.35em] text-white shadow-[0_20px_60px_rgba(15,61,46,0.35)] hover:bg-[#124533]"
            >
              Start Another Request
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessReceipt;

