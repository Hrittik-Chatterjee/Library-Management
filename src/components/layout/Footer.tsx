import { Github } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#FFDCDC] text-[#1B3C53] py-4 shadow-inner mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0">
        <div className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Library Management
        </div>

        <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-2 md:space-y-0">
          <Link to="/books" className="text-sm hover:text-[#456882]">
            Books
          </Link>
          <Link to="/borrow-summery" className="text-sm hover:text-[#456882]">
            Borrow Summary
          </Link>
          <Link to="/create-book" className="text-sm hover:text-[#456882]">
            Add Book
          </Link>

          <a
            href="https://github.com/Hrittik-Chatterjee"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-[#456882]"
          >
            <Github size={18} />
            <span className="text-sm"> Developed by Hrittik Chatterjee</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
