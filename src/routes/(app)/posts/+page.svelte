<script lang="ts">
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Post from "$lib/Post.svelte";
  import Body from "$lib/Body.svelte";
  import Info from "$lib/Info.svelte";
  import PostListSkeleton from "$lib/PostListSkeleton.svelte";
  import PostSkeleton from "$lib/PostSkeleton.svelte";
  import posts from "$lib/stores/posts";
  import general from "$lib/stores/general";
  import { deletePost } from "$lib/util";
  import Header from "$lib/Header.svelte";
  import type { PostObj } from "$lib/types";

  import { api } from "$lib/api";

  const fetchPosts = async () => {
    if ($posts) {
      return;
    }

    const res = await api({
      url: "/posts",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem("user") || "{}").accessToken
        }`,
      },
    });

    if (res.status == 200) {
      const data = res.data.data;
      data.forEach((el: PostObj) => {
        el["to"] = `/posts/${el.author}/${el.slug}`;
      });
      posts.set(data);
    }

    return res;
  };

  const postList = fetchPosts();
</script>

<svelte:head>
  <title>{$general.title} | Post List</title>
</svelte:head>

<header class="bg-[#3398E1] p-10 px-[20%] text-white">
  <Header />
</header>

{#await postList}
  <Body>
    <div slot="left">
      <PostListSkeleton />
    </div>
    <div slot="right">
      <PostSkeleton />
    </div>
  </Body>
{:then val}
  <div in:fly={{ x: -30, duration: 500 }}>
    {#if $posts}
      <Body>
        <div slot="left">
          {#each $posts as post (post.id)}
            <div animate:flip={{ duration: 500 }}>
              <Post {post} on:deletePost={(e) => deletePost(e.detail)} />
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
      <p class="p-5">
        {val || "Error Fetching Posts."}
      </p>
    {/if}
  </div>
{/await}
