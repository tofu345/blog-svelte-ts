import { writable } from "svelte/store";

import type { Notif } from "$lib/types";

const notifications = writable<Notif[]>();

export default notifications;
