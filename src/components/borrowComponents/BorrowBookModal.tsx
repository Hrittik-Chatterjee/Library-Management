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
import { format } from "date-fns";

import { BookOpen, CalendarIcon } from "lucide-react";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useBorrowBookMutation } from "@/components/redux/api/baseApi";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import type { IBorrow } from "@/types";
import { Calendar } from "../ui/calendar";

export function BorrowBookModal({
  bookId,
  picture,
  copies,
  title,
  isbn,
  author,
}: {
  bookId: string;
  picture: string;
  copies: number;
  title: string;
  isbn: string;
  author: string;
}) {
  const [open, setOpen] = useState(false);

  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const form = useForm<IBorrow>({
    defaultValues: {
      book: bookId,
      picture: picture,
      quantity: 1,
      dueDate: new Date(),
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let quantity = Number(data.quantity);
    if (isNaN(quantity) || quantity < 0) quantity = 0;

    try {
      await borrowBook({
        book: data.book,
        picture: data.picture,
        quantity,
        dueDate: data.dueDate,
      }).unwrap();

      console.log(data);
      setOpen(false);
      toast.success("Successfully borrowed book", {
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
      toast.error("Failed to borrow book", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {copies === 0 ? (
          <button
            disabled
            className="flex items-center gap-[2px] px-[4px] py-[2px] bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-[10px] font-medium"
          >
            Unavailable
          </button>
        ) : (
          <button className="flex items-center gap-[2px] px-[4px] py-[2px] bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300 transition-all text-[10px] font-medium">
            <BookOpen size={12} />
            Borrow
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#EAEBD0] text-black">
        <DialogHeader>
          <DialogTitle>Borrow The Book "{title}"</DialogTitle>
          <div className="text-sm text-black space-y-1 mb-4">
            <p>
              <span className="font-semibold ">Author:</span> {author}
            </p>
            <p>
              <span className="font-semibold ">ISBN:</span> {isbn}
            </p>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="quantity"
              rules={{
                required: "Quantity is required",
                min: { value: 1, message: "Must be at least 1" },
                validate: (value) =>
                  value <= copies || `Cannot exceed ${copies} available copies`,
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={1} />
                  </FormControl>
                  {fieldState.error && (
                    <span className="text-red-400 text-xs">
                      {fieldState.error.message}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal text-black",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a due Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-black text-white"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        className="text-black bg-[#EAEBD0]"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className=" bg-red-200 text-red-800 rounded-xl hover:bg-red-300 mt-5"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300 mt-5"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Borrow Book"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
