import book1 from '../../../../../assets/Images/book1.jpg';
import book2 from '../../../../../assets/Images/book2.webp';
import book3 from '../../../../../assets/Images/book3.webp';
import book4 from '../../../../../assets/Images/book4.webp';
import book5 from '../../../../../assets/Images/book5.png';
import book6 from '../../../../../assets/Images/book6.png';
import book7 from '../../../../../assets/Images/book7.png';
import book8 from '../../../../../assets/Images/book8.jpg';
import book9 from '../../../../../assets/Images/book9.webp';
import book10 from '../../../../../assets/Images/book10.jpg';
import book11 from '../../../../../assets/Images/book11.jpg';
import book12 from '../../../../../assets/Images/book12.webp';
import book13 from '../../../../../assets/Images/book13.jpg';
import book14 from '../../../../../assets/Images/book14.webp';
import book15 from '../../../../../assets/Images/book15.webp';
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from '../../../../Shared/Components/NotFound/NotFound.tsx';
import { Box, Container, Grid, Paper, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import BreadCrumbs from '../../../../Shared/Components/BreadCrumbs/BreadCrumbs.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const allBooks = [
    { id: 1,  title: "the design of books",                     category: "Drama",    author: "debbie berne",   price: 38.00, img: book1,  status: "in stock", quantity: 50 },
    { id: 2,  title: "the lost",                                category: "Fantasy",  author: "matt zhang",     price: 46.00, img: book2,  status: "in stock", quantity: 30 },
    { id: 3,  title: "The moon and the stars",                  category: "Drama",    author: "Jenna Warren",   price: 62.00, img: book3,  status: "in stock", quantity: 20 },
    { id: 4,  title: "the green solider",                       category: "Drama",    author: "J. Edward Gore", price: 50.00, img: book4,  status: "in stock", quantity: 15 },
    { id: 5,  title: "the hypocrite world",                     category: "Drama",    author: "sophia hill",    price: 35.00, img: book5,  status: "out of stock", quantity: 0 },
    { id: 6,  title: "my book cover",                          category: "Drama",    author: "author",         price: 41.00, img: book6,  status: "in stock", quantity: 10 },
    { id: 7,  title: "your simple book cover",                  category: "Fantasy",  author: "ken adams",      price: 55.00, img: book7,  status: "out of stock", quantity: 0 },
    { id: 8,  title: "book name",                              category: "Children", author: "author name",    price: 55.00, img: book8,  status: "in stock", quantity: 25 },
    { id: 9,  title: "harry potter and the champer of secrets", category: "Fantasy",  author: "J.K.Rowling",    price: 70.00, img: book9,  status: "in stock", quantity: 40 },
    { id: 10, title: "all the light we cannot see",             category: "Drama",    author: "Antony Doerr",   price: 55.00, img: book10, status: "in stock", quantity: 12 },
    { id: 11, title: "beyond the ocean door",                   category: "Drama",    author: "amisha sathi",   price: 55.00, img: book11, status: "in stock", quantity: 8 },
    { id: 12, title: "really good actually",                    category: "Drama",    author: "monica heisey",  price: 75.00, img: book12, status: "out of stock", quantity: 0 },
    { id: 13, title: "lady bird",                              category: "Children", author: "author name",    price: 40.00, img: book13, status: "in stock", quantity: 33 },
    { id: 14, title: "dark becomes her",                        category: "Fantasy",  author: "author name",    price: 67.00, img: book14, status: "in stock", quantity: 18 },
    { id: 15, title: "the story of a lonely boy",               category: "Drama",    author: "korina",         price: 58.50, img: book15, status: "in stock", quantity: 22 },
  ]

interface BookForm {
  title: string;
  author: string;
  category: string;
  price: string;
  quantity: string;
}

function BookEditDialog({ open, onClose, onSubmitAction, initialData }: { 
  open: boolean; 
  onClose: () => void; 
  onSubmitAction: (data: BookForm & { img: string }) => void; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookForm>();

  useEffect(() => {
    if (open) {
      reset({
        title: initialData?.title || "",
        author: initialData?.author || "",
        category: initialData?.category || "",
        price: initialData?.price?.toString() || "",
        quantity: initialData?.quantity?.toString() || "0",
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(initialData?.img || null);
    }
  }, [open, initialData, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = (data: BookForm) => {
    onSubmitAction({ ...data, img: preview || book1 });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee" }}>
        <Typography fontWeight={700} fontSize={18}>Edit Book</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3} mt={0}>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Title" fullWidth error={!!errors.title} helperText={errors.title?.message} {...register("title", { required: "Title is required" })} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Author" fullWidth {...register("author")} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Price" type="number" fullWidth {...register("price")} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Quantity" type="number" fullWidth {...register("quantity")} /></Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontWeight: 600 }}>
                Book Image
              </Typography>
              <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
              
              {!preview ? (
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<PhotoCameraIcon />} 
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ 
                    height: '56px', 
                    borderStyle: 'dashed', 
                    color: '#ED553B', 
                    borderColor: '#ED553B',
                    textTransform: 'none',
                    '&:hover': { borderStyle: 'dashed', bgcolor: 'rgba(237, 85, 59, 0.04)' }
                  }}
                >
                  Upload Image
                </Button>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                  <Box component="img" src={preview} sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 0.5 }} />
                  <Typography variant="body2" sx={{ flex: 1, color: '#666' }}>Image selected</Typography>
                  <IconButton size="small" onClick={() => fileInputRef.current?.click()} sx={{ color: '#F5A623' }}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={removeImage} sx={{ color: '#e74c3c' }}><DeleteIcon fontSize="small" /></IconButton>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button variant="contained" fullWidth onClick={handleSubmit(onSubmit)} sx={{ bgcolor: "#ED553B", "&:hover": { bgcolor: "#ED553B" }, py: 1.5, fontWeight: 600 }}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AdminBookDetails() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [editOpen, setEditOpen] = useState(false);
    
    // Use state to manage the book data so edits are reflected in the UI
    const [bookData, setBookData] = useState(() => 
      allBooks.find((b) => b.id === Number(bookId))
    );

  if(!bookData) return <NotFound/>

  const isOutOfStock = bookData.status.toLowerCase() === "out of stock";

  const onEditSubmit = (data: BookForm & { img: string }) => {
    // Update local state to reflect changes in the UI
    setBookData((prev) => ({
      ...prev!,
      title: data.title,
      author: data.author,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      img: data.img || book1,
      status: parseInt(data.quantity) > 0 ? "in stock" : "out of stock"
    }));
    
    toast.success("Book updated successfully!");
    setEditOpen(false);
  };

  return (
    <>
      <Box><BreadCrumbs /></Box>
      <Box py={3}>
        <Container>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/admin/books')}
            sx={{ mb: 4, color: '#393280', fontWeight: 600, textTransform: 'none' }}
          >
            Back to Books
          </Button>

          <Grid container spacing={6} alignItems="center">
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
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
                  src={bookData.img}
                  alt={bookData.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
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
                  {bookData.title}
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
                  mt={2}
                >
                  by {bookData.author}
                </Typography>

                <Typography variant="body2" color="#7A7A7A" my={2}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
                  feugiat amet, libero ipsum enim pharetra hac.
                </Typography>

                <Typography variant="h6" color="#ED553B" mt={3}>
                  $ {bookData.price.toFixed(2)}
                </Typography>

                <Typography variant="body1" color="#393280" mt={2} fontWeight="600">
                  Available Quantity: {bookData.quantity}
                </Typography>
              </Box>

              <Box mt={{ xs: 3, md: 10 }}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setEditOpen(true)}
                    sx={{
                      backgroundColor: "#ED553B",
                      color: "#FFF",
                      flex: 1,
                      py: 1.5,
                      border: 0,
                      borderRadius: 0,
                      textTransform: "uppercase",
                      fontWeight: "medium",
                      "&:hover": {
                        backgroundColor: "#d94a2f",
                      },
                    }}
                  >
                    Edit Book
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/books')}
                    sx={{
                      color: "#393280",
                      borderColor: "#393280",
                      flex: 1,
                      py: 1.5,
                      borderRadius: 0,
                      textTransform: "uppercase",
                      fontWeight: "medium",
                    }}
                  >
                    Back to List
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <BookEditDialog 
        open={editOpen} 
        onClose={() => setEditOpen(false)} 
        onSubmitAction={onEditSubmit} 
        initialData={bookData} 
      />
    </>
  )
}
