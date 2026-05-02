import { useState, useRef, useEffect } from "react";
import { Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";

import { useBooks } from "../../../../../Hooks/useBooks";
import { useFilters } from "../../../../../Hooks/useFilters";
import AdminBooksList from "../AdminBooksList/AdminBooksList";
import BooksToolbar from "../../../../Customer/BookModule/Components/BooksToolbar/BooksToolbar";
import BooksPagination from "../../../../Customer/BookModule/Components/BooksPagination/BooksPagination";
import BreadCrumbs from "../../../../Shared/Components/BreadCrumbs/BreadCrumbs";
import BooksFilter from "../../../../Customer/BookModule/Components/BooksFilter/BooksFilter";

import book1 from "../../../../../assets/Images/book1.jpg";
import book2 from "../../../../../assets/Images/book2.webp";
import book3 from "../../../../../assets/Images/book3.webp";
import book4 from "../../../../../assets/Images/book4.webp";
import book5 from "../../../../../assets/Images/book5.png";
import book6 from "../../../../../assets/Images/book6.png";
import book7 from "../../../../../assets/Images/book7.png";
import book8 from "../../../../../assets/Images/book8.jpg";
import book9 from "../../../../../assets/Images/book9.webp";
import book10 from "../../../../../assets/Images/book10.jpg";
import book11 from "../../../../../assets/Images/book11.jpg";
import book12 from "../../../../../assets/Images/book12.webp";
import book13 from "../../../../../assets/Images/book13.jpg";
import book14 from "../../../../../assets/Images/book14.webp";
import book15 from "../../../../../assets/Images/book15.webp";
import { useCategories } from "../../../../../Contexts/CategoriesContext";

export interface Book {
  id: number;
  title: string;
  category: string;
  author: string;
  price: number;
  img: string;
  status: string;
  quantity: number;
}

interface BookForm {
  title: string;
  author: string;
  category: string;
  price: string;
  status: string;
  quantity: string;
}

const initialBooks: Book[] = [
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
];

function BookDialog({ open, onClose, onSubmitAction, initialData, title }: { 
  open: boolean; 
  onClose: () => void; 
  onSubmitAction: (data: BookForm & { img: string }) => void; 
  initialData?: Partial<Book>;
  title: string;
}) {
  const { categories } = useCategories();                         
  const categoryOptions = categories.map((c) => c.name);         
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.img || null);
  
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<BookForm>({
    defaultValues: {
      title: initialData?.title || "",
      author: initialData?.author || "",
      category: initialData?.category || "",
      price: initialData?.price?.toString() || "",
      status: initialData?.status || "in stock",
      quantity: initialData?.quantity?.toString() || "0",
    }
  }); 

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(initialData?.img || null);
    }
  }, [open, initialData]);

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
    reset(); 
    setPreview(null);
    onClose(); 
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee" }}>
        <Typography fontWeight={700} fontSize={18}>{title}</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3} mt={0}>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Title" placeholder="Enter Book Title" fullWidth error={!!errors.title} helperText={errors.title?.message} {...register("title", { required: "Title is required" })} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Author" placeholder="Enter Author Name" fullWidth {...register("author")} /></Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field: { onChange, value } }: { field: { onChange: (value: string) => void; value: string } }) => (
                <Autocomplete
                  options={categoryOptions}
                  value={value || null}
                  onChange={(_, newValue) => onChange(newValue ?? "")}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" placeholder="Search or select"
                      error={!!errors.category} helperText={errors.category?.message} />
                  )}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}><TextField label="Price" placeholder="Enter Price" type="number" fullWidth {...register("price")} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Quantity" placeholder="Enter Quantity" type="number" fullWidth {...register("quantity")} /></Grid>
          
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
        <Button variant="contained" fullWidth onClick={handleSubmit(onSubmit)} sx={{ bgcolor: "#ED553B", "&:hover": { bgcolor: "#ED553B" }, py: 1.5, fontWeight: 600 }}>Save</Button>
      </DialogActions>
    </Dialog>
  );

}

export default function AdminBooks() {
  const [allBooksData, setAllBooksData] = useState<Book[]>(initialBooks);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleAdd = (data: BookForm & { img: string }) => {
    setAllBooksData((prev) => [...prev, { 
      id: prev.length + 1, 
      title: data.title, 
      author: data.author || "Unknown", 
      category: data.category || "Drama", 
      price: parseFloat(data.price) || 0, 
      quantity: parseInt(data.quantity) || 0,
      img: data.img || book1, 
      status: parseInt(data.quantity) > 0 ? "in stock" : "out of stock" 
    }]);
    toast.success("Book added successfully!");
  };

  const handleEdit = (data: BookForm & { img: string }) => {
    if (!selectedBook) return;
    setAllBooksData((prev) => prev.map((b) => b.id === selectedBook.id ? {
      ...b,
      title: data.title,
      author: data.author || "Unknown",
      category: data.category || "Drama",
      price: parseFloat(data.price) || 0,
      quantity: parseInt(data.quantity) || 0,
      img: data.img || book1,
      status: parseInt(data.quantity) > 0 ? "in stock" : "out of stock"
    } : b));
    toast.success("Book updated successfully!");
  };

  const handleDelete = (id: number) => {
    setAllBooksData((prev) => prev.filter((b) => b.id !== id));
    toast.success("Book deleted!");
  };

  const openEditDialog = (book: Book) => {
    setSelectedBook(book);
    setEditOpen(true);
  };

  const { filters, setPrice, toggleFilter, filteredBooks, applyFilters } = useFilters(allBooksData);
  const books = useBooks(filteredBooks as Book[]);

  return (
    <>
      <Box><BreadCrumbs /></Box>
      <Box p={3}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}
            sx={{ bgcolor: "#ED553B", "&:hover": { bgcolor: "#ED553B" }, borderRadius: 2, fontWeight: 600, px: 3 }}>
            Add New Book
          </Button>
        </Box>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <BooksFilter filters={filters} setPrice={setPrice} toggleFilter={toggleFilter} applyFilters={applyFilters} />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <BooksToolbar {...books} />
            <AdminBooksList {...{...books, currentBooks: books.currentBooks as Book[]}} onDelete={handleDelete} onEdit={openEditDialog} />
            <BooksPagination {...books} />
          </Grid>
        </Grid>
      </Box>
      <BookDialog open={addOpen} onClose={() => setAddOpen(false)} onSubmitAction={handleAdd} title="Add New Book" />
      {selectedBook && (
        <BookDialog 
          key={selectedBook.id}
          open={editOpen} 
          onClose={() => { setEditOpen(false); setSelectedBook(null); }} 
          onSubmitAction={handleEdit} 
          initialData={selectedBook} 
          title="Edit Book" 
        />
      )}
    </>
  );
}