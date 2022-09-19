import { writable } from "svelte/store";

const general = writable({
  modalShown: false,
  title: "My Awesome Blog",
});

export default general;
