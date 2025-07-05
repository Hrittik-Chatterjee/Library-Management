import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-[#FFDCDC] text-[#7f8c96] p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-center md:justify-start">
          <Link to="/" className="mb-4 md:mb-0">
            <img src="/logo.svg" alt="Logo" className="h-24 w-28" />
          </Link>
        </div>

        <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
          <Link
            to="/books"
            className="text-sm md:text-base font-bold hover:text-[#456882] transition-colors"
          >
            Books
          </Link>
          <Link
            to="/borrow-summery"
            className="text-sm md:text-base font-bold hover:text-[#456882] transition-colors"
          >
            Borrow Summery
          </Link>
          <Link
            to="/create-book"
            className="text-sm md:text-base font-bold hover:text-[#456882] transition-colors"
          >
            Add Book
          </Link>
        </div>
      </div>
    </nav>
  );
}
