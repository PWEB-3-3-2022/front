// const API_BASE = 'https://tcflix.herokuapp.com';
const API_BASE = process.env.NODE_ENV === 'production' ? 'https://tcflix.herokuapp.com' : 'http://127.0.0.1:3001';

export async function searchMedias(query, count = 10) {
  const response = await fetch(`${API_BASE}/medias/search?query=${query}&count=${count}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });
  return response.json();
}

export function homeMovies(count = 6) {
  return fetch(`${API_BASE}/home/movies?count=${count}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });
}

export function homeTvshows(count = 6) {
  return fetch(`${API_BASE}/home/tvshows?count=${count}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });
}

export async function playMedia(id) {
  const response = await fetch(`${API_BASE}/medias/${id}/play`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });
  return response.json();
}

export function login(payload) {
  return fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json', 'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function register(payload) {
  return fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json', 'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function getAccountInfos() {
  return fetch(`${API_BASE}/me`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });
}

export async function changeProfileEmail(profileId, newEmail) {
  return fetch(`${API_BASE}/me/profiles/${profileId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: newEmail }),
  });
}

export async function deleteUserProfile(profileId) {
  return fetch(`${API_BASE}/me/profiles/${profileId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export async function createUserProfile(payload) {
  return fetch(`${API_BASE}/me/profiles`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function logout() {
  return fetch(`${API_BASE}/auth/logout`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
