import axios, { type AxiosRequestConfig } from "axios";
import { getUser, sendNotification } from "$lib/util";
import { goto } from "$app/navigation";
import { page } from "$app/stores";

export const api = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  // Automatically add bearer token header if exists
  let user = getUser();
  const token = `Bearer ${
    JSON.parse(window.localStorage.getItem("user") || "{}").accessToken
  }`;
  if (user) {
    config["headers"]
      ? (config["headers"]["Authorization"] = token)
      : (config["headers"] = { Authorization: token });
  }

  return instance(config)
    .then((res) => res)
    .catch((err) => {
      err = err.response;
      // const data = err.response.data;

      // Redirect to Login Page if backend if not logged in
      if (err.status == 401) {
        // console.log(err);
        err.data.detail === "Authentication credentials were not provided."
          ? sendNotification("Please Log in to continue", 5000)
          : sendNotification(
              err.data.message ||
                err.data.detail ||
                "Please Log in to continue",
              5000
            );

        let nextPage = "/login";
        const unsubscribe = page.subscribe((value) => {
          const url = value.url;
          const currentPage = url.href.replace(url.origin, "");
          if (currentPage) {
            nextPage += `?next=${currentPage}`;
          }
        });
        unsubscribe();

        goto(nextPage);
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
