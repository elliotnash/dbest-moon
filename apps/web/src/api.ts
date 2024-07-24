import { treaty } from "@elysiajs/eden";
import { isServer } from "solid-js/web";
import { parse } from "set-cookie-parser";
import { parseCookies, setCookie } from "vinxi/http";

// Get client cookies from ssr context
function getServerCookies() {
  "use server";
  const cookies = parseCookies();
  let cookie = "";
  for (const [key, value] of Object.entries(cookies)) {
    cookie += `;${key}=${value}`;
  }
  return cookie.substring(1);
}

function setServerCookies(response: Response) {
  "use server";
  for (const cookie of parse(response)) {
    setCookie(cookie.name, cookie.value, {...cookie});
  }
}

export default treaty<App>('http://localhost:8080', {
  fetch: {
    credentials: 'include',
  },
  headers(path, options) {
    // If ssr context, copy over client cookies
    if (isServer) {
      const headers = {
        cookie: getServerCookies(),
      };
      return headers
    }
  },
  onResponse(response) {
    // If ssr context, set cookies on client.
    if (isServer) {
      setServerCookies(response)
    }
  }
});
