import { createBrowserRouter } from "react-router";
import App from "@/App";
import Books from "../pages/Books";
import SingleBookDetails from "../bookComponents/SingleBookDetails";
import { BorrowSummery } from "../pages/BorrowSummery";
import AddBook from "../pages/AddBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Books />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "books/:id",
        element: <SingleBookDetails />,
      },
      {
        path: "borrow-summery",
        element: <BorrowSummery />,
      },
      {
        path: "create-book",
        element: <AddBook />,
      },
    ],
  },
]);

export default router;
