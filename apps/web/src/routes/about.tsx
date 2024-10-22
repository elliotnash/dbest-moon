import { A } from "@solidjs/router";
import Counter from "../components/counter";

export default function About() {
  return (
    <main class="text-center text-foreground/60 mx-auto p-4">
      <h1 class="max-6-xs text-6xl text-sky-500 font-thin uppercase my-16">About Page</h1>
      <Counter />
      <p class="mt-8">
        Visit{" "}
        <a href="https://solidjs.com" target="_blank" class="text-foreground hover:underline">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <A href="/" class="text-foreground hover:underline">
          Home
        </A>
        {" - "}
        <span>About Page</span>
      </p>
    </main>
  );
}