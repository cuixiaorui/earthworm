const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://earthworm.cuixueshe.com"
    : "http://localhost:3000";

export function toUrl(url: string) {
  return baseUrl + url;
}
