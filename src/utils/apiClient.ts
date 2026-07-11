/**
 * apiClient — fetch wrapper with retry logic, timeout, and error normalisation.
 *
 * Usage:
 *   const data = await apiClient('/api/notify-admin', {
 *     method: 'POST',
 *     body: JSON.stringify(payload),
 *     retries: 3,
 *   })
 */

interface ApiOptions extends RequestInit {
  /** Number of retry attempts on network error / 5xx (default 2) */
  retries?: number
  /** Timeout in milliseconds (default 10 000) */
  timeout?: number
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiClient<T = unknown>(
  url: string,
  { retries = 2, timeout = 10_000, ...init }: ApiOptions = {}
): Promise<T> {
  let lastError: Error = new Error('Request failed')

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)

    try {
      const res = await fetch(url, {
        ...init,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...init.headers,
        },
      })
      clearTimeout(timer)

      if (!res.ok) {
        // Don't retry 4xx (client errors)
        if (res.status >= 400 && res.status < 500) {
          const body = await res.json().catch(() => ({}))
          throw new ApiError(res.status, (body as { message?: string }).message ?? res.statusText)
        }
        throw new ApiError(res.status, res.statusText)
      }

      const contentType = res.headers.get('content-type') ?? ''
      if (contentType.includes('application/json')) {
        return res.json() as Promise<T>
      }
      return res.text() as unknown as T
    } catch (err) {
      clearTimeout(timer)

      if (err instanceof ApiError && err.status >= 400 && err.status < 500) {
        throw err // no retry for client errors
      }

      lastError = err instanceof Error ? err : new Error(String(err))

      if (attempt < retries) {
        // Exponential back-off: 300ms, 900ms, 2700ms…
        await new Promise((r) => setTimeout(r, 300 * Math.pow(3, attempt)))
      }
    }
  }

  throw lastError
}
