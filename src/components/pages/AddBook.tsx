import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { useAddBookMutation } from "../redux/api/baseApi";
import { toast } from "react-toastify";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const AddBook = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();

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
      toast.success("Book Added Successfully", {
        position: "top-center",
        autoClose: 1000,
      });
      form.reset();

      navigate("/books");
    } catch (error) {
      toast.error("Failed to add book", {
        position: "top-center",
        autoClose: 1000,
      });
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
      >
        <h1 className="text-center text-2xl font-bold italic my-4 text-[#e77d7d]">
          Add a New Book
        </h1>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Book title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "FICTION",
                    "NON_FICTION",
                    "SCIENCE",
                    "HISTORY",
                    "BIOGRAPHY",
                    "FANTASY",
                  ].map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre.replace("_", " ")}
                    </SelectItem>
                  ))}
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
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 978-3-16-148410-0" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Write a short description..."
                  {...field}
                />
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
              <FormLabel>Copies</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} />
              </FormControl>
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-pink-200 text-pink-800 rounded-xl hover:bg-pink-300 text:white"
        >
          {isLoading ? "Saving..." : "Add Book"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddBook;
