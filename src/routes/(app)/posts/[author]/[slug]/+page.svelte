<script lang="ts">
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";

  import Body from "$lib/Body.svelte";
  import Post from "$lib/Post.svelte";
  import Info from "$lib/Info.svelte";

  import posts from "$lib/stores/posts";

  const fetchPost = async () => {
    if ($posts) {
      const post = $posts.find((el) => {
        if (el.slug === $page.params.slug && el.author === $page.params.author)
          return el;
      });
      if (post) {
        return { responseCode: 100, data: post };
      }
    }

    const res = await fetch(
      `/api/posts/${$page.params.author}/${$page.params.slug}`
    );
    return res.json();
  };
</script>

{#await fetchPost()}
  <div class="flex justify-center items-center">
    <p class="p-5">Fetching Post...</p>
  </div>
{:then res}
  {#if res.responseCode == 100}
    <div in:fly={{ x: -30, duration: 500 }}>
      <Body>
        <div slot="left">
          <Post isDetailView={true} post={res.data} />
        </div>
        <div slot="right">
          <Info />
        </div>
      </Body>
    </div>
  {:else}
    <div class="p-10">
      <p>This Post Does Not Exist</p>
      <p>It might have been renamed or deleted.</p>
    </div>
  {/if}
{/await}
