import { createSignal } from "solid-js";
import { Button } from "ui/components/button";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <div class="space-x-2">
      <Button
        variant="default"
        onClick={() => setCount(count() + 1)}
      >
        Clicks: {count()}
      </Button>
      <Button
          variant="destructive"
          onClick={() => setCount(0)}
        >
          Reset Clicks
      </Button>
    </div>
  );
}
