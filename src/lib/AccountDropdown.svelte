<script>
  import { push } from 'svelte-spa-router';
  import { currentProfile, logged } from '../account';

  let showDropdownMenu = false;
</script>

<button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        data-dropdown-toggle="dropdownDivider"
        id="dropdownDividerButton"
        on:blur={() => { setTimeout(() => { showDropdownMenu = false; }, 100); }}
        on:click={() => { showDropdownMenu = !showDropdownMenu; }}
        on:focus={() => { showDropdownMenu = true; }}
        type="button">
    {#if $currentProfile == null}
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"></path>
        </svg>
    {:else}
        <img class="avatar" width="32" height="32" src={$currentProfile.picture} alt={$currentProfile.name}>
    {/if}
    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
    </svg>
</button>

<!-- Dropdown menu -->
<div class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
     class:hidden={!showDropdownMenu}
     id="dropdownDivider">
    <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
        <div>Connecté en tant que</div>
        <div class="font-semibold">{$logged.email}</div>
    </div>
    <ul aria-labelledby="dropdownDividerButton" class="py-1 text-sm text-gray-700 dark:text-gray-200">
        <li>
            <a class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
               href="#/profile">Changer de profil</a>
            <a class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
               href="#/Account">Paramètres du
                compte</a>
        </li>
    </ul>
    <div class="py-1">
        <a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
           href="#/"
           on:click={() => { logged.set(null); push('#/'); }}>Se
            déconnecter</a>
    </div>
</div>
