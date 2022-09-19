<script lang="ts">
  import Card from "./Card.svelte";
  import { truncateStr, deletePost } from "$lib/util";
  import type { PostObj } from "$lib/types";

  export let post: PostObj = {
    id: 0,
    title: "Post",
    content: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Animi excepturi aperiam recusandae deserunt, dolor, 
    reiciendis velit, perspiciatis tenetur asperiores vero debitis. 
    Officia accusantium iure iusto enim? Magnam dicta autem vero.`,
    to: "/",
    author: "tofu",
    created: "Today",
    updated: "",
    slug: "",
  };
  export let isDetailView = false;
</script>

<Card>
  <h3 class="text-3xl font-medium">{post.title}</h3>
  <p class="font-light text-gray-500">
    Written on {post.created} by {post.author}
  </p>
  <p class="break-all whitespace-pre-line">
    {#if !isDetailView}
      {truncateStr(post.content)}
    {:else}
      {post.content}
    {/if}
  </p>
  {#if !isDetailView}
    <a
      class="css-transition relative p-[10px] pr-7 mt-2 bg-blue-500 font-bold text-white rounded-md"
      href={post.to}
    >
      <p>Read More</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="absolute top-1/3 right-[6px]"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
        />
      </svg>
    </a>
  {/if}

  {#if isDetailView}
    <button
      type="button"
      class="absolute top-0 right-0 m-3 text-gray-400 bg-transparent hover:bg-gray-200
      hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center
      dark:hover:bg-gray-600 dark:hover:text-white"
      on:click={() => deletePost(post)}
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
  {/if}
</Card>

<style>
  .css-transition {
    width: 120px;
    transition: 0.4s;
  }

  .css-transition:hover {
    width: 130px;
  }
</style>
