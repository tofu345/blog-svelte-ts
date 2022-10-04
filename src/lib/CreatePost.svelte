<script lang="ts">
  import { goto } from "$app/navigation";
  import { get } from "svelte/store";

  import posts from "$lib/stores/posts";

  import {
    closeModal,
    sendNotification,
    updatePosts,
    getUser,
  } from "$lib/util";
  import { api } from "$lib/api";

  const user = getUser();

  export let url = "/posts";

  export let post = {
    title: "",
    content: "",
    author: user?.username,
  };

  let errors = {
    title: "",
    content: "",
    non_field_errors: "",
  };

  $: titleInValid = post.title.trim() == "" || post.title.trim().length < 5;
  $: contentInValid =
    post.content.trim() == "" || post.content.trim().length < 5;

  const submitPost = async () => {
    (errors.title = ""), (errors.content = ""), (errors.non_field_errors = "");

    if (titleInValid) errors.title = "Title must be at least 5 characters";
    if (contentInValid)
      errors.content = "Content must be at least 5 characters";
    if (titleInValid || contentInValid) return;

    const config = {
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: post,
    };

    const res = await api(config);

    if (res.status === 200 || res.status === 201) {
      const data = res.data;
      if (get(posts)) {
        updatePosts(data.data);
      }

      closeModal();
      sendNotification("Post Created Successfully!", 10000);
      goto("/posts");
    } else {
      const data = res.data;
      if (data.errors.non_field_errors) {
        errors.non_field_errors = data.errors.non_field_errors;
      } else if (data.message) {
        errors.non_field_errors = data.message;
      }
      if (data.errors.title) errors.title = data.errors.title;
      if (data.errors.content) errors.content = data.errors.content;
    }
  };
</script>

<div class="w-full p-4 pt-0">
  <h3 class="text-2xl font-medium">
    {#if errors.non_field_errors}
      <p class="text-red-500 text-sm mb-2">{errors.non_field_errors}</p>
    {/if}
  </h3>

  <form on:submit|preventDefault class="flex flex-col gap-2">
    <div>
      <input
        type="text"
        name="title"
        class="form-control text-3xl mb-1 {errors.title
          ? 'border-red-500'
          : ''}"
        placeholder="Title"
        bind:value={post.title}
      />
      {#if errors.title}
        <p class="text-red-500 text-sm">{errors.title}</p>
      {/if}
    </div>

    <div>
      <textarea
        name="content"
        class="form-control {errors.content ? 'border-red-500' : ''}"
        placeholder="Content"
        rows="10"
        cols="50"
        bind:value={post.content}
      />
      {#if errors.content}
        <p class="text-red-500 text-sm">{errors.content}</p>
      {/if}
    </div>
    <button
      on:click={() => submitPost()}
      class="w-fit p-[10px] mt-2 bg-red-500 disabled:opacity-70 font-bold text-white rounded-lg
      border-[3px] border-white focus:border-black"
    >
      Create
    </button>
  </form>
</div>
