<script lang="ts">
  import general from "$lib/stores/general";
  import { fade } from "svelte/transition";

  const closeModal = () => {
    general.update((currentData) => {
      currentData["modalShown"] = false;
      return currentData;
    });
  };
</script>

{#if $general.modalShown}
  <div
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full
    flex justify-center items-center md:inset-0 h-modal bg-gray-700/50"
    on:click|self={() => closeModal()}
    transition:fade={{ duration: 150 }}
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white shadow rounded-lg">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 pb-2 rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">Create Post</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
              rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            on:click={() => closeModal()}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414
                  1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 
                  4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <slot />
      </div>
    </div>
  </div>
{/if}
