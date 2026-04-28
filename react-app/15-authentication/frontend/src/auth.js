const key = 'authToken';
const expirationDateKey = 'expirationDate';

export function setAuthToken(token) {
  localStorage.setItem(key, token);
}

export function setExpirationDate(expirationDate) {
  localStorage.setItem(expirationDateKey, expirationDate);
}

export function getExpirationDate() {
  return localStorage.getItem(expirationDateKey);
}

export function getAuthToken() { return localStorage.getItem(key); }

export function removeAuthToken() { localStorage.removeItem(key); }

export function removeExpirationDate() { localStorage.removeItem(expirationDateKey); }

export function tokenLoader() { return getAuthToken(); }
