import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { isServer } from "solid-js/web"
import { ColorModeProvider, ColorModeScript, cookieStorageManagerSSR } from "@kobalte/core"
import { getCookie } from "vinxi/http"
import Navbar from "~/components/navbar";
import { QueryClientProvider, QueryClient } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import 'solid-devtools';

import "ui/globals.css";
import { MetaProvider } from "@solidjs/meta";

function getServerCookies() {
  "use server"
  const colorMode = getCookie("kb-color-mode")
  return colorMode ? `kb-color-mode=${colorMode}` : ""
}

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5000,
      },
    },
  });
  const storageManager = cookieStorageManagerSSR(isServer ? getServerCookies() : document.cookie);
  storageManager.get
  return (
    <Router
      root={props => (
        <MetaProvider>
          <QueryClientProvider client={queryClient}>
            <SolidQueryDevtools buttonPosition="bottom-left" />
            <ColorModeScript storageType={storageManager.type} />
            <ColorModeProvider storageManager={storageManager}>
              <Navbar />
              <Suspense>{props.children}</Suspense>
              </ColorModeProvider>
          </QueryClientProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
