<script lang="ts">
  import "../../app.css";

  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  import Navbar from "$lib/Navbar.svelte";
  import Transition from "$lib/Transition.svelte";
  import CreatePost from "$lib/CreatePost.svelte";
  import Modal from "$lib/Modal.svelte";
  import Toast from "$lib/Toast.svelte";

  import posts from "$lib/stores/posts";
  import { notifications, sendNotification } from "$lib/stores/notifications";
  import general from "$lib/stores/general";

  const closeModal = () => {
    general.update((currentData) => {
      currentData["modalShown"] = false;
      return currentData;
    });
  };

  const deleteNotif = (e: CustomEvent) => {
    notifications.update((currentData) => {
      return currentData.filter((el) => el.id != e.detail);
    });
  };

  const updatePosts = (e: CustomEvent) => {
    if ($posts) {
      const ids = $posts.map((el) => el.id);
      const newId = Math.max.apply(null, ids) + 1;

      posts.update((currentData) => {
        return [{ ...e.detail, id: newId }, ...currentData];
      });
    }

    closeModal();
    sendNotification("Post Created Successfully!", 10000);
  };
</script>

<Navbar />
<Transition url={$page.url}>
  <slot />
</Transition>

<!-- Create Post Modal -->
<Modal>
  <CreatePost on:postCreated={updatePosts} />
</Modal>

<!-- Notifications -->
<div
  class="z-40 fixed bottom-5 left-5 mr-5 w-fit
    max-w-[500px] max-h-[100px]
    flex flex-col-reverse gap-2"
>
  {#if $notifications}
    {#each $notifications as notif (notif.id)}
      <div
        out:fly={{ x: -200, duration: 500 }}
        in:fly={{ x: -200, duration: 500 }}
        animate:flip={{ duration: 500 }}
      >
        <Toast {notif} on:deleteNotif={deleteNotif} />
      </div>
    {/each}
  {/if}
</div>
