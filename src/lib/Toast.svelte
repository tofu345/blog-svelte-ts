<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { truncateStr } from "$lib/util";

  import type { Notif } from "$lib/types";

  const dispatch = createEventDispatcher();

  export let notif: Notif;
</script>

<div class="bg-white rounded-xl flex justify-between border-2 w-[350px]">
  <div class="h-full m-4 mr-3 break-words overflow-hidden">
    {truncateStr(notif.message)}
    {notif.occurence > 1 ? `(x${notif.occurence})` : ""}
  </div>

  <div
    class="transition-all duration-300 cursor-pointer h-full m-3 ml-0 mr-2 p-3 my-auto rounded-full border-2 border-transparent
      hover:bg-gray-200/60 hover:border-gray-300/70"
    on:click={() => dispatch("deleteNotif", notif.id)}
  >
    <div class="h-full flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="black"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        />
      </svg>
    </div>
  </div>
</div>
