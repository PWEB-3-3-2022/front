// const API_BASE = 'https://cors-anywhere.herokuapp.com/https://tcflix.herokuapp.com';
const API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://tcflix.herokuapp.com'
  : 'http://127.0.0.1:3001';

export async function searchMedias(query) {
  const response = await fetch(`${API_BASE}/medias/search?query=${query}`);
  return response.json();
}
