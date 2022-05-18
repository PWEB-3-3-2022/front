import { derived, get, writable } from 'svelte/store';
import * as api from './api.js';

// Contains the current user of null
export const logged = writable(null);
// Contains the current profile or null
export const currentProfile = writable(null);
// Contains the current user profiles as an array or null
export const profilesArray = derived(
  logged,
  (l) => (l != null ? Object.entries(l.profiles).map(([id, profile]) => ({ id, ...profile })) : null),
);

export async function reloadAccount() {
  await api.getAccountInfos().then(async (res) => {
    if (res.ok) {
      const body = await res.json();
      if ('error' in body) {
        logged.set(null);
      } else {
        logged.set(body);
      }
    } else {
      logged.set(null);
    }
  });
}

// FIXME hmmmmm async function
reloadAccount();

export function isLoggedIn() {
  return (get(logged) !== null);
}

export async function logout() {
  if (!isLoggedIn()) return;
  await api.logout().then(async (res) => {
    if (res.ok) {
      const body = await res.json();
      if (!('error' in body)) {
        logged.set(null);
      }
    }
  });
}

export function setCurrentProfile(id) {
  const date = new Date().getDate();
  const expirationDate = new Date().setDate(date + 7);
  document.cookie = `profile=${id}; path=/; expires=${new Date(expirationDate).toUTCString()}`;
  currentProfile.set(get(logged).profiles[id]);
}

export function profilesAsArray() {
  return Object.entries(get(logged).profiles).map(([id, profile]) => ({ id, ...profile }));
}
