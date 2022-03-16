<script>
  import Logo from './Logo.svelte';
  import Hamburger from './Hamburger.svelte';
  import Searchbar from './Searchbar.svelte';
  import Login_button from './Login_button.svelte';

  export let sidebar = false;
</script>

<header class="bg-black p-2 text-xl text-red-600">
    <nav class="flex">
        <Hamburger bind:open={sidebar}/>
        <Logo/>
        <Searchbar/>
        <div class="login">
           <Login_button/>
        </div>
    </nav>
</header>

<style>
  .login {
    position: absolute;
    right: 100px;
  }
</style>