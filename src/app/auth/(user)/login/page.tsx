"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { type } from "@/types";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  password: z.string().min(5, "hamgiin bagadaa 6").max(8, "8 aas bvv hetvvl"),
  email: z.string().email({ message: "Invalid email address" }),
});
export default function SecondPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const router = useRouter();
  const onNext = () => router.push("/");

  const addData = async (email: string, password: string): Promise<void> => {
    try {
      const addUser = await fetch("http://localhost:4000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!addUser.ok) {
        throw new Error("Signup failed");
      }
      const data = await addUser.json();
      console.log(data.message);
      if (data.error) {
        alert(data.message);
      } else {
        onNext();
      }
    } catch (error) {
      console.log(error);
    }
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    addData(values.email, values.password);
    console.log(values);
  }
  return (
    <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[24px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-wrap gap-1">
                  <FormLabel className="font-inter text-[24px] font-semibold leading-[32px] text-[#09090B]">
                    Enter your email address
                  </FormLabel>
                  <h6 className="text-gray-500 text-base font-normal leading-6">
                    Sign up to explore your favorite dishes.
                  </h6>
                </div>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your password "
                    className="w-[392px] h-[40px] px-[8px] py-[12px] flex  items-center rounded-md border border-gray-300 bg-white border-b-[0.5px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="w-[392px] h-[40px] px-[8px] py-[12px] flex  items-center rounded-md border border-gray-300 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="flex w-[392px] h-[40px] px-8 py-0 justify-center items-center gap-8 rounded-md opacity-20 bg-[#18181B] text-white text-sm font-medium leading-5"
            variant="outline"
            type="submit"
          >
            Let's go
          </Button>
          <div className="flex w-[316px]  items-center  gap-3 justify-center">
            <h3 className="text-gray-500 text-base font-normal leading-6">
              Already have an account?
            </h3>
            <p className="text-16px font-normal leading-6 text-[#2563EB]">
              Log in
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
