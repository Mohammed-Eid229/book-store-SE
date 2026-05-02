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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  img?: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const mockUsers: User[] = [
  { id: 1, firstName: 'Emily', lastName: 'Johnson', email: 'emily.johnson@x.dummyjson.com', phone: '+81 965-431-3024', age: '25', img: '' },
  { id: 2, firstName: 'Michael', lastName: 'Williams', email: 'michael.williams@x.dummyjson.com', phone: '+49 258-627-6644', age: '32', img: '' },
  { id: 3, firstName: 'Sophia', lastName: 'Brown', email: 'sophia.brown@x.dummyjson.com', phone: '+81 210-652-2785', age: '40', img: '' },
  { id: 4, firstName: 'James', lastName: 'Davis', email: 'james.davis@x.dummyjson.com', phone: '+49 614-958-9364', age: '45', img: '' },
  { id: 5, firstName: 'Emma', lastName: 'Miller', email: 'emma.miller@x.dummyjson.com', phone: '+91 759-776-1614', age: '28', img: '' },
  { id: 6, firstName: 'Olivia', lastName: 'Wilson', email: 'olivia.wilson@x.dummyjson.com', phone: '+91 607-295-6448', age: '22', img: '' },
  { id: 7, firstName: 'Alexander', lastName: 'Jones', email: 'alexander.jones@x.dummyjson.com', phone: '+61 260-824-4986', age: '38', img: '' },
];

// ─── Helper: get initials ────────────────────────────────────────────────────
const getInitials = (firstName: string, lastName: string) =>
  `${firstName[0]}${lastName[0]}`.toUpperCase();

// ─── Avatar color pool ───────────────────────────────────────────────────────
const avatarColors = ['#F5A623', '#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#e67e22'];

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Users List
      </Typography>

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
                  <TableCell
                    key={col}
                    sx={{ fontWeight: 700, color: '#2C3E50', fontSize: 13 }}
                  >
                    {col}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                hover
                sx={{ '&:last-child td': { border: 0 } }}
              >
                <TableCell sx={{ color: '#555', fontSize: 13 }}>{index + 1}</TableCell>

                {/* Avatar with initials */}
                <TableCell>
                  <Avatar
                    src={user.img}
                    sx={{
                      bgcolor: avatarColors[index % avatarColors.length],
                      width: 38,
                      height: 38,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {!user.img && getInitials(user.firstName, user.lastName)}
                  </Avatar>
                </TableCell>

                <TableCell sx={{ fontSize: 13 }}>{user.firstName}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{user.lastName}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{user.email}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{user.phone}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{user.age}</TableCell>

                {/* Actions */}
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        sx={{ color: '#e74c3c' }}
                        onClick={() => handleDelete(user.id)}
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
    </Box>
  );
}
