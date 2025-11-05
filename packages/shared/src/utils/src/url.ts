/**
 * URL utilities
 */

export function removeQueryParams(
  url: string | URL | undefined,
): string | undefined {
  if (!url) return undefined;

  const urlString = typeof url === 'string' ? url : url.toString();
  const splitIndex = urlString.indexOf('?');

  return splitIndex >= 0 ? urlString.slice(0, splitIndex) : urlString;
}

export function getBaseUrl(): string {
  // Browser environment check
  if (typeof window !== 'undefined' && window.location) {
    const currentUrl = new URL(window.location.href);
    return `${currentUrl.protocol}//${currentUrl.host}`;
  }
  // Node.js environment - return empty or throw
  throw new Error('getBaseUrl() is only available in browser environment');
}

export function buildUrl(props: {
  protocol?: string;
  hostname: string;
  pathname?: string | string[];
  queryParams?: string | Record<string, string>;
  hash?: string;
}): URL {
  const {
    hostname,
    pathname = '/',
    queryParams = {},
    protocol = 'https',
    hash = '',
  } = props;

  const url = new URL(protocol + '://' + hostname);

  url.pathname = Array.isArray(pathname)
    ? '/' + pathname.map(encodeURIComponent).join('/').replace(/[/]+/, '/')
    : pathname;

  if (typeof queryParams === 'string') {
    url.search = queryParams;
  } else {
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.set(key, value);
    }
  }

  url.hash = hash;

  return url;
}

