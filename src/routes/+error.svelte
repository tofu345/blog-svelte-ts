<script>
  import "../app.css";
  import { page } from "$app/stores";
</script>

<div
  class="font-sans w-full h-screen flex flex-col gap-2 justify-center items-center p-5 text-2xl"
>
  <div class="flex gap-3 justify-center items-center">
    <p class="font-bold">{$page.status}</p>
    {#if $page.status == 404 && $page?.error?.message == "Internal Error"}
      <p class="font-light">{$page.url.pathname} was not found.</p>
    {:else if $page.status == 500 && $page?.error?.message == "Internal Error"}
      <p class="font-light">
        We cant access the resource you requested right now.
        <br />
        Please try again later.
      </p>
    {:else}
      <p class="font-light">{$page?.error?.message}</p>
    {/if}
  </div>
  <a href="/" class="link text-base">Return Home</a>
</div>
