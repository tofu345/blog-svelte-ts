<script lang="ts">
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  import Post from "$lib/Post.svelte";
  import Body from "$lib/Body.svelte";
  import Info from "$lib/Info.svelte";
  import PostSkeleton from "$lib/PostSkeleton.svelte";

  import posts from "$lib/stores/posts";
  import { sendNotification } from "$lib/stores/notifications";

  const fetchPosts = () => {
    return fetch("/api/posts")
      .then((res) => res.json())
      .catch((err) => err)
      .then((res) => {
        posts.set(res.data);
      });
  };

  const deletePost = async (e: CustomEvent) => {
    const post = e.detail;
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    };

    const res = await fetch(`/api/posts/${post.author}/${post.slug}`, config)
      .then((res) => res.json())
      .catch((res) => res.json());

    if (res.responseCode == 100) {
      posts.update((currentData) => {
        return currentData.filter((el) => el.id != post.id);
      });
    }

    sendNotification(res.message, 10000);
  };
</script>

<header class="bg-[#3398E1] p-10 px-[20%] text-white">
  <p class="text-3xl mb-5">Welcome to my Awesome Blog</p>
  <p>We Love Django and Svelte as much as you do!</p>
</header>

{#await fetchPosts()}
  <div class="flex justify-center items-center">
    <p class="p-5">Fetching Posts...</p>
  </div>
{:then value}
  <div in:fly={{ x: -30, duration: 500 }}>
    {#if $posts}
      <Body>
        <div slot="left">
          <!-- <PostSkeleton /> -->
          {#each $posts as post (post.id)}
            <div animate:flip={{ duration: 500 }}>
              <Post {post} on:deletePost={deletePost} />
            </div>
          {/each}
          {#if $posts.length == 0}
            <p class="p-5">No Posts yet.</p>
          {/if}
        </div>
        <div slot="right">
          <Info />
        </div>
      </Body>
    {:else}
      <p class="p-5">Error Fetching Posts.</p>
    {/if}
  </div>
{/await}
