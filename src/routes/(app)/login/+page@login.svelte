<script lang="ts">
  import Header from "$lib/Header.svelte";
  import { send } from "$lib/api";

  import { goto } from "$app/navigation";

  let error: string = "",
    username: string = "",
    disabled = false,
    usernameError = "",
    passwordError = "";

  const handleSubmit = async (e: SubmitEvent) => {
    (error = ""), (usernameError = ""), (passwordError = "");
    disabled = true;

    const formEl = e.target as HTMLFormElement;
    const res = await send(formEl, "/token/");
    const data = res.data;

    if (res.status != 200) {
      const resErrors = res.response.data;
      usernameError = resErrors.username ? resErrors.username : "";
      passwordError = resErrors.password ? resErrors.password : "";
      error = resErrors.detail ? resErrors.detail : "";

      disabled = false;
      return;
    } else {
      if (data.access && data.refresh) {
        // window.localStorage.setItem(
        //   "user",
        //   JSON.stringify({
        //     username,
        //     accessToken: data.access,
        //     refreshToken: data.refresh,
        //   })
        // );

        // const nextPage = new URLSearchParams(window.location.search).get(
        //   "next"
        // );
        goto("/posts");
        return;
      }
      // console.log(userObj);
    }

    disabled = false;
    error = "Error Signing you in";
  };
</script>

<div class="w-screen h-screen flex flex-row">
  <div class="w-full bg-[#3398E1] hidden md:block max-w-[40%] text-white py-10">
    <div class="flex flex-col h-full justify-center items-center">
      <Header />
    </div>
  </div>
  <div class="w-full bg-[#F5F5F5] flex flex-col justify-center items-center">
    <div class="w-70 lg:w-[400px] max-w-[70%] mx-auto">
      <div class="text-left pl-2 mb-5">
        <h3 class="text-5xl font-semibold mb-2">Sign in</h3>
        <p class="mb-2">Sign in to your account</p>
        <p class="text-red-500 text-sm">{error}</p>
      </div>

      <form
        method="POST"
        on:submit|preventDefault={handleSubmit}
        class="bg-white my-3 p-5 rounded-xl flex flex-col gap-5"
      >
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            bind:value={username}
            class="form-control mt-2  {usernameError ? 'border-red-500' : ''}"
            required
            {disabled}
          />
          {#if usernameError}
            <p class="text-red-500 text-sm">{usernameError}</p>
          {/if}
        </div>

        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control mt-2 {passwordError ? 'border-red-500' : ''}"
            required
            {disabled}
          />
          {#if usernameError}
            <p class="text-red-500 text-sm">{usernameError}</p>
          {/if}
        </div>

        <button
          class="w-full bg-[#3398E1] rounded-lg text-white font-semibold h-10
            text-xl"
        >
          Sign in
        </button>
      </form>
    </div>
    <p>
      Don't have an account?
      <a href="/register" class="text-[#3398E1] border-b-[#3398E1]">
        Register here!
      </a>
    </p>
  </div>
</div>
