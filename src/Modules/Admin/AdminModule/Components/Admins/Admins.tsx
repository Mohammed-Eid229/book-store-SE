import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdminForm, { type AdminFormValues } from '../AddAdmin/AddAdmin';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  img?: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const mockAdmins: Admin[] = [
  { id: 1, firstName: 'Ahmed', lastName: 'Hassan', email: 'ahmed.hassan@bookstore.com', phone: '+20 100-123-4567', age: '35', img: '' },
  { id: 2, firstName: 'Sara', lastName: 'Ali', email: 'sara.ali@bookstore.com', phone: '+20 101-234-5678', age: '32', img: '' },
  { id: 3, firstName: 'Mohamed', lastName: 'Ibrahim', email: 'mohamed.ibrahim@bookstore.com', phone: '+20 102-345-6789', age: '40', img: '' },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
const getInitials = (first: string, last: string) =>
  `${first[0]}${last[0]}`.toUpperCase();

const avatarColors = ['#F5A623', '#3498db', '#2ecc71', '#9b59b6', '#e74c3c'];

export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = (data: AdminFormValues) => {
    setAdmins((prev) => [
      ...prev,
      { ...data, id: prev.length + 1 },
    ]);
  };

  const handleDelete = (id: number) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Admins List
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            bgcolor: '#ED553B',
            '&:hover': { bgcolor: '#ED553B' },
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Add New Admin
        </Button>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: 3, border: '1px solid #eee' }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F4F6F8' }}>
              {['#', 'Avatar', 'First Name', 'Last Name', 'Email', 'Phone', 'Age', 'Actions'].map(
                (col) => (
                  <TableCell key={col} sx={{ fontWeight: 700, color: '#2C3E50', fontSize: 13 }}>
                    {col}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {admins.map((admin, index) => (
              <TableRow key={admin.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                <TableCell sx={{ fontSize: 13 }}>{index + 1}</TableCell>

                <TableCell>
                  <Avatar
                    src={admin.img}
                    sx={{
                      bgcolor: avatarColors[index % avatarColors.length],
                      width: 38,
                      height: 38,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {!admin.img && getInitials(admin.firstName, admin.lastName)}
                  </Avatar>
                </TableCell>

                <TableCell sx={{ fontSize: 13 }}>{admin.firstName}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{admin.lastName}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{admin.email}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{admin.phone}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{admin.age}</TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        sx={{ color: '#ED553B' }}
                        onClick={() => handleDelete(admin.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Admin Dialog */}
      <AdminForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmitAction={handleAdd}
        title="Add New Admin"
      />
    </Box>
  );
}
