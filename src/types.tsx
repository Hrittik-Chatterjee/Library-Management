export interface IBooks {
  _id?: string;
  title: string;
  author: string;
  picture: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

export interface IBorrow {
  book: string;
  picture: string;
  quantity: number;
  dueDate: Date;
}

export interface BorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    picture: string;
    isbn: string;
  };
}

export interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowSummaryItem[];
}
