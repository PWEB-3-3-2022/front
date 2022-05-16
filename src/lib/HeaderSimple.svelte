<script>
  import Logo from './Logo.svelte';
  import AccountDropdown from './AccountDropdown.svelte';
  import { isLoggedIn, logged } from '../account.js';
</script>

<header>
    <Logo/>

    {#if isLoggedIn() && $logged && $logged.email}
        <AccountDropdown/>
    {:else}
        <a href="#/login" class="loginButton flex-none">S'identifier</a>
    {/if}
</header>

<style>
    header {
        height: 70px;
        max-height: 70px;
        padding-left: 60px;
        background: linear-gradient(to bottom, rgba(0, 0, 0, .7) 10%, rgba(0, 0, 0, 0));
        display: flex;
        align-items: center;
    }

    .loginButton {
        font-size: 1rem;
        float: none;
        padding: 7px 15px;
        color: white;
        border-radius: 3px;
        background-color: #e50914;
    }
</style>
