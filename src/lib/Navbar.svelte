<script>
  import general from "$lib/stores/general";
  // import { getUser } from "$lib/util";

  const openModal = () => {
    general.update((currentData) => {
      currentData["modalShown"] = true;
      return currentData;
    });
  };

  // const user = getUser();
</script>

<!-- vsm:flex vsm:px-10 -->
<nav
  class="p-5 w-full vsm:flex mx-auto justify-between align-center border-b-2"
>
  <a href="/" class="link"> My Blog Website </a>
  <div class="flex flex-row gap-5">
    <p href="/about" class="link cursor-pointer" on:click={() => openModal()}>
      Create
    </p>
    <a href="/about" class="link"> About </a>
    <!-- {#if user}
      <a href="/login" class="link"> Login </a>
    {:else}
      <a href="/logout" class="link"> Logout </a>
    {/if} -->
  </div>
</nav>
