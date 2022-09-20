<script lang="ts">
  import "../../../app.css";
  import { page } from "$app/stores";

  import Transition from "$lib/Transition.svelte";
</script>

<Transition url={$page.url}>
  <slot />
</Transition>
