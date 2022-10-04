import axios, { type AxiosPromise, type AxiosRequestConfig } from "axios";
import { getUser, sendNotification } from "$lib/util";
import { goto } from "$app/navigation";
import { page } from "$app/stores";

export const api = (config: AxiosRequestConfig): AxiosPromise<any> => {
  const originalConfig = config;
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
  });

  // Automatically add bearer token header if exists
  const user = getUser();
  // console.log(user);
  if (user) {
    const token = `Bearer ${user?.accessToken}`;
    config["headers"]
      ? (config["headers"]["Authorization"] = token)
      : (config["headers"] = { Authorization: token });
  } else {
    // Redirect to Login Page if backend if not logged in
    let pageUrl = "/login";
    let pageAt;
    const unsubscribe = page.subscribe((value) => {
      const url = value.url;
      pageAt = url.pathname;
      const currentPage = url.href.replace(url.origin, "");
      if (currentPage && !pageUrl.includes("?next")) {
        pageUrl += `?next=${currentPage}`;
      }
    });
    unsubscribe();

    if (pageAt != "/login") {
      goto(pageUrl);
      return new Promise(() => {}) as AxiosPromise;
    }
  }

  return instance(config)
    .then((res) => res)
    .catch(async (err): Promise<any> => {
      err = err.response;
      // const data = err.response.data;

      if (err.status == 401) {
        // Try to refresh token
        if (user) {
          const response = await instance({
            url: "/token/refresh/",
            method: "POST",
            data: { refresh: user.refreshToken },
          }).catch((err) => err);

          if (response.status === 200) {
            user.accessToken = response.data.access;
            window.localStorage.setItem("user", JSON.stringify(user));
            return api(originalConfig);
          }
        }

        // window.localStorage.removeItem("user");

        // sendNotification(message, 5000);

        // let nextPage = "/login";
        // const unsubscribe = page.subscribe((value) => {
        //   const url = value.url;
        //   const currentPage = url.href.replace(url.origin, "");
        //   if (currentPage) {
        //     nextPage += `?next=${currentPage}`;
        //   }
        // });
        // unsubscribe();

        // goto(nextPage);
      }

      return err;
    });
};

export const send = async (form: HTMLFormElement, url: string) => {
  let formData: any = {};
  new FormData(form).forEach(function (value, key) {
    formData[key] = value;
  });

  const config = {
    url: url,
    method: form.method,
    data: formData,
    headers: { accept: "application/json" },
  };

  return api(config);
};
