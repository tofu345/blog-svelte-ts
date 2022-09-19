<script lang="ts">
  import "../app.css";
  import Toast from "$lib/Toast.svelte";

  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  import notifications from "$lib/stores/notifications";
  import { deleteNotif } from "$lib/util";
</script>

<svelte:head>
  <title>My Awesome Blog</title>
</svelte:head>

<slot />

<!-- Notifications -->
<div
  class="z-40 fixed bottom-5 left-5 mr-5 w-fit
    max-w-[500px] max-h-[100px]
    flex flex-col-reverse gap-2"
>
  {#if $notifications}
    {#each $notifications as notif (notif.id)}
      <div
        out:fly={{ x: -500, duration: 500 }}
        in:fly={{ x: -200, duration: 500 }}
        animate:flip={{ duration: 500 }}
      >
        <Toast {notif} on:deleteNotif={(e) => deleteNotif(e.detail)} />
      </div>
    {/each}
  {/if}
</div>
