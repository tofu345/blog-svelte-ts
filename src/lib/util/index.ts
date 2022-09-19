import posts from "$lib/stores/posts";
import notifications from "$lib/stores/notifications";
import general from "$lib/stores/general";
import type { Notif, PostObj } from "$lib/types";
import { goto } from "$app/navigation";
import { api } from "$lib/api";

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

export const deletePost = async (post: PostObj) => {
  const config = {
    url: `/posts/${post.author}/${post.slug}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: post,
  };

  const res = await api(config);

  if (res.status == 200) {
    const data = res.data;

    posts.update((currentData) => {
      return currentData.filter((el) => el.id != post.id);
    });

    sendNotification(data.message, 10000);
  }
  goto("/posts");
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

export const updatePosts = (post: PostObj) => {
  posts.update((currentData) => {
    post = { ...post, to: `/posts/${post.author}/${post.slug}` };
    if (currentData) {
      return [post, ...currentData];
    }
    return [post];
  });
};

// const awaitFunc = async () => {
//   const res = await new Promise<void>((resolve) => {
//     setTimeout(() => resolve(), 100000);
//   });
// };

// awaitFunc();
