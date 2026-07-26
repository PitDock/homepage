import { ORGANIZATION, PUBLISHER_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";
import { SITE_FAQS } from "./faqs";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": PUBLISHER_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    alternateName: ORGANIZATION.alternateName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    foundingDate: ORGANIZATION.foundingDate,
    address: {
      "@type": "PostalAddress",
      ...ORGANIZATION.address,
    },
    sameAs: ORGANIZATION.sameAs,
  };
}

export function webSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": PUBLISHER_ID },
    inLanguage: "ja",
  };
}

export function faqPageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SITE_FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a.replace(/\n/g, " "),
      },
    })),
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage: "ja",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": PUBLISHER_ID },
  };
}

export function softwareApplicationJsonLd({
  name,
  description,
  path,
  operatingSystem,
  applicationCategory,
  downloadUrl,
  image,
  offers,
}: {
  name: string;
  description: string;
  path: string;
  operatingSystem: string;
  applicationCategory: string;
  downloadUrl: string | string[];
  image: string;
  offers?: { price: string; priceCurrency?: string; description?: string };
}): JsonLd {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image: imageUrl,
    operatingSystem,
    applicationCategory,
    downloadUrl,
    inLanguage: "ja",
    publisher: { "@id": PUBLISHER_ID },
    ...(offers && {
      offers: {
        "@type": "Offer",
        price: offers.price,
        priceCurrency: offers.priceCurrency ?? "JPY",
        ...(offers.description && { description: offers.description }),
      },
    }),
  };
}

export function webApplicationJsonLd({
  name,
  description,
  path,
  downloadUrl,
  image,
  browserRequirements,
}: {
  name: string;
  description: string;
  path: string;
  downloadUrl: string;
  image: string;
  browserRequirements: string;
}): JsonLd {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    image: imageUrl,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Chrome",
    browserRequirements,
    downloadUrl,
    inLanguage: "ja",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
    publisher: { "@id": PUBLISHER_ID },
  };
}
