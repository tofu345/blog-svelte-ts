<script lang="ts">
  import { openModal, awaitFunc } from "$lib/util";
  import type { User } from "$lib/types";
  import { api } from "./api";

  let dropdownShown = false;
  let userAvatar = "/images/defaultAvater.svg";

  const getUserData = async (): Promise<User> => {
    // const await_ = await awaitFunc();
    const res = await api({ url: "user/info" });
    let data;
    if (res.status === 200) {
      data = res.data.data;
      userAvatar = data.image ? data.image : userAvatar;
    }

    const user = window.localStorage.getItem("user");
    const userObj = JSON.parse(user || "null") as User;
    if (userObj) {
      return userObj;
    } else {
      return null;
    }
  };
</script>

<!-- vsm:flex vsm:px-10 -->
<nav
  class="px-5 py-3 w-full h-fit flex mx-auto justify-between items-center border-b-2"
>
  {#await getUserData()}
    <div class="h-10 w-[100px] skeleton" />
    <div class="flex flex-row gap-5 items-center">
      <div class="h-10 w-20 skeleton" />
      <div class="h-10 w-20 skeleton" />
      <div class="h-10 w-10 skeleton rounded-full" />
    </div>
  {:then user}
    <a href="/" class="link"> My Blog Website </a>
    {#if user}
      <div class="flex flex-row gap-3 items-center">
        <p
          href="/about"
          class="link cursor-pointer"
          on:click={() => openModal()}
        >
          Create
        </p>
        <div class="relative">
          <div
            class="rounded-full relative cursor-pointer"
            on:click={() => (dropdownShown = !dropdownShown)}
          >
            <img
              src={userAvatar}
              class="w-[44px] max-h-[75px] p-0 m-0"
              alt=""
            />
          </div>
          {#if dropdownShown}
            <div
              class="fixed top-0 right-0 w-screen h-screen z-[49]"
              on:click={() => (dropdownShown = false)}
            />
            <div
              class="z-50 absolute top-[120%] right-0 w-max min-w-[200px] h-max bg-gray-100
                rounded-md border-gray-300 border p-2 flex flex-col text-right gap-2"
            >
              <p href="/" class="link">Settings</p>
              <a href="/about" class="link"> About Us </a>
              <a href="/logout" class="link"> Logout </a>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <a href="/login" class="link"> Login </a>
    {/if}
  {/await}
</nav>

<!-- <a href="/logout" class="link"> Logout </a>
      <a href="/login" class="link"> Login </a>
      <a href="/login" class="link"> Login2 </a> -->
