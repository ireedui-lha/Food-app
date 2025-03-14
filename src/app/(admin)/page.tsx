"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const UPLOAD_PRESET = "food-delivery";
const CLOUD_NAME = "616113615184841";

const uploadImage = async (file: File | null) => {
  console.log("Upload image working", file);
  if (!file) return null;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("api_key", CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log("image upload succes", result);
    return result.secure_url;
  } catch (error) {
    console.log(error);
    return { error: "zurag bairshuul" };
  }
};

const formSchema = z.object({
  categoryName: z.string().min(1, { message: "hoolni ner" }),
  price: z.string().min(1, { message: "vniig oruul" }),
  ingredients: z.string().min(5, { message: "orts 5 aas deesh" }),
  image: z.string().nonempty("zurag oruul"),
});

export function DialogDemos() {
  const [foodImageFile, setFoodImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      price: "",
      ingredients: "",
      image: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFoodImageFile(file);
    const tempImageUrl = URL.createObjectURL(file);
    setPreviewUrl(tempImageUrl);
    form.setValue("image", "uploaded");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("NEMDEG AJILJ EHELLEE");
    const imageUrl = await uploadImage(foodImageFile);
    if (!imageUrl) return;

    form.setValue("image", imageUrl);

    const response = await fetch("http://localhost:4000/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryName: values.categoryName,
        price: values.price,
        image: imageUrl,
        ingredients: values.ingredients,
        category: "676e370164d1f8cafda026ac",
      }),
    });

    const jsonData = await response.json();
    console.log("data", jsonData);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[496px] h-[594px] flex p-6 flex-col items-start gap-6 rounded-[12px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-4 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>categoryName</FormLabel>
                      <FormControl>
                        <Input placeholder="Type food name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter price...</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter price..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ingredients</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[400px] h-[86px] flex py-2 px-4 flex-col items-start p-2 flex-1 self-stretch  rounded-md border border-gray-300 bg-white shadow-sm"
                          placeholder="List ingredients..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>zurag</FormLabel>
                      <FormControl>
                        <Input {...rest} type="file" onChange={handleChange} />
                      </FormControl>
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt=""
                          className="w-32 h-32 mt-2"
                        />
                      )}
                      <FormMessage />
                      <Button type="submit">Илгээх</Button>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
