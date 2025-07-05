import type { IBooks } from "@/types";
import { Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { useDeleteBookMutation } from "@/components/redux/api/baseApi";
import { UpdateModal } from "./UpdateModal";
import { toast } from "react-toastify";
import { BorrowBookModal } from "../borrowComponents/BorrowBookModal";

const BookCard = ({ book }: { book: IBooks }) => {
  const navigate = useNavigate();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(book._id).unwrap();
        toast.success("Book deleted successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      } catch (error) {
        toast.error("Failed to delete book.", {
          position: "top-center",
          autoClose: 3000,
        });
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row bg-[#EAEBD0] shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 w-full">
      <img
        src={book.picture}
        alt={book.title}
        className="w-full sm:w-32 h-40 sm:h-auto object-cover sm:rounded-l-2xl rounded-t-2xl sm:rounded-t-none"
      />
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
          <p className="text-xs text-gray-600">by {book.author}</p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
            {book.genre}
          </span>
          <p className="text-xs text-gray-700 mt-2 line-clamp-2">
            {book.description}
          </p>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>ISBN: {book.isbn}</span>
          <span>{book.available ? "Available" : "Not Available"}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>
            Available Copies:{" "}
            <span className="text-blue-500"> {book.copies ?? "-"}</span>
          </span>
        </div>
        <div className="flex gap-2 justify-end mt-3">
          <button
            onClick={() => navigate(`/books/${book._id}`)}
            className="flex items-center gap-[2px] px-[4px] py-[2px] bg-green-200 text-green-800 rounded-lg hover:bg-green-300 transition-all text-[10px] font-medium"
          >
            <Eye size={12} /> Details
          </button>

          <BorrowBookModal
            bookId={book._id!}
            picture={book.picture}
            copies={book.copies}
            title={book.title}
            author={book.author}
            isbn={book.isbn}
          />

          <UpdateModal book={book} />
          <button
            className="flex items-center gap-[2px] px-[4px] py-[2px] bg-red-200 text-red-800 rounded-xl hover:bg-red-300 transition-all text-[10px] font-medium"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
