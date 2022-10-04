import { writable } from "svelte/store";

import type { PostObj } from "$lib/types";

const userPosts = writable<PostObj[]>();

export default userPosts;
