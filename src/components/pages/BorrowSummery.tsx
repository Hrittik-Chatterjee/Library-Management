import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummeryQuery } from "../redux/api/baseApi";

export function BorrowSummery() {
  const { data, isLoading, isError } = useGetBorrowSummeryQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold italic my-4 text-[#e77d7d]">
        A summary list of borrowed books
      </h1>
      <div className="bg-[#EAEBD0]">
        <Table>
          <TableHeader>
            <TableRow className="bg-pink-200">
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item, index) => (
              <TableRow key={item.book.isbn || index}>
                <TableCell>
                  <img
                    src={item.book.picture}
                    alt={item.book.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{item.book.isbn}</TableCell>
                <TableCell>{item.book.title}</TableCell>
                <TableCell className="text-right">
                  {item.totalQuantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
