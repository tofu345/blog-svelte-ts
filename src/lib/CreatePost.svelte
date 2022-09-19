<script lang="ts">
  import { goto } from "$app/navigation";
  import { updatePosts } from "$lib/util";

  export let post = {
    title: "",
    content: "",
    author: "tofu",
  };
  let errors = {
    title: "",
    content: "",
    non_field_errors: "",
  };
  let submittingPost = false;

  $: titleInValid = post.title.trim() == "" || post.title.trim().length < 5;
  $: contentInValid =
    post.content.trim() == "" || post.content.trim().length < 5;

  const submitPost = async () => {
    if (submittingPost) {
      return;
    }

    (errors.title = ""),
      (errors.content = ""),
      (errors.non_field_errors = ""),
      (submittingPost = true);

    if (titleInValid) {
      errors.title = "Title must be at least 5 characters";
    }
    if (contentInValid) {
      errors.content = "Content must be at least 5 characters";
    }
    if (titleInValid || contentInValid) return;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    };

    const res = await fetch("/api/posts/", config)
      .then((res) => res.json())
      .catch((res) => res.json());

    // console.log(res);

    if (res.errors) {
      if (res.errors.non_field_errors)
        errors.non_field_errors = res.errors.non_field_errors;
      if (res.errors.title) errors.title = res.errors.title;
      if (res.errors.content) errors.content = res.errors.content;
    } else {
      updatePosts(res.data);
      goto("/posts");
    }

    submittingPost = false;
  };
</script>

<div class="w-full p-4 pt-0 flex flex-col gap-2">
  <h3 class="text-2xl font-medium">
    {#if errors.non_field_errors}
      <p class="text-red-500 text-sm">{errors.non_field_errors}</p>
    {/if}
  </h3>

  <div>
    <input
      type="text"
      name="title"
      class="form-control text-3xl {errors.title ? 'border-red-500' : ''}"
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
</div>
