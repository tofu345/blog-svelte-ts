<script lang="ts">
  import { fly } from "svelte/transition";

  export let url: URL;
</script>

{#key url}
  <div in:fly={{ x: -30, duration: 500 }}>
    <slot />
  </div>
{/key}
