<script>
  import Router from 'svelte-spa-router';
  import Home from './pages/Home.svelte';
  import Search from './pages/Search.svelte';
  import About from './pages/About.svelte';
  import Login from './pages/Login.svelte';
  import Register from './pages/Register.svelte';

  import Navbar from './lib/Navbar.svelte';
  import Sidebar from './lib/Sidebar.svelte';
  import Footer from './lib/Footer.svelte';

  // For the sidebar
  let open = false;

  const routes = {
    '/': Home,
    '/search': Search,
    '/about': About,
    '/login': Login,
    '/register': Register,
  };

  // Triggered when changing page
  function routeLoaded() {
    // Close the sidebar
    open = false;
  }
</script>

<Sidebar bind:open/>
<Navbar bind:sidebar={open}/>

<div id="main">
    <Router {routes} on:routeLoaded={routeLoaded}/>
</div>

<Footer/>

<style>
    #main {
        min-height: calc(100vh - 1rem - 45px - 220px);
        /*100vh = 100% of a screen
          1rem = 2*time padding of navbar
          45px = height of navbar when logo take all the space (Problem on mobile where logo disapear ?)
          220px = fixed height of footer
        */
    }
</style>