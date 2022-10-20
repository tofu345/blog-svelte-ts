import { goto } from "$app/navigation";
import { api } from "$lib/api";

import posts from "$lib/stores/posts";
import userPosts from "$lib/stores/userPosts";
import notifications from "$lib/stores/notifications";
import general from "$lib/stores/general";

import type { Notif, PostObj, User } from "$lib/types";

export const getUser = (): User | null => {
  const user = window.localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

export const truncateStr = (str: string, length = 1000) => {
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
    // Check if notif with message exists
    const msgIfExists = currentNotifications.find(
      (el) => el.message == message
    );
    id = Math.floor(Math.random() * 1001);

    if (msgIfExists) {
      msgIfExists.occurence += 1;
      notifications.update((currentData) => {
        return [
          ...currentData.filter((el) => el.message != message),
          msgIfExists,
        ];
      });
    } else {
      notifications.update((currentData) => [
        ...currentData,
        { message, id, occurence: 1 },
      ]);
    }
  } else {
    id = 1;
    notifications.set([{ message, id, occurence: 1 }]);
  }

  if (timeout) {
    setTimeout(() => {
      notifications.update((currentData) => {
        return currentData.filter((el) => el.id != id);
      });
    }, timeout);
  }
};

export const updatePosts = (post: PostObj) => {
  posts.update((currentData) => {
    post = { ...post, to: `/posts/${post.author}/${post.slug}` };
    if (currentData) {
      return [post, ...currentData];
    }
    return [post];
  });
  userPosts.update((currentData) => {
    return [post, ...currentData];
  });
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
    userPosts.update((currentData) => {
      return currentData.filter((el) => el.id != post.id);
    });

    sendNotification(data.message, 10000);
  } else {
    // console.log(res);
    sendNotification(res.data.message, 10000);
  }
  goto("/posts");
};

export const openModal = () => {
  general.update((currentData) => {
    currentData["modalShown"] = true;
    return currentData;
  });
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

// For Testin Purposes
export async function awaitFunc(timeout = 5000) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
}

// awaitFunc();
