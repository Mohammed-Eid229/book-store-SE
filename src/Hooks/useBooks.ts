import { useEffect, useState } from "react";
import { useSort } from "./useSort";
import { usePagination } from "./usePagination";

interface Book {
  id: number;
  title: string;
  category: string;
  author: string;
  price: number;
  img: string;
  status: string;
}

type SortOption =
  | "price-low"
  | "price-high"
  | "alpha-asc"
  | "alpha-desc"
  | "oldest"
  | "newest";

interface BooksSettings {
  view: "grid" | "list";
  sortBy: SortOption;
  itemsPerPage: number;
}
interface UseBooksReturn {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;

  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;

  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;

  page: number;
  setPage: (value: number) => void;

  currentBooks: Book[];
  total: number;
  pageCount: number;
  startIndex: number;
}

  const getInitialSettings = (): BooksSettings => {
  const saved = localStorage.getItem("booksSettings");

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback if corrupted
    }
  }

  return {
    view: "grid",
    sortBy: "newest",
    itemsPerPage: 12,
  };
};

export function useBooks(allBooks: Book[]): UseBooksReturn {

  const initial = getInitialSettings();
  const [view, setView] = useState<"grid" | "list">(initial.view);
  const [sortBy, setSortBy] = useState<SortOption>(initial.sortBy);
  const [itemsPerPage, setItemsPerPage] = useState(initial.itemsPerPage);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const settings: BooksSettings = {view,sortBy,itemsPerPage,};
    localStorage.setItem("booksSettings", JSON.stringify(settings));
  }, [view, sortBy, itemsPerPage]);
  //  Sorting
  const sortedBooks = useSort(allBooks, sortBy);

  //  Pagination
  const { currentBooks, total, pageCount, startIndex } =
    usePagination(sortedBooks, itemsPerPage, page);

  return {
    view,
    setView,

    sortBy,
    setSortBy,

    itemsPerPage,
    setItemsPerPage,

    page,
    setPage,

    currentBooks,
    total,
    pageCount,
    startIndex,
  };
}