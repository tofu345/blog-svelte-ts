<!-- <script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import user from "$lib/stores/user";
  import { prefetch } from "$app/navigation";

  const logout = async () => {
    if (browser) {
      window.localStorage.removeItem("user");
      user.set(null);
      await prefetch("/posts");
      goto("/posts");
    }
  };

  logout();
</script> -->
