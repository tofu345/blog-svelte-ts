import { error, json } from "@sveltejs/kit";
import api from "$lib/api/api";

import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const posts = await api("/posts").then((res) => res.json());

  if (posts) {
    return json(posts);
  }

  throw error(404, "Error Fetching Posts");
};

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: body.title || "",
      content: body.content || "",
      author: "tofu",
    }),
  };

  return api("/posts/", config);
};
