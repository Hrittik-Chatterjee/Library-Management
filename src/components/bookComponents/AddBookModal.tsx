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
import { BookPlus } from "lucide-react";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useAddBookMutation } from "@/components/redux/api/baseApi";
import { useState } from "react";
import { toast } from "react-toastify";

export function AddBookModal() {
  const [open, setOpen] = useState(false);

  const [addBook, { isLoading }] = useAddBookMutation();
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      picture: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let copies = Number(data.copies);
    if (isNaN(copies) || copies < 0) copies = 0;

    const available = copies > 0;
    try {
      await addBook({ ...data, copies, available }).unwrap();
      console.log(data);
      setOpen(false);
      toast("Book Added Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      form.reset();
    } catch (error) {
      toast("Failed to add book");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 bg-green-200 text-green-800 rounded-xl hover:bg-green-300 transition-all text-xs font-medium"
        >
          <BookPlus size={16} /> Add a New Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#EAEBD0] text-black">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <DialogDescription className="sr-only">
                    add a title
                  </DialogDescription>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Textarea {...field} />
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
                    <Input {...field} type="number" min={0} />
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
                className="bg-green-200 text-green-800 rounded-xl hover:bg-green-300 mt-5"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Add Book"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
