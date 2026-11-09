export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://maykar-professional-painting-llc.vercel.app";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
