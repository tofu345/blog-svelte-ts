<script>
  import { browser } from "$app/environment";
  // import { goto } from "$app/navigation";
  // import user from "$lib/stores/user";

  const logout = async () => {
    if (browser) {
      window.localStorage.removeItem("user");
      // user.set(null);
      window.location.href = "/login";
    }
  };

  logout();
</script>
