import 'client-only';

export function getUrl(relativeUrl: string, params?: Record<string, string>) {
  // Create url with query params
  if (!params) return relativeUrl;
  return `${relativeUrl}?${new URLSearchParams(params).toString()}`;
}
