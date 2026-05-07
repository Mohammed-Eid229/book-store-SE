import { Grid } from "@mui/material";
import BookCard from "../BooksCard/BooksCard";

interface Book {
  id: number;
  title: string;
  category: string;
  author: string;
  price: number;
  image: string;
  status: string;
  description: string;
}

interface BooksProps {
  view: string;
  currentBooks: Book[];
}

export default function BooksList({ currentBooks, view }:BooksProps) {
  return (
    <Grid container spacing={3}>
      {currentBooks.map((book) => (
        <Grid
          key={book.id}
          size={view === "grid" ? { xs: 12, sm: 6, md: 4 } : 12}
        >
          <BookCard book={book} view={view} />
        </Grid>
      ))}
    </Grid>
  );
}