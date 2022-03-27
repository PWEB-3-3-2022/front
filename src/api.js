// const API_BASE = 'https://tcflix.herokuapp.com';
const API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://tcflix.herokuapp.com'
  : 'http://127.0.0.1:3001';

export async function searchMedias(query) {
  const response = await fetch(`${API_BASE}/medias/search?query=${query}`);
  return response.json();
}

export function homeMovies(count = 6) {
  return fetch(
    `${API_BASE}/home/movies?count=${count}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
}

export function homeTvshows(count = 6) {
  return fetch(
    `${API_BASE}/home/tvshows?count=${count}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
}

export function login(payload) {
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

export async function getAccountInfos(payload) {
  return fetch(
    `${API_BASE}/me`,
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
