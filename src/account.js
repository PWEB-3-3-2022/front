import { get, writable } from 'svelte/store';
import * as api from './api.js';

export const logged = writable(null);
export const currentProfile = writable(null);

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
