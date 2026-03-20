import type { Room } from "@/types";

export const rooms: Room[] = [
  {
    id: "rm_standard",
    title: "Standard Room",
    category: "Room",
    slug: "standard-room",
    summary:
      "Single or double occupancy with a queen bed or twin beds, air conditioning, satellite television, tea and coffee, and a shower or bath.",
    pricePerNightZMW: 11100,
    pricePerNightUSD: 520,
    featuredImage:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2000&q=80",
    amenities: [
      "Single occupancy available",
      "Double occupancy available",
      "Queen bed or two twin beds",
      "Air conditioning and satellite television",
      "Tea and coffee",
      "Shower or bath",
    ],
    status: "available",
  },
  {
    id: "rm_junior_suite",
    title: "Junior Suite",
    category: "Suite",
    slug: "junior-suite",
    summary:
      "Single or double occupancy with a queen bed, full bath, sitting area, air conditioning, satellite television, and tea and coffee.",
    pricePerNightZMW: 8100,
    pricePerNightUSD: 380,
    featuredImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
    amenities: [
      "Single occupancy available",
      "Double occupancy available",
      "Queen bed",
      "Air conditioning and satellite television",
      "Full bath and sitting area",
      "Tea and coffee",
    ],
    status: "available",
  },
  {
    id: "rm_suite",
    title: "Suite",
    category: "Suite",
    slug: "suite",
    summary:
      "Single or double occupancy with two queen beds, a full bath, satellite television, and either a sitting area or a separate sitting room. Suites include a kitchenette.",
    pricePerNightZMW: 6900,
    pricePerNightUSD: 320,
    featuredImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
    amenities: [
      "Single occupancy available",
      "Double occupancy available",
      "Two queen beds",
      "Kitchenette",
      "Full bath",
      "Sitting area or separate sitting room",
      "Satellite television",
    ],
    status: "available",
  },
  {
    id: "rm_apartment",
    title: "Apartments",
    category: "Apartment",
    slug: "apartments",
    summary:
      "Single or double occupancy with two queen beds, a full bath, satellite television, and either a sitting area or a separate sitting room. Double occupancy apartments include a kitchenette.",
    pricePerNightZMW: 13400,
    pricePerNightUSD: 640,
    featuredImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80",
    amenities: [
      "Single occupancy available",
      "Double occupancy available",
      "Two queen beds",
      "Full bath",
      "Satellite television",
      "Sitting area or separate sitting room",
      "Kitchenette for double occupancy",
    ],
    status: "available",
  },
];

export const findRoomBySlug = (slug: string): Room | undefined =>
  rooms.find((room) => room.slug === slug);
