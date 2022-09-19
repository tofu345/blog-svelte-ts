import { writable } from "svelte/store";

import type { PostObj } from "$lib/types";

const posts = writable<PostObj[]>();

export default posts;
