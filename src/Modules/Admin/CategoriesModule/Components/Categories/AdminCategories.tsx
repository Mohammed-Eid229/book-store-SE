import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CategoryIcon from '@mui/icons-material/Category';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCategories, type Category } from '../../../../../Contexts/CategoriesContext';

interface CategoryFormValues {
  name: string;
}

// ─── Category Card Colors ─────────────────────────────────────────────────────
const cardColors = [
  { bg: '#FEF8EE', border: '#F5A623', icon: '#F5A623' },
  { bg: '#EEF4FD', border: '#3498db', icon: '#3498db' },
  { bg: '#EEF9F2', border: '#2ecc71', icon: '#2ecc71' },
  { bg: '#F5EEF8', border: '#9b59b6', icon: '#9b59b6' },
  { bg: '#FDF0EE', border: '#e74c3c', icon: '#e74c3c' },
  { bg: '#EDFAF9', border: '#1abc9c', icon: '#1abc9c' },
];

// ─── Category Dialog ──────────────────────────────────────────────────────
function CategoryDialog({
  open,
  onClose,
  onSubmitAction,
  initialData,
  title,
}: {
  open: boolean;
  onClose: () => void;
  onSubmitAction: (data: CategoryFormValues) => void;
  initialData?: Category;
  title: string;
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormValues>({
    defaultValues: {
      name: initialData?.name || ''
    }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.image || null);

  useEffect(() => {
    if (open) {
      reset({ name: initialData?.name || '' });
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
    onSubmitAction(data);
    reset();
    setPreview(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <Typography fontWeight={700} fontSize={18}>{title}</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={4} mt={1}>
          <TextField
            label="Category Name"
            placeholder="Enter Category Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', { required: 'Category name is required' })}
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
                <IconButton size="small" onClick={() => fileInputRef.current?.click()} sx={{ color: '#ED553B' }}><EditIcon fontSize="small" /></IconButton>
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
          sx={{ 
            bgcolor: '#ED553B', 
            '&:hover': { bgcolor: '#d94a2f' }, 
            py: 1.5, 
            fontWeight: 700,
            textTransform: 'none',
            fontSize: 16
          }}
        >
          {initialData ? 'Update Category' : 'Create Category'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAdd = (data: CategoryFormValues) => {
    addCategory(data.name, ''); // Passing empty string for description
    toast.success('Category created successfully!');
    setAddOpen(false); // Close dialog explicitly
  };

  const handleEdit = (data: CategoryFormValues) => {
    if (selectedCategory) {
      updateCategory(selectedCategory.id, data.name, ''); // Passing empty string for description
      toast.success('Category updated successfully!');
      setEditOpen(false); // Close dialog explicitly
      setSelectedCategory(null);
    }
  };

  const openEditDialog = (cat: Category) => {
    setSelectedCategory(cat);
    setEditOpen(true);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Categories</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
          sx={{ bgcolor: '#F5A623', '&:hover': { bgcolor: '#e09610' }, borderRadius: 2, fontWeight: 600 }}
        >
          Add New Category
        </Button>
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={3}>
        {categories.map((cat, index) => {
          const color = cardColors[index % cardColors.length];
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cat.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${color.border}33`,
                  bgcolor: color.bg,
                  position: 'relative',
                  transition: '0.2s',
                  '&:hover': { boxShadow: 3, transform: 'translateY(-2px)' },
                }}
              >
                {/* Actions */}
                <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={() => openEditDialog(cat)}
                    sx={{
                      color: '#F5A623',
                      bgcolor: 'white',
                      boxShadow: 1,
                      '&:hover': { bgcolor: '#fef8ee' },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      deleteCategory(cat.id);
                      toast.success('Category deleted!');
                    }}
                    sx={{
                      color: '#e74c3c',
                      bgcolor: 'white',
                      boxShadow: 1,
                      '&:hover': { bgcolor: '#fdecea' },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: `${color.icon}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  {cat.image ? (
                    <Box component="img" src={cat.image} sx={{ width: '100%', height: '100%', borderRadius: 2, objectFit: 'cover' }} />
                  ) : (
                    <CategoryIcon sx={{ color: color.icon, fontSize: 28 }} />
                  )}
                </Box>

                {/* Name */}
                <Typography variant="subtitle1" fontWeight={700} color="#2C3E50" mb={0.5}>
                  {cat.name}
                </Typography>

                {/* Description */}
                {cat.description && (
                  <Typography variant="body2" color="text.secondary" fontSize={12}>
                    {cat.description}
                  </Typography>
                )}

                {/* Badge */}
                <Chip
                  label="Active"
                  size="small"
                  sx={{ mt: 2, bgcolor: `${color.icon}22`, color: color.icon, fontWeight: 600, fontSize: 11 }}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Add Dialog */}
      <CategoryDialog open={addOpen} onClose={() => setAddOpen(false)} onSubmitAction={handleAdd} title="Add New Category" />

      {/* Edit Dialog */}
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
