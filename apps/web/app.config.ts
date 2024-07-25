import { defineConfig } from "@solidjs/start/config";
import tsconfigPaths from 'vite-tsconfig-paths';

const hmrPorts = {
  client: 4440,
  server: 4441,
  'server-function': 4442,
}

export default defineConfig({
  vite: ({ router }) => ({
    plugins: [tsconfigPaths()],
    server: {
      hmr: {
        port: hmrPorts[router]
      },
    }
  })
});
