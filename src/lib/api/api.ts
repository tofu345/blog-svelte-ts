import { error, json } from "@sveltejs/kit";

export default async (url: URL | string, config?: RequestInit) => {
  const res = await fetch("http://localhost:8000/api" + url, config);
  const data = await res.json();
  if (data.responseCode != 100) {
    throw error(res.status, data);
  } else {
    return json(data);
  }
};
