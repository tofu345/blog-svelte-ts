import posts from "$lib/stores/posts";
import notifications from "$lib/stores/notifications";
import general from "$lib/stores/general";
import type { Notif, Post } from "$lib/types";
import { goto } from "$app/navigation";

export const truncateStr = (str: string) => {
  const length = 1000;
  if (str && str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};

export const sendNotification = (message: string, timeout?: number) => {
  let currentNotifications: Notif[] | undefined;
  let id: number;

  const unsubscribe = notifications.subscribe(
    (value) => (currentNotifications = value)
  );
  unsubscribe();

  if (currentNotifications && currentNotifications.length > 0) {
    id = currentNotifications.length + 1;
    notifications.update((currentData) => {
      return [...currentData, { message, id }];
    });
  } else {
    id = 1;
    notifications.set([{ message, id }]);
  }

  if (timeout) {
    try {
      setTimeout(() => {
        notifications.update((currentData) => {
          return currentData.filter((el) => el.id != id);
        });
      }, timeout);
    } catch {}
  }
};

export const deletePost = async (post: Post) => {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  };

  const res = await fetch(`/api/posts/${post.author}/${post.slug}`, config)
    .then((res) => res.json())
    .catch((res) => res.json());

  if (res.responseCode == 100) {
    posts.update((currentData) => {
      return currentData.filter((el) => el.id != post.id);
    });
  }

  goto("/posts");
  sendNotification(res.message, 10000);
};

export const closeModal = () => {
  general.update((currentData) => {
    currentData["modalShown"] = false;
    return currentData;
  });
};

export const deleteNotif = (id: number) => {
  notifications.update((currentData) => {
    return currentData.filter((el) => el.id != id);
  });
};

export const updatePosts = (post: Post) => {
  posts.update((currentData) => {
    return [post, ...currentData];
  });

  closeModal();
  sendNotification("Post Created Successfully!", 10000);
};

// const awaitFunc = async () => {
//   const res = await new Promise<void>((resolve) => {
//     setTimeout(() => resolve(), 100000);
//   });
// };

// awaitFunc();
