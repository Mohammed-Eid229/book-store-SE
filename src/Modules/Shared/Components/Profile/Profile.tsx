import { useState, useRef, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../Contexts/AuthContext';

// ─── Interfaces ─────────────────────────────────────────────────────────────
interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string | null;
  categoryName: string;
  image: string | null;
  price: number;
  quantity: number;
  status: string;
  date: string;
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
  userId: number;
  date: string;
  status: string;
  total: number;
  orderItems: OrderItem[];
}

interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  img: string;
  role: string;
}

// ─── Sub-Components ─────────────────────────────────────────────────────────

const OrderRow = ({ order }: { order: Order }) => (
  <TableRow key={order.id} hover sx={{ '&:last-child td': { border: 0 } }}>
    <TableCell sx={{ color: '#555' }}>
      <Stack spacing={0.5}>
        {order.orderItems.map((item) => (
          <Typography key={item.id} variant="body2" fontWeight={500}>
            • {item.book.title} (x{item.quantity})
          </Typography>
        ))}
      </Stack>
    </TableCell>
    <TableCell sx={{ color: '#777' }}>{order.date}</TableCell>
    <TableCell>
      <Chip 
        label={order.status} 
        size="small" 
        sx={{ 
          bgcolor: order.status === 'Delivered' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(241, 196, 15, 0.1)',
          color: order.status === 'Delivered' ? '#27ae60' : '#f39c12',
          fontWeight: 700,
          borderRadius: '6px'
        }} 
      />
    </TableCell>
    <TableCell align="right" sx={{ fontWeight: 700, color: '#393280' }}>
      {order.total.toFixed(2)} EGP
    </TableCell>
  </TableRow>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Grid size={{ xs: 12, md: 6 }}>
    <Box>
      <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500} sx={{ mt: 0.5 }}>
        {value}
      </Typography>
    </Box>
  </Grid>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Profile() {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const userData = authContext?.userData;

  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [resetPassOpen, setResetPassOpen] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isInsideAdmin = location.pathname.includes('/admin');
  const isCustomer = userData?.role?.toLowerCase() === 'customer' || 
                    userData?.role?.toLowerCase() === 'user' ||
                    location.pathname.includes('/dashboard/');

  useEffect(() => {
    const detectedRole = userData?.role || (isInsideAdmin ? 'Admin' : 'User');
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfileData({
      firstName: userData?.name?.split(' ')[0] || (isInsideAdmin ? 'Admin' : 'User'),
      lastName: userData?.name?.split(' ')[1] || (isInsideAdmin ? '' : 'Name'),
      email: userData?.email || (isInsideAdmin ? 'admin@bookstore.com' : 'user@example.com'),
      phone: '+20 100-123-4567',
      age: '30',
      img: '',
      role: detectedRole
    });

    if (isCustomer) {
      setOrders([
        {
          id: 6,
          userId: 1,
          date: '2026-04-30',
          status: 'pending',
          total: 1440.00,
          orderItems: [
            {
              id: 11,
              book: {
                id: 2,
                title: "The Long",
                author: "Steven",
                description: null,
                categoryName: "Action",
                image: null,
                price: 400.00,
                quantity: 82,
                status: "available",
                date: "2026-04-30"
              },
              quantity: 3,
              price: 400.00,
              subtotal: 1200.00
            }
          ]
        }
      ]);
    }
  }, [userData, isCustomer, isInsideAdmin]);

  const { register: profileReg, handleSubmit: handleProfileSubmit, reset: resetProfile } = useForm<ProfileFormValues>();
  const { register: passReg, handleSubmit: handlePassSubmit, reset: resetPass } = useForm<PasswordFormValues>();

  useEffect(() => {
    if (profileData) {
      resetProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfileImg(profileData.img || null);
    }
  }, [profileData, resetProfile]);

  const onProfileSave = async (data: ProfileFormValues) => {
    try {
      setProfileData(prev => prev ? { ...prev, ...data, img: profileImg || '' } : null);
      toast.success('Profile updated successfully!');
      setEditOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const onPasswordReset = async (data: PasswordFormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      toast.success('Password reset successfully!');
      resetPass();
      setResetPassOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getInitials = () => {
    if (!profileData?.firstName) return 'U';
    return `${profileData.firstName[0]}${profileData.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <Box sx={{ pb: 6 }}>
      {/* Banner */}
      <Box sx={{ height: '200px', background: 'linear-gradient(135deg, #393280 0%, #ED553B 100%)', borderRadius: '0 0 24px 24px' }} />

      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 1 }}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid #eee', mb: 4 }}>
          {/* Header */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems={{ xs: 'center', md: 'flex-end' }} sx={{ mb: 6 }}>
            <Box sx={{ position: 'relative', mt: -10 }}>
              <Avatar src={profileImg || ''} sx={{ width: 160, height: 160, bgcolor: '#ED553B', fontSize: 48, fontWeight: 700, border: '6px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                {!profileImg && getInitials()}
              </Avatar>
              <IconButton onClick={() => fileInputRef.current?.click()} sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: '#393280', color: '#fff', '&:hover': { bgcolor: '#2a2560' }, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: 40, height: 40 }}>
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
              <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
            </Box>

            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" fontWeight={700} color="#393280" gutterBottom>
                {profileData ? `${profileData.firstName} ${profileData.lastName}` : (userData?.name || 'User Name')}
              </Typography>
              <Chip label={profileData?.role?.toUpperCase() || userData?.role?.toUpperCase() || 'USER'} sx={{ bgcolor: '#393280', color: '#fff', fontWeight: 600 }} />
            </Box>

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<LockResetIcon />} onClick={() => setResetPassOpen(true)} sx={{ color: '#393280', borderColor: '#393280' }}>Change Password</Button>
              <Button variant="contained" startIcon={<EditIcon />} onClick={() => setEditOpen(true)} sx={{ bgcolor: '#ED553B' }}>Edit Profile</Button>
            </Stack>
          </Stack>

          {/* Info Section */}
          <Typography variant="h6" fontWeight={700} color="#393280" mb={3} borderBottom="2px solid #f0f0f0" pb={1}>Personal Information</Typography>
          <Grid container spacing={4}>
            <InfoItem label="Full Name" value={`${profileData?.firstName} ${profileData?.lastName}`} />
            <InfoItem label="Email Address" value={profileData?.email || ''} />
            <InfoItem label="Phone Number" value={profileData?.phone || ''} />
            <InfoItem label="Age" value={`${profileData?.age} Years`} />
          </Grid>
        </Paper>

        {/* Orders Section */}
        {isCustomer && (
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid #eee' }}>
            <Typography variant="h6" fontWeight={700} color="#393280" mb={3} borderBottom="2px solid #f0f0f0" pb={1}>Recent Orders</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F8F9FA' }}>
                    <TableCell sx={{ fontWeight: 700, color: '#393280' }}>Books</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#393280' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#393280' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#393280' }} align="right">Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => <OrderRow key={order.id} order={order} />)}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Container>

      {/* Dialogs */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid #eee', px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700}>Edit Profile Information</Typography>
          <IconButton onClick={() => setEditOpen(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, mt: 1 }}>
          <Stack spacing={3}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Avatar src={profileImg || ''} sx={{ width: 100, height: 100, mx: 'auto', bgcolor: '#ED553B' }}>{!profileImg && getInitials()}</Avatar>
              <Button size="small" onClick={() => fileInputRef.current?.click()} sx={{ mt: 1 }}>Change Photo</Button>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}><TextField label="First Name" fullWidth {...profileReg('firstName')} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField label="Last Name" fullWidth {...profileReg('lastName')} /></Grid>
            </Grid>
            <TextField label="Email Address" fullWidth {...profileReg('email')} />
            <TextField label="Phone Number" fullWidth {...profileReg('phone')} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleProfileSubmit(onProfileSave)} sx={{ bgcolor: '#393280' }}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resetPassOpen} onClose={() => setResetPassOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid #eee', px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700}>Reset Password</Typography>
          <IconButton onClick={() => setResetPassOpen(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, mt: 1 }}>
          <Stack spacing={3}>
            <TextField label="Old Password" type="password" fullWidth {...passReg('oldPassword')} />
            <TextField label="New Password" type="password" fullWidth {...passReg('newPassword')} />
            <TextField label="Confirm New Password" type="password" fullWidth {...passReg('confirmPassword')} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setResetPassOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handlePassSubmit(onPasswordReset)} sx={{ bgcolor: '#ED553B' }}>Update Password</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
