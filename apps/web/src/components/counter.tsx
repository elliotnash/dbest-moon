import { createMutation, createQuery } from "@tanstack/solid-query";
import { createEffect, createMemo, createSignal, Suspense } from "solid-js";
import { Button } from "ui/components/button";
import api from "~/api";
import { isServer } from "solid-js/web";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "ui/components/alert-dialog";
import { DialogFooter } from "ui/components/dialog";

export default function Counter() {
  const clicksQuery = createQuery(() => ({
    queryKey: ['clicks'],
    queryFn: async () => (await api.clicks.get()).data!
  }))
  const [clicks, setClicks] = createSignal<number>(clicksQuery.data);

  const { mutate: addClick } = createMutation(() => ({
    mutationFn: async () => await api.click.put(),
    onSuccess: (res) => setClicks(res.data),
    onMutate: () => setClicks((clicks() ?? 0) + 1)
  }));

  const { mutate: deleteClicks } = createMutation(() => ({
    mutationFn: async () => await api.clicks.delete(),
    onSuccess: () => setClicks(0),
  }));

  const [confirmOpen, setConfirmOpen] = createSignal(false);

  return (
    <div class="space-x-2">
      <Button
        variant="default"
        class="touch-manipulation"
        onClick={() => addClick()}
      >
        Clicks: {clicks()}
      </Button>
      <AlertDialog open={confirmOpen()} onOpenChange={setConfirmOpen} >
        <AlertDialogTrigger as={Button} variant="destructive" >Reset Clicks</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure you want to reset clicks?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your clicks from our servers.
          </AlertDialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              deleteClicks();
              setConfirmOpen(false);
            }}>Continue</Button>
          </DialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
