<script>
  import Logo from './Logo.svelte';
  import Searchbar from './Searchbar.svelte';
  import AccountDropdown from './AccountDropdown.svelte';
  import { logged } from '../account.js';
</script>

<header class="bg-black p-2 text-xl text-red-600">
    <nav class="flex flex-flow flex-nowrap justify-between items-center gap-1">
        <div class="flex-none">
            <Logo/>
        </div>
        <div class="basis-4/6 grow ml-60">
            <Searchbar/>
        </div>
        {#if $logged !== null}
            <AccountDropdown/>
        {:else}
            <a href="#/login" class="loginButton flex-none">S'identifier</a>
        {/if}
    </nav>
</header>

<style>
    .loginButton {
        font-size: 1rem;
        float: none;
        padding: 7px 15px;
        color: white;
        border-radius: 3px;
        background-color: #e50914;
    }
</style>