import { writable, get } from 'svelte/store';
import { getAccountInfos } from './api.js';

export const logged = writable(null);

export async function reloadAccount() {
  await getAccountInfos().then(async (res) => {
    if (res.ok) {
      const body = await res.json();
      if ('error' in body) {
        logged.set(null);
      } else {
        logged.set({ email: body.email });
      }
    } else {
      logged.set(null);
    }
  });
}

reloadAccount();

export function isLoggedIn() {
  return (get(logged) !== null);
}
