import { getBlogPosts } from "./guide/utils";

export const baseUrl = "https://conta-daimoku.vercel.app";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/guide/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/guide"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
