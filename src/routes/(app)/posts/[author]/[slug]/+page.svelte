<script lang="ts">
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";

  import Body from "$lib/Body.svelte";
  import Post from "$lib/Post.svelte";
  import Info from "$lib/Info.svelte";
  import PostSkeleton from "$lib/Skeleton.svelte";

  import posts from "$lib/stores/posts";
  import general from "$lib/stores/general";
  import { api } from "$lib/api";

  const fetchPost = async () => {
    // Check if post exists in Post store
    if ($posts) {
      const post = $posts.find((el) => {
        if (el.slug === $page.params.slug && el.author === $page.params.author)
          return el;
      });

      if (post) {
        return { data: post };
      }
    }

    const res = await api({
      url: `/posts/${$page.params.author}/${$page.params.slug}`,
    });
    if (res.status == 200) {
      return res.data;
    }
  };
</script>

<svelte:head>
  <title>{$general.title}</title>
</svelte:head>

{#await fetchPost()}
  <Body>
    <div slot="left">
      <PostSkeleton contentHeight="300px" />
    </div>
    <div slot="right">
      <PostSkeleton />
    </div>
  </Body>
{:then res}
  {#if res}
    <Body>
      <div slot="left">
        <Post isDetailView={true} post={res.data} />
      </div>
      <div slot="right">
        <Info />
      </div>
    </Body>
  {:else}
    <div class="flex flex-col gap-2 justify-center items-center mt-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="w-20 h-20"
        viewBox="0 0 16 16"
      >
        <path
          d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </svg>
      <p>This Post Does Not Exist</p>
      <p>It might have been renamed or deleted.</p>
    </div>
  {/if}
{/await}
