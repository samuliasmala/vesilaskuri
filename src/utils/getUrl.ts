import 'client-only';

export function getUrl(relativeUrl: string, params?: Record<string, string>) {
  // Create url with query params
  const url = new URL(relativeUrl, window.location.origin);
  if (params) url.search = new URLSearchParams(params).toString();

  return url;
}
