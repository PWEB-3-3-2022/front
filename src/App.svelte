<script>
  import Router from 'svelte-spa-router';
  import Home from './pages/Home.svelte';
  import Search from './pages/Search.svelte';
  import About from './pages/About.svelte';
  import Login from './pages/Login.svelte';
  import Register from './pages/Register.svelte';
  import Account from './pages/Account.svelte';
  import ProfileSelection from './pages/ProfileSelection.svelte';

  const routes = {
    '/': Home,
    '/search': Search,
    '/about': About,
    '/login': Login,
    '/register': Register,
    '/account': Account,
    '/profile': ProfileSelection,
    '*': Home,
  };
</script>

<Router {routes}/>
