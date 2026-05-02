import { useState, useRef, useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, IconButton, Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCategories, type Category } from "../../../../../Contexts/CategoriesContext";

interface CategoryFormValues {
  name: string;
  image?: string;
}

function CategoryDialog({ 
  open, 
  onClose, 
  onSubmitAction, 
  initialData, 
  title 
}: { 
  open: boolean; 
  onClose: () => void; 
  onSubmitAction: (data: CategoryFormValues) => void; 
  initialData?: Category;
  title: string;
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      reset({ name: initialData?.name || "" });
      setPreview(initialData?.image || null);
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

  const onSubmit = (data: CategoryFormValues) => {
    onSubmitAction({ ...data, image: preview || "" });
    reset();
    setPreview(null);
    onClose();
  };

  const fieldSx = {
    "& label.Mui-focused": { color: "#ED553B" },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#ED553B" },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee" }}>
        <Typography fontWeight={700} fontSize={18}>{title}</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={4}>
          <TextField
            label="Category Name"
            placeholder="e.g. Science Fiction"
            fullWidth
            sx={fieldSx}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", { required: "Category name is required" })}
          />

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontWeight: 600 }}>
              Category Image
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
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit(onSubmit)}
          sx={{ bgcolor: "#ED553B", "&:hover": { bgcolor: "#ED553B" }, py: 1.5, fontWeight: 600, fontSize: 15 }}
        >
          {initialData ? 'UPDATE' : 'SAVE'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAdd = (data: CategoryFormValues) => {
    addCategory(data.name, "", data.image);
    toast.success("Category added successfully!");
  };

  const handleEdit = (data: CategoryFormValues) => {
    if (selectedCategory) {
      updateCategory(selectedCategory.id, data.name, "", data.image);
      toast.success("Category updated successfully!");
    }
  };

  const openEditDialog = (cat: Category) => {
    setSelectedCategory(cat);
    setEditOpen(true);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Categories</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
          sx={{ bgcolor: "#ED553B", "&:hover": { bgcolor: "#ED553B" }, borderRadius: 2, fontWeight: 600 }}
        >
          Add New Category
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: "1px solid #eee" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F4F6F8" }}>
              {["#", "Category Name", "Books Count", "Actions"].map((col) => (
                <TableCell key={col} sx={{ fontWeight: 700, color: "#2C3E50", fontSize: 13 }}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((cat, index) => (
              <TableRow key={cat.id} hover sx={{ "&:last-child td": { border: 0 } }}>
                <TableCell sx={{ fontSize: 13, color: "#555" }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: 13, fontWeight: 500, textTransform: "capitalize" }}>{cat.name}</TableCell>
                <TableCell sx={{ fontSize: 13, color: "#888" }}>{cat.booksCount} Books</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <IconButton size="small" sx={{ color: "#F5A623" }} onClick={() => openEditDialog(cat)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: "#e74c3c" }}
                      onClick={() => { deleteCategory(cat.id); toast.success("Category deleted!"); }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CategoryDialog 
        open={addOpen} 
        onClose={() => setAddOpen(false)} 
        onSubmitAction={handleAdd} 
        title="Add New Category" 
      />

      {selectedCategory && (
        <CategoryDialog
          key={selectedCategory.id}
          open={editOpen}
          onClose={() => { setEditOpen(false); setSelectedCategory(null); }}
          onSubmitAction={handleEdit}
          initialData={selectedCategory}
          title="Edit Category"
        />
      )}
    </Box>
  );
}
