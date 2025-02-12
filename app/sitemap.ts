import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://help2teach.de";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
      alternates: {
        languages: { en: `${baseUrl}/en`, de: `${baseUrl}/de` },
      },
    },
    {
      url: `${baseUrl}/imprint`,
      lastModified: new Date(),
      priority: 1,
      alternates: {
        languages: { en: `${baseUrl}/imprint/en`, de: `${baseUrl}/imprint/de` },
      },
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/privacy-policy/en`,
          de: `${baseUrl}/privacy-policy/de`,
        },
      },
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      priority: 1,
      alternates: {
        languages: { en: `${baseUrl}/login/en`, de: `${baseUrl}/login/de` },
      },
    },

    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/register/en`,
          de: `${baseUrl}/register/de`,
        },
      },
    },
  ];
}
