<script lang="ts">
  import Card from "./Card.svelte";

  export let contentHeight = "200px";
</script>

<Card>
  <p class="text-3xl font-medium h-12 skeleton w-[75%]" />
  <p class="font-light text-gray-500 h-6 skeleton w-[50%]" />
  <div class="skeleton w-full" style="height: {contentHeight}" />
</Card>
