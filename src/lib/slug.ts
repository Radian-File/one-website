export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createProductId(title: string): string {
  const base = slugify(title) || "product";
  const suffix = Date.now().toString(36);
  return `${base}-${suffix}`;
}
