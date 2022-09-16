import api from "$lib/api/api";

import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  return api(`/posts/${params.author}/${params.slug}`);
};

export const DELETE: RequestHandler = async ({ params }) => {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api(`/posts/${params.author}/${params.slug}`, config);
};
