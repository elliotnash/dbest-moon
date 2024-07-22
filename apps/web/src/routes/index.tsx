import { A } from "@solidjs/router";
import Counter from "~/components/counter";

export default function Home() {
  return (
    <main class="text-center mx-auto text-foreground/60 p-4">
      <h1 class="max-6-xs text-6xl text-sky-500 font-thin uppercase my-16">Hello world!</h1>
      <Counter />
      <p class="mt-8">
        Visit{" "}
        <a href="https://solidjs.com" target="_blank" class="text-foreground hover:underline">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-foreground hover:underline">
          About Page
        </A>{" "}
      </p>
    </main>
  );
}
