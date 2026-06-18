import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aravinthan.dev", // base reference URL
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
