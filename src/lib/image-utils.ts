const ALLOWED_IMAGE_HOSTS = new Set([
  "lh3.googleusercontent.com",
  "images.unsplash.com",
  "static.vecteezy.com",
  "i.imgur.com",
]);

const FALLBACK_IMAGE = "/window.svg";

export function getSafeImageSrc(src: string | null | undefined): string {
  if (!src) return FALLBACK_IMAGE;

  if (src.startsWith("/")) return src;

  try {
    const url = new URL(src);

    // Block Google Images result pages (not direct image URLs)
    if (url.hostname === "www.google.com" && url.pathname.startsWith("/imgres")) {
      return FALLBACK_IMAGE;
    }

    if (!ALLOWED_IMAGE_HOSTS.has(url.hostname)) {
      return FALLBACK_IMAGE;
    }

    return src;
  } catch {
    return FALLBACK_IMAGE;
  }
}

export const IMAGE_URL_HELP =
  "Use direct image links only (e.g. https://static.vecteezy.com/...jpg). Google image search URLs are not supported.";
