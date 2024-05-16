export function fetchDiff(ssrHtml: string, clientHtml: string) {
  return fetch('/diff', {
    body: JSON.stringify({
      ssrHtml,
      clientHtml,
    }),
    method: 'POST',
    headers: {
      location: window.location.pathname,
      'Content-Type': 'application/json',
    },
  })
}
