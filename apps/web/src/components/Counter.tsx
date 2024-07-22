import { createMutation } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import { Button } from "ui/components/button";
import api from "api-client";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  const clickAdd = createMutation(() => ({
    mutationFn: async () => await api.click.put(),
    onSuccess: () => {
      setCount(count() + 1)
    },
  }));

  return (
    <div class="space-x-2">
      <Button
        variant="default"
        onClick={() => clickAdd.mutate()}
      >
        Clicks: {count()}
      </Button>
      <Button
          variant="destructive"
          // onClick={() => setCount(0)}
        >
          Reset Clicks
      </Button>
    </div>
  );
}
