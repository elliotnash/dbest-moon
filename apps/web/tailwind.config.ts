import config from "ui/tailwind.config";
import type { Config } from 'tailwindcss'

export default {
  ...config,
  content: [
    ...config.content,
    "../../packages/ui/**/*.{ts,tsx}"
  ],
} satisfies Config
