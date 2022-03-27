<script>
  import { Modal } from 'svelte-simple-modal';
  import HeaderSimple from '../lib/HeaderSimple.svelte';
</script>

<HeaderSimple/>

<main>
    <Modal>
        <slot>
            Missing page content
        </slot>
    </Modal>
</main>

<style>

</style>
