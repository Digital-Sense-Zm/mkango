import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M'kango Golfview Hotel | Conference Venue and Full Service Hotel in Lusaka",
  description:
    "Explore rooms, dining, conferencing, banqueting, and reservations at M'kango Golfview Hotel on Great East Road in Lusaka.",
  keywords: [
    "M'kango Golfview Hotel",
    "hotel in Lusaka",
    "conference venue Lusaka",
    "Great East Road hotel",
    "Baobab Bistro Lusaka",
  ],
  authors: [{ name: "M'kango Golfview Hotel" }],
  metadataBase: new URL("https://mkango.local"),
  icons: {
    icon: "/logo/favicon.svg",
    shortcut: "/logo/favicon.svg",
    apple: "/logo/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
