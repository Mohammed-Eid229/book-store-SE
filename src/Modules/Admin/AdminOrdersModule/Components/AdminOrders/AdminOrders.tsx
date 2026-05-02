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
  Stack,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';

// ─── Interfaces ─────────────────────────────────────────────────────────────
interface Book {
  id: number;
  title: string;
  price: number;
}

interface OrderItem {
  id: number;
  book: Book;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  id: number;
  userName: string;
  userEmail: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
  total: number;
  orderItems: OrderItem[];
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const mockAdminOrders: Order[] = [
  {
    id: 1,
    userName: 'Emily Johnson',
    userEmail: 'emily@example.com',
    date: '2026-04-30',
    status: 'pending',
    total: 1440.00,
    orderItems: [
      {
        id: 11,
        book: { id: 2, title: "The Long", price: 400.00 },
        quantity: 3,
        price: 400.00,
        subtotal: 1200.00
      }
    ]
  },
  {
    id: 2,
    userName: 'Ahmed Hassan',
    userEmail: 'ahmed@example.com',
    date: '2026-05-01',
    status: 'shipped',
    total: 850.50,
    orderItems: [
      {
        id: 12,
        book: { id: 5, title: "Design of Books", price: 38.00 },
        quantity: 2,
        price: 38.00,
        subtotal: 76.00
      }
    ]
  }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(mockAdminOrders);

  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order #${orderId} status updated to ${newStatus}`);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return { bg: 'rgba(241, 196, 15, 0.1)', color: '#f39c12' };
      case 'shipped': return { bg: 'rgba(52, 152, 219, 0.1)', color: '#3498db' };
      case 'delivered': return { bg: 'rgba(46, 204, 113, 0.1)', color: '#27ae60' };
      case 'canceled': return { bg: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' };
      default: return { bg: '#eee', color: '#777' };
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Orders Management
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #eee' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F4F6F8' }}>
              {/* <TableCell sx={{ fontWeight: 700, color: '#2C3E50' }}>#ID</TableCell> */}
              <TableCell sx={{ fontWeight: 700, color: '#2C3E50' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#2C3E50' }}>Books</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#2C3E50' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#2C3E50' }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#2C3E50' }}>Status</TableCell>
              {/* <TableCell sx={{ fontWeight: 700, color: '#2C3E50' }}>Actions</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                {/* <TableCell sx={{ fontWeight: 600 }}>ORD-00{order.id}</TableCell> */}
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{order.userName}</Typography>
                    <Typography variant="caption" color="text.secondary">{order.userEmail}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    {order.orderItems.map((item) => (
                      <Typography key={item.id} variant="caption" fontWeight={500}>
                        • {item.book.title} (x{item.quantity})
                      </Typography>
                    ))}
                  </Stack>
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: '#777' }}>{order.date}</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#393280' }}>
                  {order.total.toFixed(2)} EGP
                </TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      sx={{
                        height: 32,
                        fontSize: 12,
                        fontWeight: 700,
                        bgcolor: getStatusColor(order.status).bg,
                        color: getStatusColor(order.status).color,
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '& .MuiSelect-icon': { color: getStatusColor(order.status).color }
                      }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="canceled">Canceled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                {/* <TableCell>
                  <Tooltip title="View Details">
                    <IconButton size="small" color="primary">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
