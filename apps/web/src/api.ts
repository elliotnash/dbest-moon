import { treaty } from "@elysiajs/eden";
import { isServer } from "solid-js/web";
import { parse } from "set-cookie-parser";
import { App } from "api";

const { getHeaders, setResponseHeaders } = await import("vinxi/http");

// Get client headers from ssr context
function getServerHeaders() {
  "use server";
  return getHeaders();
}

function setServerHeaders(headers: Headers) {
  "use server";
  setResponseHeaders(headers);
}

export default treaty<App>('http://localhost:8080', {
  fetch: {
    credentials: 'include',
  },
  // headers(path, options) {
  //   // If ssr context, copy over client headers.
  //   if (isServer) {
  //     console.log("we're making a request server side");
  //     // return getServerHeaders();
  //   } else {
  //     console.log("we're making a request client side");
  //   }
  // },
  // onResponse(response) {
  //   // If ssr context, set headers on client.
  //   if (isServer) {
  //     // setServerHeaders(response.headers)
  //   }
  // }
});
