import { get, writable } from 'svelte/store';
import { getAccountInfos } from './api.js';

export const logged = writable(null);
export const currentProfile = writable(null);

export async function reloadAccount() {
  await getAccountInfos().then(async (res) => {
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
console.log(document.cookie);

export function isLoggedIn() {
  return (get(logged) !== null);
}
