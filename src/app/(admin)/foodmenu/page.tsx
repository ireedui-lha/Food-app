import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Inputfood from "../input";
import Page from "../page";
import { Headers } from "../header";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[400px] h-[400px]" variant="outline">
          Add new dish to Appetizers
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-[460px] h-[592px]">
        <DialogHeader>
          <DialogTitle>Add new dish to Appetizers</DialogTitle>
        </DialogHeader>
        <Inputfood />

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
