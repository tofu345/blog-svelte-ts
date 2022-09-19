import axios, { type AxiosRequestConfig } from "axios";
import { sendNotification } from "$lib/util";
import { goto } from "$app/navigation";
import { page } from "$app/stores";

export const api = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  return instance(config)
    .then((res) => res)
    .catch((err) => {
      err = err.response;
      // const data = err.response.data;

      if (err.status == 401) {
        // if (data.detail === "Authentication credentials were not provided.") {
        console.log(err);
        sendNotification(err.data.message || err.data.detail, 5000);
        page.subscribe((value) => {
          goto("/login");
        });
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
