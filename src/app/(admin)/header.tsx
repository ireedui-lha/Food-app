"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const formSchema = z.object({
  categoryName: z.string().min(2).max(50),
});
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { type } from "@/types";

export function Headers() {
  const [getDatas, setGetDatas] = useState<any[]>([]);
  const [postDatas, setPostDatas] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });
  //
  const getData = async () => {
    try {
      const data = await fetch("http://localhost:4000/food");
      const jsonData = await data.json();
      console.log("aaaa", jsonData);
      setGetDatas(jsonData.getfood);
    } catch (error) {
      console.log("error");
    }
  };
  const PostData = async (categoryName: string) => {
    try {
      const postData = await fetch("http://localhost:4000/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName: categoryName }),
      });

      if (!postData.ok) {
        throw new Error(`getdata status:${postData.status}`);
      }

      const getJson = await postData.json();
      console.log("Post response:", getJson);

      setPostDatas(getJson.postData || []);
    } catch (error) {
      console.log("error", error);
    }

    await getData();
  };
  const deleteData = async (id: string) => {
    const data = await fetch(`http://localhost:4000/food/${id}`, {
      method: "DELETE",
    });
    getData();
  };
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);
  const updateData = async (id: string) => {
    const data = await fetch(`http://localhost:4000/food/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: update }),
    });
    getData();
  };
  const handlechange = (e: any) => {
    const { value } = e.target;
    setUpdate(value);
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await PostData(values.categoryName);
    // alert("ok");
    setOpen(false); // Close popover after submitting
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className=" w-[90vw] h-[176px] justify-center items-center">
        <div className="flex gap-4 flex-wrap">
          {getDatas?.map((data: type, index) => (
            <ContextMenu key={index}>
              <ContextMenuTrigger className="border-[0.5px] justify-center border-black px-5 rounded-full cursor-pointer py-2">
                {data.categoryName}
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem
                  onClick={() => {
                    deleteData(data._id);
                  }}
                >
                  Delete
                </ContextMenuItem>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          onChange={handlechange}
                          id="name"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4"></div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => {
                          updateData(data._id);
                        }}
                        type="submit"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </ContextMenuContent>
            </ContextMenu>
          ))}
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-full">
              +
            </Button>
          </PopoverTrigger>
        </div>
      </div>
      <PopoverContent className="w-[426px] h-[254px] flex flex-col justify-between gap-7">
        <div className="flex justify-between">
          <h4 className="font-medium leading-none">Add new category</h4>
          {/* <ButtonSecondary onClose={() => setOpen(false)} /> */}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[392px]"
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-end">
              <Button type="submit">Add Category</Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
