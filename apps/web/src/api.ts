import { treaty } from "@elysiajs/eden";
import { isServer } from "solid-js/web";
import { parse } from "set-cookie-parser";
import { App } from "api";

let getHeaders;
let setResponseHeaders;
if (isServer) {
  ({ getHeaders, setResponseHeaders } = await import("vinxi/http"));
}

export default treaty<App>('http://localhost:8080', {
  fetch: {
    credentials: 'include',
  },
  headers(path, options) {
    // If ssr context, copy over client headers.
    if (isServer) {
      return getHeaders();
    }
  },
  onResponse(response) {
    // If ssr context, set headers on client.
    if (isServer) {
      setResponseHeaders(response.headers);
    }
  }
});
