import { writable } from "svelte/store";

const general = writable({
  modalShown: false,
});

export default general;
