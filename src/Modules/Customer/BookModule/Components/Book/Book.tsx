import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

interface BookProps {
  book: {
    id: number;
    title: string;
    category: string;
    author: string;
    price: number;
    img: string;
    status: string;
    quantity?: number;
  };
  mode?: "featured" | "details";
}

export default function Book({ book, mode = "featured" }: BookProps) {
  const navigate = useNavigate();
  const isOutOfStock = book.status.toLowerCase() === "out of stock";
  return (
    <>
      <Grid container spacing={6} alignItems="center">
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
          py={2}
        >
          <Paper
  elevation={6}
  sx={{
    width: 400,
    height: 600,
    overflow: "hidden",
    borderRadius: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 2,
    position: "relative",
    opacity: isOutOfStock ? 0.6 : 1,
  }}
>
            <Box
              component="img"
              src={book.img}
              alt={book.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              textAlign="center"
            />
            {isOutOfStock && (
  <Box
    sx={{
      position: "absolute",
      top: 16,
      left: 16,
      backgroundColor: "#ED553B",
      color: "#fff",
      px: 2,
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
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box textTransform="capitalize">
            <Typography variant="h3" color="#393280" fontWeight="600" mb={5}>
              {mode == 'featured'? "featured Book" : book.title}
            </Typography>

            <Box
              sx={{
                backgroundColor: "#ED553B",
                width: "100px",
                height: "2px",
                mt: 2,
              }}
            />

            <Typography
              variant="overline"
              color="#888888"
              display="block"
              mb={2}
            >
              by {book.author}
            </Typography>
            <Typography variant="h5" color="#393280" fontWeight="600">
              {mode == 'featured'? book.title : ""}
            </Typography>

            <Typography variant="body2" color="#7A7A7A" my={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac.
            </Typography>

            <Typography variant="h6" color="#ED553B" mt={3}>
              $ {book.price.toFixed(2)}
            </Typography>

            {mode === "details" && book.quantity !== undefined && (
              <Typography variant="body2" color="#7A7A7A" mt={1}>
                Available Quantity: {book.quantity}
              </Typography>
            )}
          </Box>

          <Box mt={{ xs: 3, md: 10 }}>
            {mode === "featured" && (
              <Button
                variant="outlined"
                sx={{
                  color: "#393280",
                  borderColor: "#393280",
                  px: 3,
                  py: 1.5,
                }}
                endIcon={<ArrowForwardIcon />}
                onClick={()=>navigate(`/dashboard/books/${book.id}`)}
              >
                View More
              </Button>
            )}

            {mode === "details" && (
  <Button
    variant="outlined"
    disabled={isOutOfStock}
    sx={{
      backgroundColor: isOutOfStock ? "#ccc" : "#ED553B",
      color: "#FFF",
      width: "100%",
      py: 1.5,
      border: 0,
      borderRadius: 0,
      textTransform: "uppercase",
      fontWeight: "medium",
      "&:hover": {
        backgroundColor: isOutOfStock ? "#ccc" : "#d94a2f",
      },
    }}
  >
    {isOutOfStock ? "Unavailable" : "Add To Cart"}
  </Button>
)}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
