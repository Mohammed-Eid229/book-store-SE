import {
  Box,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
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
} from 'recharts';

// ─── Stat Cards Data ────────────────────────────────────────────────────────
const statsCards = [
  {
    label: 'Total Users',
    value: '1.5K',
    icon: <PeopleIcon sx={{ fontSize: 36, color: '#e74c3c' }} />,
    bg: '#FDF0EE',
  },
  {
    label: 'Total Admins',
    value: '12',
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 36, color: '#F5A623' }} />,
    bg: '#FEF8EE',
  },
  {
    label: 'Total Books',
    value: '320',
    icon: <MenuBookIcon sx={{ fontSize: 36, color: '#3498db' }} />,
    bg: '#EEF4FD',
  },
  {
    label: 'Total Orders',
    value: '870',
    icon: <ShoppingCartIcon sx={{ fontSize: 36, color: '#2ecc71' }} />,
    bg: '#EEF9F2',
  },
];

// ─── Pie Chart Data (Orders last 7 days) ────────────────────────────────────
const pieData = [
  { name: 'Mon', value: 26 },
  { name: 'Tue', value: 17 },
  { name: 'Wed', value: 12 },
  { name: 'Thu', value: 14 },
  { name: 'Fri', value: 31 },
  { name: 'Sat', value: 12 },
  { name: 'Sun', value: 50 },
];

const PIE_COLORS = ['#2ecc71', '#e74c3c', '#F5A623', '#3498db', '#9b59b6' ,'#6a2784', '#34495e'];

// ─── Line Chart Data (Last Visits) ──────────────────────────────────────────
const lineData = [
  { day: 'Mon', visits: 42 },
  { day: 'Tue', visits: 65 },
  { day: 'Wed', visits: 30 },
  { day: 'Thu', visits: 90 },
  { day: 'Fri', visits: 55 },
  { day: 'Sat', visits: 75 },
  { day: 'Sun', visits: 50 },
];

export default function AdminHome() {
  return (
    <Box>
      {/* Greeting */}
      <Typography variant="h5" fontWeight={700} mb={3} sx={{ fontStyle: 'italic' }}>
        Hello, <Typography component="span" color="#F5A623" fontStyle="italic" fontSize="inherit" fontWeight="inherit">Admin!</Typography>
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
        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #eee' }}>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>
              Orders Last 7 Days
            </Typography>
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
          </Paper>
        </Grid>

        {/* Line Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #eee' }}>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>
              Last Visits
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#F5A623"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#F5A623' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
