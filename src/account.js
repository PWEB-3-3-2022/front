import { writable } from 'svelte/store';
import { getAccountInfos } from './api.js';

export const logged = writable(null);
let loggedvalue;
logged.subscribe((value) => {
  loggedvalue = value;
});

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
  return (loggedvalue !== null);
}
