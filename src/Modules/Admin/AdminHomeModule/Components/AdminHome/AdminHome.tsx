import {
  Box,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../../../Contexts/AuthContext';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

import { useFetch } from '../../../../../Hooks/useFetch';
import { GetAllUsers, GetAllOrders, GetStatistics, GetOrdersChartData } from '../../../../../Api/modules/admins';
import { GetBooks } from '../../../../../Api/modules/books';

export default function AdminHome() {
  const authContext = useContext(AuthContext);
  const userData = authContext?.userData;
  const adminName = userData?.firstName || userData?.name?.split(' ')[0] || "Admin";

  // ✅ جيب من الـ APIs الشغالة
  const { data: usersData, loading: usersLoading } = useFetch(GetAllUsers);
  const { data: ordersData, loading: ordersLoading } = useFetch(GetAllOrders);
  const { data: booksData, loading: booksLoading } = useFetch(GetBooks);

  // ✅ جرب تجيب الـ statistics العادية برضو (ممكن تشتغل لو الـ backend اتصلح)
  const { data: statsData } = useFetch(GetStatistics);
  const { data: chartData } = useFetch(GetOrdersChartData);

  // ✅ احسب الـ stats من الـ data الموجودة لو الـ /admin/statistics فاشل
  const usersList = Array.isArray(usersData) ? usersData : (usersData as any)?.data || [];
  const ordersList = Array.isArray(ordersData) ? ordersData : (ordersData as any)?.data || [];
  const booksList = Array.isArray(booksData) ? booksData : (booksData as any)?.data || [];

  const totalUsers = statsData?.totalUsers ?? statsData?.usersCount ?? usersList.filter((u: any) => {
    const role = u.role?.toLowerCase();
    return !role || role === 'user' || role === 'customer';
  }).length;

  const totalAdmins = statsData?.totalAdmins ?? statsData?.adminsCount ?? usersList.filter((u: any) => {
    const role = u.role?.toLowerCase();
    return role === 'admin' || role === 'administrator';
  }).length;

  const totalBooks = statsData?.totalBooks ?? statsData?.booksCount ?? booksList.length;
  const totalOrders = statsData?.totalOrders ?? statsData?.ordersCount ?? ordersList.length;

  const isLoading = usersLoading || ordersLoading || booksLoading;

  // ✅ بيانات الـ Pie Chart — من الـ orders chart API أو من الـ orders الموجودة
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const pieData: { name: string; value: number }[] = (() => {
    if (Array.isArray(chartData) && chartData.length > 0) {
      return chartData.map((item: any, i: number) => ({
        name: item.name || item.day || days[i] || `Day ${i + 1}`,
        value: item.value || item.count || item.orders || 0,
      }));
    }
    // احسب من الـ orders الموجودة حسب اليوم
    const dayCounts: Record<string, number> = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    ordersList.forEach((order: any) => {
      if (order.date) {
        const d = new Date(order.date);
        const dayName = days[d.getDay() === 0 ? 6 : d.getDay() - 1];
        dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
      }
    });
    return days.map(d => ({ name: d, value: dayCounts[d] }));
  })();

  // ✅ Bar chart بدل Line chart للـ orders per day (أوضح)
  const barData = pieData.map(d => ({ day: d.name, orders: d.value }));

  const PIE_COLORS = ['#2ecc71', '#e74c3c', '#F5A623', '#3498db', '#9b59b6', '#6a2784', '#34495e'];

  const statsCards = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: <PeopleIcon sx={{ fontSize: 36, color: '#e74c3c' }} />,
      bg: '#FDF0EE',
    },
    {
      label: 'Total Admins',
      value: totalAdmins,
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 36, color: '#F5A623' }} />,
      bg: '#FEF8EE',
    },
    {
      label: 'Total Books',
      value: totalBooks,
      icon: <MenuBookIcon sx={{ fontSize: 36, color: '#3498db' }} />,
      bg: '#EEF4FD',
    },
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: <ShoppingCartIcon sx={{ fontSize: 36, color: '#2ecc71' }} />,
      bg: '#EEF9F2',
    },
  ];

  if (isLoading) {
    return <Typography sx={{ p: 3 }}>Loading statistics...</Typography>;
  }

  const hasPieData = pieData.some(d => d.value > 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Greeting */}
      <Typography variant="h5" fontWeight={700} mb={3} sx={{ fontStyle: 'italic' }}>
        Hello,{' '}
        <Typography component="span" color="#F5A623" fontStyle="italic" fontSize="inherit" fontWeight="inherit">
          {adminName}!
        </Typography>
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3} mb={4}>
        {statsCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: card.bg,
                borderRadius: 3,
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              {card.icon}
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Pie Chart — Orders Last 7 Days */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #eee' }}>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>
              Orders Last 7 Days
            </Typography>
            {hasPieData ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                <Typography variant="body2">No orders data available yet</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Bar Chart — Orders per Day */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #eee' }}>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>
              Orders Per Day
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#ED553B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
