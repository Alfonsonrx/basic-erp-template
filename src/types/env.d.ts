/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Frontend base domain (e.g. "localhost" or "example.com") */
  readonly VITE_TENANT_BASE_DOMAIN: string;
  /** Backend API port – only needed in development (e.g. "8000") */
  readonly VITE_API_PORT?: string;
  /** Backend API protocol ("http" or "https") */
  readonly VITE_API_PROTOCOL: string;
  /** Backend API domain (e.g. "localhost" or "exampleapi.com") */
  readonly VITE_API_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
