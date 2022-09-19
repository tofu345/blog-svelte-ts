<script lang="ts">
  import "../../app.css";

  import { page } from "$app/stores";

  import Navbar from "$lib/Navbar.svelte";
  import Transition from "$lib/Transition.svelte";
  import CreatePost from "$lib/CreatePost.svelte";
  import Modal from "$lib/Modal.svelte";
</script>

<Navbar />
<Transition url={$page.url}>
  <slot />
</Transition>

<!-- Create Post Modal -->
<Modal>
  <CreatePost />
</Modal>
