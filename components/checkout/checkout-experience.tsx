"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { rooms } from "@/data/rooms";
import type { BookingPayload, Room } from "@/types";
import {
  getCostBreakdown,
  useBookingStore,
} from "@/stores/use-booking-store";

type PaymentToggleValue = "card" | "mobile_money";
type MobileNetworkValue = "mtn" | "airtel" | "zamtel";

type CardFields = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
};

const formatZMW = new Intl.NumberFormat("en-ZM", {
  style: "currency",
  currency: "ZMW",
  minimumFractionDigits: 0,
});

const formatDateRangePart = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const paymentCtas: Record<PaymentToggleValue, string> = {
  card: "Processing secure payment...",
  mobile_money: "Awaiting Mobile Money approval...",
};

const paymentOptions: { value: PaymentToggleValue; label: string }[] = [
  { value: "card", label: "Credit / Debit Card" },
  { value: "mobile_money", label: "Mobile Money" },
];

const paymentNetworks: { value: MobileNetworkValue; label: string }[] = [
  { value: "mtn", label: "MTN MoMo" },
  { value: "airtel", label: "Airtel Money" },
  { value: "zamtel", label: "Zamtel Kwacha" },
];

const cardLogos = ["Visa", "Mastercard", "DPO Group"];

const fieldClass =
  "w-full rounded-none border border-[#d8d0c6] bg-white/90 px-4 py-3 text-sm font-medium text-ink placeholder:text-[#8c8377] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-emerald-dark)]";

const SectionTitle = ({ title }: { title: string }) => (
  <p className="text-xs uppercase tracking-[0.3em] text-[#6c665b]">{title}</p>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-none border border-[#d7cec2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#5a5348]">
    {children}
  </span>
);

const Spinner = () => (
  <span
    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
    aria-hidden="true"
  />
);

const CheckoutExperience = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    selectedRoom,
    setRoom,
    checkIn,
    checkOut,
    setDates,
    nights,
    guestName,
    guestEmail,
    setGuestName,
    setGuestEmail,
    paymentMethod,
    setPaymentMethod,
    paymentNetwork,
    setPaymentNetwork,
    mobileNumber,
    setMobileNumber,
    totalAmount,
    reset,
  } = useBookingStore();

  const defaultRoom = useMemo<Room | undefined>(
    () => selectedRoom ?? rooms.find((room) => room.status === "available") ?? rooms[0],
    [selectedRoom],
  );

  useEffect(() => {
    if (!selectedRoom && defaultRoom) {
      setRoom(defaultRoom);
    }
  }, [selectedRoom, defaultRoom, setRoom]);
  useEffect(() => {
    const slugFromQuery = searchParams?.get("room");
    if (!slugFromQuery) return;
    const next = rooms.find((room) => room.slug === slugFromQuery);
    if (next && next.slug !== selectedRoom?.slug) {
      setRoom(next);
    }
  }, [searchParams, selectedRoom?.slug, setRoom]);

  const [cardFields, setCardFields] = useState<CardFields>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeRoom = selectedRoom ?? defaultRoom;
  const breakdown = getCostBreakdown(activeRoom, nights);
  const totalDisplay = totalAmount || breakdown.total;

  const isCardSelected = paymentMethod === "card";

  const missingCardFields = Object.values(cardFields).some((value) => !value.trim());
  const missingMobileFields = !mobileNumber.trim();
  const missingGuestDetails = !guestName.trim() || !guestEmail.trim();

  const disableSubmit =
    isProcessing ||
    !activeRoom ||
    missingGuestDetails ||
    (isCardSelected ? missingCardFields : missingMobileFields);

  const handleRoomChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = rooms.find((room) => room.slug === event.target.value);
    if (next) {
      setRoom(next);
    }
  };

  const handleDateChange = (
    event: ChangeEvent<HTMLInputElement>,
    which: "checkIn" | "checkOut",
  ) => {
    const value = event.target.value;
    if (which === "checkIn") {
      setDates(value, checkOut);
    } else {
      setDates(checkIn, value);
    }
  };

  const handleCardFieldChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: keyof CardFields,
  ) => {
    const value = event.target.value;
    setCardFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeRoom) return;
    setError(null);
    setIsProcessing(true);

    const payload: BookingPayload = {
      roomId: activeRoom.id,
      checkIn,
      checkOut,
      guestName,
      guestEmail,
      paymentMethod,
      paymentNetwork: !isCardSelected ? paymentNetwork : undefined,
      mobileNumber: !isCardSelected ? mobileNumber : undefined,
      totalAmount: totalDisplay,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to confirm booking");
      }

      const result = await response.json();
      const params = new URLSearchParams({
        ref: result.reference,
        room: activeRoom.slug,
        checkIn,
        checkOut,
        nights: nights.toString(),
        total: String(result.total),
        guest: guestName,
      });

      reset();
      router.push(`/success?${params.toString()}`);
    } catch (err) {
      console.error(err);
      setError("We couldn't finish the reservation. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-canvas px-4 pb-16 pt-32">
      <Header variant="dark" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row">
        <section className="w-full rounded-[32px] border border-[#e0d8cc] bg-white/90 p-8 shadow-[0_30px_80px_rgba(12,41,32,0.08)] lg:w-2/5">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <SectionTitle title="Reservation Summary" />
              <Pill>Breakfast included in rack rates</Pill>
            </div>
            {activeRoom && (
              <div className="space-y-6">
                <div className="overflow-hidden rounded-3xl border border-[#e8e0d4]">
                  <Image
                    src={activeRoom.featuredImage}
                    alt={activeRoom.title}
                    width={640}
                    height={420}
                    className="h-64 w-full object-cover"
                    priority
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {activeRoom.title}
                      </h2>
                      <p className="text-sm text-[#736b5f]">
                        Current rates confirmed by reservations
                      </p>
                    </div>
                    <select
                      value={activeRoom.slug}
                      onChange={handleRoomChange}
                      className="rounded-none border border-[#d8d0c6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#5a5348]"
                    >
                      {rooms.map((room) => (
                        <option key={room.id} value={room.slug}>
                          {room.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-[#5b5449]">
                    {activeRoom.amenities.map((amenity) => (
                      <li key={amenity}>{amenity}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <SectionTitle title="Check-in" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(event) => handleDateChange(event, "checkIn")}
                      className={fieldClass}
                    />
                    <p className="text-xs text-[#6b6458]">
                      {formatDateRangePart(checkIn)} selected
                    </p>
                  </div>
                  <div className="space-y-2">
                    <SectionTitle title="Check-out" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(event) => handleDateChange(event, "checkOut")}
                      className={fieldClass}
                    />
                    <p className="text-xs text-[#6b6458]">
                      {formatDateRangePart(checkOut)} selected
                    </p>
                  </div>
                </div>
                <div className="rounded-3xl bg-[#f8f5f0] p-5">
                  <div className="flex items-center justify-between text-sm text-[#6c665b]">
                    <span>
                      Estimated stay total for {nights} night{nights > 1 ? "s" : ""}
                    </span>
                    <span>{formatZMW.format(breakdown.base)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#6c665b]">
                    <span>Estimated taxes and levies</span>
                    <span>{formatZMW.format(breakdown.taxes)}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-lg font-semibold">
                    <span>Estimated amount</span>
                    <span>{formatZMW.format(totalDisplay)}</span>
                  </div>
                  <p className="mt-2 text-xs text-[#6f695d]">
                    For corporate rates or specials, contact the hotel directly before payment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="w-full rounded-[32px] border border-[#d6cbbd] bg-white/95 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.08)] lg:w-3/5">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <SectionTitle title="Guest Details" />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className={fieldClass}
                  placeholder="Guest full name"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                />
                <input
                  className={fieldClass}
                  placeholder="Email for receipt"
                  type="email"
                  value={guestEmail}
                  onChange={(event) => setGuestEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle title="Payment" />
              <div className="grid grid-cols-2 rounded-none border border-[#d7cdc1] bg-[#f9f6f1] p-1 text-sm font-semibold">
                {paymentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPaymentMethod(option.value)}
                    className={`rounded-none px-4 py-3 transition ${
                      paymentMethod === option.value
                        ? "bg-[var(--color-emerald-dark)] text-white shadow-[0_12px_30px_rgba(15,61,46,0.4)]"
                        : "text-[#5a5348]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {isCardSelected ? (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <input
                    className={fieldClass}
                    placeholder="Card number"
                    inputMode="numeric"
                    maxLength={19}
                    value={cardFields.number}
                    onChange={(event) => handleCardFieldChange(event, "number")}
                  />
                  <div className="grid gap-4 md:grid-cols-[1fr_1fr_2fr]">
                    <input
                      className={fieldClass}
                      placeholder="MM / YY"
                      value={cardFields.expiry}
                      onChange={(event) => handleCardFieldChange(event, "expiry")}
                    />
                    <input
                      className={fieldClass}
                      placeholder="CVC"
                      value={cardFields.cvc}
                      onChange={(event) => handleCardFieldChange(event, "cvc")}
                    />
                    <input
                      className={fieldClass}
                      placeholder="Name on card"
                      value={cardFields.name}
                      onChange={(event) => handleCardFieldChange(event, "name")}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-[#7c7468]">
                  {cardLogos.map((logo) => (
                    <span key={logo} className="rounded-none border border-[#d6ccbf] px-3 py-1">
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#746d61]">
                      Network
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                      {paymentNetworks.map((network) => (
                        <button
                          key={network.value}
                          type="button"
                          onClick={() => setPaymentNetwork(network.value)}
                          className={`flex flex-col items-center justify-center gap-2 rounded-none border px-3 py-4 transition ${
                            paymentNetwork === network.value
                              ? "border-[var(--color-emerald-dark)] bg-[var(--color-emerald-dark)] text-white"
                              : "border-[#d7cdc1] text-[#5a5348] hover:bg-white"
                          }`}
                        >
                          <Image src={`/images/${network.value}.svg`} alt={network.label} width={40} height={40} className="object-contain" />
                          {network.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#746d61]">
                        Mobile Number
                      </label>
                      <input
                        className={fieldClass}
                        placeholder={
                          paymentNetwork === "airtel"
                            ? "Your Airtel number 097.. or 077.."
                            : paymentNetwork === "zamtel"
                              ? "Your Zamtel number 095.. or 075.."
                              : "Your MTN number 096.. or 076.."
                        }
                        value={mobileNumber}
                        onChange={(event) => setMobileNumber(event.target.value)}
                      />
                      <p className="text-xs text-[#6b6458]">
                        A push notification will be sent to this number so you can approve the payment.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#ebdcc1] bg-[#fdfaf5] p-3 text-xs text-[#746955]">
                      <strong>Note:</strong> Mobile payments are most practical for Zambia numbers. Guests outside Zambia should use a credit or debit card.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#7a7368]">
                  Estimated total
                </p>
                <p className="text-2xl font-semibold">
                  {formatZMW.format(totalDisplay)}
                </p>
              </div>
              <button
                type="submit"
                disabled={disableSubmit}
                className={`inline-flex w-full items-center justify-center gap-3 rounded-none px-8 py-4 text-sm font-semibold uppercase tracking-[0.35em] transition md:w-auto ${
                  disableSubmit
                    ? "cursor-not-allowed bg-[#bfb8ad] text-white/70"
                    : "bg-[var(--color-emerald-dark)] text-white shadow-[0_25px_60px_rgba(15,61,46,0.35)] hover:bg-[#124533]"
                }`}
              >
                {isProcessing && <Spinner />}
                {isProcessing ? paymentCtas[paymentMethod] : "Continue Reservation"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CheckoutExperience;

