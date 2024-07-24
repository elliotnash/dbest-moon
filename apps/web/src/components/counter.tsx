import { createMutation, createQuery } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
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
  const [confirmOpen, setConfirmOpen] = createSignal(false);

  const clicksQuery = createQuery(() => ({
    queryKey: ['clicks'],
    queryFn: async () => (await api.clicks.get()).data!
  }))

  const clickAdd = createMutation(() => ({
    mutationFn: async () => await api.click.put(),
    onSuccess: () => clicksQuery.refetch(),
  }));

  const clickDelete = createMutation(() => ({
    mutationFn: async () => await api.clicks.delete(),
    onSuccess: () => clicksQuery.refetch(),
  }));

  return (
    <div class="space-x-2">
      <Button
        variant="default"
        onClick={() => clickAdd.mutate()}
      >
        Clicks: {clicksQuery.data ?? 0}
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
              clickDelete.mutate();
              setConfirmOpen(false);
            }}>Continue</Button>
          </DialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
