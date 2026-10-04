/**
 * Lightweight API client for the FastAPI backend.
 *
 * The backend serialises columns in snake_case (e.g. `short_title`,
 * `registration_link`). The frontend components expect camelCase, so every
 * response is recursively converted to camelCase keys before being returned.
 */

export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://127.0.0.1:8000/api";

const toCamel = (key: string): string =>
  key.replace(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase());

const keysToCamel = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(keysToCamel);
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, val]) => [
        toCamel(key),
        keysToCamel(val),
      ]),
    );
  }
  return value;
};

export async function apiGet<T>(endpoint: string): Promise<T> {
  const path = endpoint.replace(/^\//, "");
  const response = await fetch(`${API_BASE_URL}/${path}`);

  if (!response.ok) {
    throw new Error(
      `Request to "${path}" failed with status ${response.status}`,
    );
  }

  const json = await response.json();
  return keysToCamel(json) as T;
}
