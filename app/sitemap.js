export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://maykarpainting.vercel.app";
  const routes = ["", "/services", "/portfolio", "/reviews", "/contact", "/privacy"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
