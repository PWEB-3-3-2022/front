<script>
	export let open = false
</script>

<aside class="absolute w-half h-full bg-black border-r-2 shadow-lg" class:open>
	<nav class="p-12 text-xl">
        <a class="block text-white hover:text-red-600" href="#movies">Movies</a>
		<a class="block text-white hover:text-red-600" href="#series">Series</a>  
        <a class="block text-white hover:text-red-600" href="#settings">Settings</a>  
        <a class="block text-white hover:text-red-600" href="#about">About</a>
		<a class="block text-white hover:text-red-600" href="#contact">Contact</a>
	</nav>
</aside>

<style>
	aside {
		left: -100%;
		transition: left 0.3s ease-in-out
	}
	
	.open {
		left: 0
	}
</style>