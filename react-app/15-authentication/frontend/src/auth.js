const key = 'authToken';

export function setAuthToken(token) {
  localStorage.setItem(key, token);
}

export function getAuthToken() { return localStorage.getItem(key); }
