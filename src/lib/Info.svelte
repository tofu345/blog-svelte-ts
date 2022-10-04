<script>
  import { page } from "$app/stores";

  import Card from "./Card.svelte";
  import Skeleton from "./Skeleton.svelte";

  import userPosts from "$lib/stores/userPosts";
  import { awaitFunc, getUser } from "$lib/util";
  import { api } from "./api";

  const fetchUserPosts = async () => {
    if ($userPosts) {
      return;
    }

    const user = getUser();
    if (user) {
      const res = await api({ url: `posts/${user.username}` });
      if (res.status == 200) {
        const data = res.data.data;
        userPosts.set(data.posts);
      }
    }
    return;
  };
</script>

{#await fetchUserPosts()}
  <Skeleton />
{:then data}
  <Card>
    <h2 class="text-xl pb-2 w-full border-b-2">Your Posts</h2>
    {#each $userPosts as post}
      <a
        href="/posts/{post.author}/{post.slug}"
        class="hover:underline
        {$page.url.pathname == `/posts/${post.author}/${post.slug}`
          ? 'underline'
          : ''}"
      >
        {post.title}
      </a>
    {/each}
    {#if $userPosts.length == 0}
      <p>No Posts yet.</p>
    {/if}
  </Card>
{/await}
