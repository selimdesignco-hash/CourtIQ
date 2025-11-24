export function createPageUrl(page) {
  if (!page) return '/';
  return page.startsWith('/') ? page : `/${page}`;
}

export function generateId() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}
