/**
 * API Configuration Utility
 *
 * Extracts the current tenant subdomain from the browser URL and builds
 * tenant-specific or public API base URLs.
 *
 * Frontend domain: VITE_TENANT_BASE_DOMAIN  (e.g. localhost / example.com)
 * Backend domain:  VITE_API_DOMAIN          (e.g. localhost / exampleapi.com)
 */

// ---------------------------------------------------------------------------
// Subdomain helpers
// ---------------------------------------------------------------------------

/**
 * Extract the tenant subdomain from the current hostname.
 *
 * Examples:
 *   acme.localhost       → "acme"
 *   acme.example.com     → "acme"
 *   localhost             → null
 *   example.com           → null
 */
export function getSubdomain(): string | null {
  const hostname = window.location.hostname;
  const baseDomain = import.meta.env.VITE_TENANT_BASE_DOMAIN;

  // Exact match with base domain means no subdomain
  if (hostname === baseDomain) {
    return null;
  }

  // Check if hostname ends with .baseDomain
  const suffix = `.${baseDomain}`;
  if (hostname.endsWith(suffix)) {
    const sub = hostname.slice(0, hostname.length - suffix.length);
    return sub.length > 0 ? sub : null;
  }

  return null;
}

/**
 * Whether the user is currently on a tenant subdomain.
 */
export function isOnTenantSubdomain(): boolean {
  return getSubdomain() !== null;
}

// ---------------------------------------------------------------------------
// URL builders
// ---------------------------------------------------------------------------

/**
 * Build the base origin for the backend API (no trailing slash).
 *
 * @param subdomain – optional tenant subdomain to prepend
 */
function buildApiOrigin(subdomain?: string | null): string {
  const protocol = import.meta.env.VITE_API_PROTOCOL ?? 'http';
  const domain = import.meta.env.VITE_API_DOMAIN ?? 'localhost';
  const port = import.meta.env.VITE_API_PORT;

  const host = subdomain ? `${subdomain}.${domain}` : domain;
  const portSuffix = port ? `:${port}` : '';

  return `${protocol}://${host}${portSuffix}`;
}

/**
 * Build a full tenant-specific API URL.
 *
 * Uses the subdomain extracted from the current browser URL.
 *
 * @example getTenantApiUrl('/users/auth/login/')
 *          → "http://acme.localhost:8000/users/auth/login/"
 */
export function getTenantApiUrl(path: string): string {
  const subdomain = getSubdomain();
  return `${buildApiOrigin(subdomain)}${path}`;
}

/**
 * Build a full public-schema API URL (no subdomain).
 *
 * @example getPublicApiUrl('/users/auth/signup/')
 *          → "http://localhost:8000/users/auth/signup/"
 */
export function getPublicApiUrl(path: string): string {
  return `${buildApiOrigin()}${path}`;
}

/**
 * Return the tenant API base origin (no path).
 */
export function getTenantApiBaseUrl(): string {
  return buildApiOrigin(getSubdomain());
}

/**
 * Return the public API base origin (no path).
 */
export function getPublicApiBaseUrl(): string {
  return buildApiOrigin();
}
