<script lang="ts">
  import "../../../app.css";

  import Transition from "$lib/Transition.svelte";
  import { page } from "$app/stores";
</script>

<Transition url={$page.url}>
  <slot />
</Transition>
