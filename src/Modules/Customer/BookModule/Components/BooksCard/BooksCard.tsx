import { Box, Typography, Button, Stack, Paper, Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";

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

interface BooksCardProps {
  view: string;
  book: Book;
}

export default function BookCard({ book, view }: BooksCardProps) {
  const navigate = useNavigate();
  const isOutOfStock = book.status === "out of stock";
  const [isFav , setIsFav] = useState(false);

  const toggleFav = ()=>{
    setIsFav(!isFav);
  }
  return (
    <>
      <Box
        className="bookItem"
        sx={{
          display: "flex",
          flexDirection: view === "grid" ? "column" : "row", // Switch layout
          alignItems: view === "grid" ? "center" : "flex-start",
          gap: 2,
          p: view === "grid" ? 0 : 2,
          border: view === "grid" ? "none" : "1px solid #eee", // Optional border for list
          borderRadius: 1,
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            width: view === "grid" ? "100%" : { xs: "150px", md: "200px" }, // Smaller width in list
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              width: view === "grid" ? "80%" : "100%",
              aspectRatio: "2 / 3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: view === "grid" ? 2 : 1,
              overflow: "hidden",
              position: "relative",
              opacity: isOutOfStock ? 0.6 : 1,
            }}
          >
            <Box
              component="img"
              src={`/api/images/books/${book.image}`}
              alt={book.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/dashboard/books/${book.id}`)}
            />
            {isOutOfStock && (
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  backgroundColor: "#ED553B",
                  color: "#fff",
                  px: 1.5,
                  py: 0.5,
                  fontSize: "12px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  zIndex: 2,
                }}
              >
                Out of Stock
              </Box>
            )}
            <Box className="actionsBtn" textAlign='center'>
              <Button
                variant="contained"
                disabled={isOutOfStock}
                sx={{
                  backgroundColor: isOutOfStock ? "#ccc" : "#ED553B",
                  color: "#FFF",
                  width: "100%",
                  py: 1.5,
                  borderRadius: 0,
                  textTransform: "uppercase",
                  fontWeight: "medium",
                }}
              >
                {isOutOfStock ? "Unavailable" : "Add to cart"}
              </Button>
              <Tooltip title="Add to Wishlist">
              <IconButton
                size="small"
                sx={{
                  bgcolor: "#fff",
                  boxShadow: 2,
                  color: "#f52366",
                  "&:hover": { bgcolor: "#FFF", color: "#f52366" },
                  my:3
                }}
                onClick={toggleFav}
              >
                {isFav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            </Box>
          </Paper>
        </Box>

        {/* Text Content */}
        <Box sx={{ flex: 1, textAlign: view === "grid" ? "center" : "left" }}>
          <Stack
            direction="column"
            spacing={1}
            alignItems={view === "grid" ? "center" : "flex-start"}
            mt={view === "grid" ? 2 : 0}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="#393280"
              textTransform="capitalize"
              fontSize={{ xs: "16px", md: "24px" }}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/dashboard/books/${book.id}`)}
            >
              {book.title}
            </Typography>

            <Typography
              variant="caption"
              color="#888888"
              textTransform="capitalize"
            >
              {book.author}
            </Typography>

            {/* In List View, you might want to show a description */}
            {view === "list" && (
              <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                {book.description}
              </Typography>
            )}

            <Typography
              variant="button"
              color="#ED553B"
              sx={{ fontSize: "1.1rem" }}
            >
              ${book.price.toFixed(2)}
            </Typography>

            {view === "list" && (
              <Button
                variant="outlined"
                sx={{
                  mt: 1,
                  color: "#393280",
                  borderColor: "#393280",
                  "&:hover": { borderColor: "#ED553B", color: "#ED553B" },
                  fontSize: { xs: "12px", md: "16px" },
                }}
                onClick={() => navigate(`/dashboard/books/${book.id}`)}
              >
                View Details
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
}