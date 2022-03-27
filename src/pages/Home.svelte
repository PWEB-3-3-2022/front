<script>
  import Mosaic from '../lib/Mosaic.svelte';
  import { homeMovies, homeTvshows } from '../api.js';
  import FullPage from './FullPage.svelte';

  const movies = homeMovies();
  const tvshows = homeTvshows();
</script>

<FullPage>
    <div id="main">
        <section>
            <h1 class="section-header">Movies</h1>
            {#await movies}
                <p>Loading ...</p>
            {:then movies}
                {#await movies.json()}
                    <p>Loading</p>
                {:then movies}
                    <Mosaic medias={movies}/>
                {:catch err}
                    <p>Error : {err}</p>
                {/await}
            {:catch err}
                <p>Error : {err}</p>
            {/await}
        </section>
        <section>
            <h1 class="section-header">TV Shows</h1>
            {#await tvshows}
                <p>Loading ...</p>
            {:then tvshows}
                {#await tvshows.json()}
                    <p>Loading</p>
                {:then tvshows}
                    <Mosaic medias={tvshows}/>
                {:catch err}
                    <p>Error : {err}</p>
                {/await}
            {:catch err}
                <p>Error : {err}</p>
            {/await}
        </section>
    </div>
</FullPage>

<style>
    #main {
        margin: 10px;
    }

    .section-header {
        font-size: 30px;
        margin-left: 1em;
    }
</style>
