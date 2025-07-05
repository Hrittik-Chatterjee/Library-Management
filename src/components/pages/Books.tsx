import type { IBooks } from "@/types";
import BookCard from "../bookComponents/BookCard";
import { useGetBooksQuery } from "../redux/api/baseApi";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { AddBookModal } from "../bookComponents/AddBookModal";

const Books = () => {
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const { data, isLoading } = useGetBooksQuery(filter);
  console.log(data);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold italic my-4 text-[#e77d7d]">
        Borrow your desired books
      </h1>
      <div className="flex justify-center">
        <AddBookModal />
      </div>
      <Tabs defaultValue="ALL">
        <div className="w-full overflow-x-auto">
          <TabsList className="flex w-max sm:w-full gap-2 bg-[#FFAAAA] p-2 rounded-xl my-4">
            <TabsTrigger
              className="data-[state=active]:bg-[#e77d7d] text-white px-4 py-1 rounded-lg whitespace-nowrap"
              value="ALL"
              onClick={() => setFilter(undefined)}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#e77d7d] text-white px-4 py-1 rounded-lg whitespace-nowrap"
              value="SCIENCE"
              onClick={() => setFilter("SCIENCE")}
            >
              SCIENCE
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#e77d7d] text-white px-4 py-1 rounded-lg whitespace-nowrap"
              value="FICTION"
              onClick={() => setFilter("FICTION")}
            >
              FICTION
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#e77d7d] text-white px-4 py-1 rounded-lg whitespace-nowrap"
              value="NON_FICTION"
              onClick={() => setFilter("NON_FICTION")}
            >
              NON FICTION
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#e77d7d] text-white px-4 py-1 rounded-lg whitespace-nowrap"
              value="BIOGRAPHY"
              onClick={() => setFilter("BIOGRAPHY")}
            >
              BIOGRAPHY
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#e77d7d] text-white px-4 py-1 rounded-lg whitespace-nowrap"
              value="FANTASY"
              onClick={() => setFilter("FANTASY")}
            >
              FANTASY
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#e77d7d] text-white px-4 py-1 rounded-lg whitespace-nowrap"
              value="HISTORY"
              onClick={() => setFilter("HISTORY")}
            >
              HISTORY
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {!isLoading &&
          data.data.map((book: IBooks) => (
            <BookCard key={book._id} book={book} />
          ))}
        <h1></h1>
      </div>
    </div>
  );
};

export default Books;
