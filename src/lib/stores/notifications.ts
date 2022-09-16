import { writable } from "svelte/store";

import type { Notification } from "$lib/types";

export const notifications = writable<Notification[]>();

export const sendNotification = (message: string, timeout: number) => {
  let newId: number;
  let currentNotifications: Notification[] | undefined;

  const unsubscribe = notifications.subscribe(
    (value) => (currentNotifications = value)
  );
  unsubscribe();

  if (currentNotifications && currentNotifications.length > 0) {
    // Get highest id
    const ids = currentNotifications.map((el) => el.id);
    newId = Math.max.apply(null, ids) + 1;

    notifications.update((currentData) => {
      return [...currentData, { message, id: newId }];
    });
  } else {
    newId = 1;
    notifications.set([{ message, id: newId }]);
  }

  if (timeout) {
    try {
      setTimeout(() => {
        notifications.update((currentData) => {
          return currentData.filter((el) => el.id != newId);
        });
      }, timeout);
    } catch {}
  }
};
