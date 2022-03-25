import { writable } from 'svelte/store';
import { getCookie } from './utils.js';
import { getAccountInfos } from './api.js';

export function isLoggedIn() {
  return (getCookie('authToken') !== null && getCookie('authToken') !== '');
}

export function getAuthToken() {
  return getCookie('authToken');
}

export const logged = writable(null, (set) => {
  const token = getAuthToken();
  if (token) {
    // eslint-disable-next-line no-use-before-define
    reloadAccount(token).catch(console.log);
  } else {
    set(null);
  }
});

export async function reloadAccount(token) {
  await getAccountInfos({ authToken: token }).then(async (res) => {
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
