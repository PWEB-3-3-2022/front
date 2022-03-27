<script>
  import { Modal } from 'svelte-simple-modal';
  import HeaderFull from '../lib/HeaderFull.svelte';
  import Footer from '../lib/Footer.svelte';
</script>

<HeaderFull/>

<main>
    <Modal>
        <slot>
            Missing page content
        </slot>
    </Modal>
</main>

<Footer/>

<style>
    main {
        min-height: calc(100vh - 1rem - 45px - 220px);
        /*100vh = 100% of a screen
          1rem = 2*time padding of navbar
          45px = height of navbar when logo take all the space (Problem on mobile where logo disapear ?)
          220px = fixed height of footer
        */
    }
</style>
