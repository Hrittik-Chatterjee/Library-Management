import { useParams } from "react-router";
import { useGetBookByIdQuery } from "../redux/api/baseApi";
import { BorrowModal } from "../borrowComponents/borrowModal";

const SingleBookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookByIdQuery(id);

  if (isLoading) return <div className="justify-center mt-10">Loading...</div>;
  if (error || !book)
    return <div className="justify-center mt-10">Book not found </div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-10 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Book Image */}
        <div className="flex-shrink-0">
          <img
            src={book.data.picture}
            alt={book.data.title}
            className="w-64 h-96 object-cover rounded-xl"
          />
        </div>

        {/* Book Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book.data.title}
            </h1>
            <h2 className="text-lg text-gray-600 mb-4">
              by {book.data.author}
            </h2>

            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Genre:</strong> {book.data.genre}
              </p>
              <p>
                <strong>ISBN:</strong> {book.data.isbn}
              </p>
              <p>
                <strong>Description:</strong> {book.data.description}
              </p>
              <p>
                <strong>Copies:</strong> {book.data.copies}
              </p>
              <p>
                <strong>Available:</strong>{" "}
                <span
                  className={`font-semibold ${
                    book.data.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {book.data.available ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <BorrowModal
              bookId={book._id!}
              picture={book.picture}
              copies={book.copies}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookDetails;
