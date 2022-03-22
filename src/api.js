// const API_BASE = 'https://tcflix.herokuapp.com';
const API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://tcflix.herokuapp.com'
  : 'http://127.0.0.1:3001';

export async function searchMedias(query) {
  const response = await fetch(`${API_BASE}/medias/search?query=${query}`);
  return response.json();
}

export async function login(payload) {
  return fetch(
    `${API_BASE}/auth/login`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );
}

export async function register(payload) {
  return fetch(
    `${API_BASE}/auth/register`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );
}

export function getCookie(user) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i += 1) {
    const cookiePair = cookieArr[i].split('=');
    if (user === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

export async function getAccountInfos(payload) {
  return fetch(
    `${API_BASE}/user/infos`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );
}
