// Helper function to handle fetch requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchData = async <T = any>(url: string, options: RequestInit = {}) => {
  const controller = new AbortController();
  const { signal } = controller;

  // Timeout handling
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 3000);

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    signal,
    ...options,
  });

  clearTimeout(timeoutId);

  // Error handling for failed fetch
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}`);
  }

  return response.json() as Promise<T>;
};
