import { writable, get } from 'svelte/store';
import { getAccountInfos } from './api.js';

export const logged = writable(null);
let userProfilesCache = [];

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

// FIXME hmmmmm async function
reloadAccount();

export function isLoggedIn() {
  return (get(logged) !== null);
}

export function getUserProfiles() {
  return new Promise((resolve, reject) => {
    if(!isLoggedIn()) {
      reject('NotLoggedIn');
      return;
    }
    if (userProfilesCache.length !== 0) {
      resolve(userProfilesCache);
      return;
    }
    getAccountInfos().then(async (res) => {
      if (res.ok) {
        const body = await res.json();
        if ('error' in body) {
          reject('TokenError');
          return;
        }
        let profiles = [];
        userProfilesCache = [...profiles];
        resolve(userProfilesCache);
        return;
      }
      reject('InternalServerError');
      return;
    });
  })
}

export function getCurrentProfile() {
  function getCookie(user) {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i += 1) {
      const cookiePair = cookieArr[i].split('=');
      if (user === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }
  const profile_id = getCookie('profile');
  if (profile_id == null || profile_id == "") {
    return null;
  }
  if (userProfilesCache.length == 0) {
    return null;
  }
  if (userProfilesCache[profile_id] == null || userProfilesCache[profile_id].length == 0) {
    return null;
  }
  return userProfilesCache[profile_id];
}

export function deleteCachedProfile(profileId) {
  if (userProfilesCache[profileId]) {
    delete userProfilesCache[profileId];
  }
}

export function addProfileToCache(id, name, pic) {
  userProfilesCache[id] = {};
  userProfilesCache[id].name = name;
  userProfilesCache[id].email = '';
  userProfilesCache[id].picture = pic;
}
