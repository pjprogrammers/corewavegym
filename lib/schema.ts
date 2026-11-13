import { site } from "./data";

const dayMap: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  additionalType: "https://schema.org/ExerciseGym",
  name: site.business.name,
  description:
    "Clean, affordable and fully-equipped gym in Bhajanpura, Delhi with strength, cardio, functional training, personal coaching and a separate ladies batch.",
  telephone: `+91${site.business.phone}`,
  email: site.business.email,
  url: "/",
  image: site.images.gallery[0],
  logo: site.images.logo,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "613, Main Road, Near Bank of Baroda, 2nd Floor",
    addressLocality: site.business.locality,
    addressRegion: site.business.city,
    postalCode: site.business.postalCode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.business.geo.lat,
    longitude: site.business.geo.lng,
  },
  hasMap: site.business.mapsLink,
  areaServed: site.business.areas.map((area) => ({
    "@type": "Place",
    name: `${area}, Delhi`,
  })),
  knowsAbout: site.business.tags,
  sameAs: [
    site.business.instagram,
    site.business.facebook,
    site.business.mapsLink,
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(site.business.rating),
    reviewCount:
      String(site.business.reviewCount).replace(/\D/g, "") || "70",
  },
  openingHoursSpecification: site.hours.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: dayMap[entry.id],
    opens: entry.id === "sun" ? "08:00" : "05:00",
    closes: entry.id === "sun" ? "12:00" : "22:30",
  })),
};
