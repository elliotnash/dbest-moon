import { createSignal } from "solid-js";
import { Button } from "ui/components/button";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <Button
      variant="outline"
      onClick={() => setCount(count() + 1)}
    >
      Clicks: {count()}
    </Button>
  );
}
