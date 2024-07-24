import { createMutation, createQuery } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import { Button } from "ui/components/button";
import api from "api-client";
import { getCookie } from "vinxi/http";
import { isServer } from "solid-js/web";

function getServerDeviceIdHeaders() {
  "use server";
  const deviceId = getCookie("deviceId");
  return {
    cookie: `deviceId=${deviceId}`
  };
}

export default function Counter() {
  // const [count, setCount] = createSignal(0);

  const clicksQuery = createQuery(() => ({
    queryKey: ['clicks'],
    queryFn: async () => {
      console.log(`We're calling clicksQuery from ${isServer ? "server" : "client"}`);

      let headers = isServer ? getServerDeviceIdHeaders() : undefined;

      console.log(`headers = ${Object.entries(headers)}`);

      return (await api.clicks.get(headers)).data!
    }
  }))

  const clickAdd = createMutation(() => ({
    mutationFn: async () => await api.click.put(),
    onSuccess: () => {
      clicksQuery.refetch();
    },
  }));

  return (
    <div class="space-x-2">
      <Button
        variant="default"
        onClick={() => clickAdd.mutate()}
      >
        Clicks: {clicksQuery.data ?? 0}
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
