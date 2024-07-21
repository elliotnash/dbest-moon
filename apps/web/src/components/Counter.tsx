import { createSignal } from "solid-js";
import { Button } from "ui/components/button";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <div class="grid space-y-2">
      <div>
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" 
          onClick={() => setCount(count() + 1)}
        >
          Clicks: {count()}
        </button>
      </div>
      <div>
        <Button
          onClick={() => setCount(count() + 1)}
        >
          Clicks: {count()}
        </Button>
      </div>
    </div>
  );
}
