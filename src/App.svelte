<script>
  import Router from 'svelte-spa-router';
  import { wrap } from 'svelte-spa-router/wrap';

  import SimplePage from './pages/SimplePage.svelte';
  import FullPage from './pages/FullPage.svelte';

  import Home from './pages/Home.svelte';
  import Search from './pages/Search.svelte';
  import Login from './pages/Login.svelte';
  import Register from './pages/Register.svelte';
  import Account from './pages/Account.svelte';
  import ProfileSelection from './pages/ProfileSelection.svelte';

  const routes = {
    '/': wrap({ component: Home, userData: { pageType: 'full' } }),
    '/search': wrap({ component: Search, userData: { pageType: 'full' } }),
    '/login': wrap({ component: Login, userData: { pageType: 'simple' } }),
    '/register': wrap({ component: Register, userData: { pageType: 'simple' } }),
    '/account': wrap({ component: Account, userData: { pageType: 'simple' } }),
    '/profile': wrap({ component: ProfileSelection, userData: { pageType: 'simple' } }),
    '*': wrap({ component: Home, userData: { pageType: 'full' } }),
  };

  let pageType = 'full';

  function routeLoading(e) {
    pageType = e.detail.userData && e.detail.userData.pageType ? e.detail.userData.pageType : 'simple';
  }
</script>

{#if pageType === 'full'}
    <FullPage {routes}>
        <Router on:routeLoading={routeLoading} {routes}/>
    </FullPage>
{:else if pageType === 'simple' }
    <SimplePage>
        <Router on:routeLoading={routeLoading} {routes}/>
    </SimplePage>
{:else}
    <h1 style="color: red">Unknown page type : {pageType}</h1>
{/if}
