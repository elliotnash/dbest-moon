import { For } from "solid-js";
import { useLocation } from "@solidjs/router";

import { cn } from "ui/lib/utils";
import { RiLogosGithubLine } from 'solid-icons/ri';
import { ModeToggle } from "~/components/mode-toggle";
import { buttonVariants } from "ui/components/button";

export default function Navbar() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "text-foreground/80" : "text-foreground/60";
  return (
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-14 max-w-screen-2xl items-center">
        <div class="mr-4 hidden md:flex">
          <a href="/" class="mr-6 flex items-center space-x-2">
            <span class="hidden font-bold sm:inline-block">DBEST-Moon</span>
          </a>
          <nav class="flex items-center gap-4 text-sm lg:gap-6">
            <a href="/" class={`${active("/")} transition-colors hover:text-foreground/80`}>Home</a>
            <a href="/about" class={`${active("/about")} transition-colors hover:text-foreground/80`}>About</a>
          </nav>
        </div>

        <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div class="flex items-center">
            <a href="https://github.com/sek-consulting/solid-ui" target="_blank" rel="noreferrer">
              <div
                class={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost"
                  }),
                  "w-9 px-0"
                )}
              >
                <RiLogosGithubLine class="size-5" />
                <span class="sr-only">GitHub</span>
              </div>
            </a>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
