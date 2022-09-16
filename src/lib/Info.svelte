<script>
  import Card from "./Card.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<Card>
  <h2 class="text-xl pb-2 w-full border-b-2">Your Posts</h2>
  <p class="italic">work in progress...</p>
  <!-- <p
    href="/about"
    on:click={() => dispatch("openCreateModal")}
    class="cursor-pointer w-fit p-[10px] mt-2 bg-red-500 font-bold text-white rounded-md"
  >
    Create Post
  </p> -->
</Card>
