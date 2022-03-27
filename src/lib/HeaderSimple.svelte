<script>
  import Logo from './Logo.svelte';
</script>

<header>
    <Logo/>
</header>

<style>
    header {
        height: 70px;
        max-height: 70px;
        padding-left: 60px;
        background: linear-gradient(to bottom, rgba(0,0,0,.7) 10%, rgba(0,0,0,0));
        display: flex;
        align-items: center;
    }
</style>
