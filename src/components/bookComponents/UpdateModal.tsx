import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { DialogDescription } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useUpdateBookMutation } from "@/components/redux/api/baseApi";
import type { IBooks } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

interface UpdateModalProps {
  book: IBooks;
}

export function UpdateModal({ book }: UpdateModalProps) {
  const [open, setOpen] = useState(false);

  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const form = useForm({
    defaultValues: {
      title: book.title,
      author: book.author,
      picture: book.picture,
      genre: book.genre,
      isbn: book.isbn,
      description: book.description,
      copies: book.copies,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let copies = Number(data.copies);
    if (isNaN(copies) || copies < 0) copies = 0;

    const available = copies > 0;
    try {
      await updateBook({ id: book._id, ...data, copies, available }).unwrap();
      setOpen(false);
      toast("Updated Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      alert("Failed to update book");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center  gap-[2px] px-[4px] py-[2px] bg-yellow-200 text-yellow-800 rounded-xl hover:bg-yellow-300 transition-all text-[10px] font-medium"
        >
          <Pencil size={12} /> Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#EAEBD0] text-black">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <DialogDescription className="sr-only">
                    Add title here
                  </DialogDescription>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <DialogDescription className="sr-only">
                    Add author name here
                  </DialogDescription>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem>
                  <DialogDescription className="sr-only">
                    ADD book picture
                  </DialogDescription>
                  <FormLabel>Book image</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <DialogDescription className="sr-only">
                    add isbn number
                  </DialogDescription>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <DialogDescription className="sr-only">
                    Add description of the book
                  </DialogDescription>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="copies"
              rules={{
                required: true,
                min: 0,
                validate: (value) =>
                  Number(value) >= 0 || "Copies cannot be negative",
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <DialogDescription className="sr-only">
                    Add number of copies
                  </DialogDescription>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      value={field.value || ""}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <span className="text-red-400 text-xs">
                      {fieldState.error.message}
                    </span>
                  )}
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-red-200 text-red-800 rounded-xl hover:bg-red-300 mt-5"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="bg-yellow-200 text-yellow-800 rounded-xl hover:bg-yellow-300 mt-5"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
