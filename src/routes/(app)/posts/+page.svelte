<script lang="ts">
  import Post from "$lib/Post.svelte";
  import Body from "$lib/Body.svelte";
  import Info from "$lib/Info.svelte";
  import PostListSkeleton from "$lib/PostListSkeleton.svelte";
  import Skeleton from "$lib/Skeleton.svelte";
  import Header from "$lib/Header.svelte";

  import posts from "$lib/stores/posts";
  import general from "$lib/stores/general";
  import { deletePost } from "$lib/util";
  import type { PostObj } from "$lib/types";

  import { api } from "$lib/api";

  const fetchPosts = async () => {
    const res = await api({ url: "/posts" });

    if (res.status == 200) {
      const data = res.data.data;
      data.forEach((el: PostObj) => {
        el["to"] = `/posts/${el.author}/${el.slug}`;
      });
      posts.set(data);
    } else {
      console.log(res);
    }

    return res;
  };
</script>

<svelte:head>
  <title>{$general.title} | Post List</title>
</svelte:head>

<header class="bg-[#3398E1] p-10 px-[20%] text-white">
  <Header />
</header>

{#await $posts ? $posts : fetchPosts()}
  <Body>
    <div slot="left">
      <PostListSkeleton />
    </div>
    <div slot="right">
      <Skeleton />
    </div>
  </Body>
{:then val}
  <div>
    {#if $posts}
      <Body>
        <div slot="left">
          {#each $posts as post (post.id)}
            <div>
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
      <p class="p-5">Error Fetching Posts.</p>
    {/if}
  </div>
{/await}
