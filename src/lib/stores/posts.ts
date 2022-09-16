import { writable } from "svelte/store";

import type { Post } from "$lib/types";

const posts = writable<Post[]>();

export default posts;
