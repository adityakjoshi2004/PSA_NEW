import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import avatar from 'assets/images/users/avatar-group.png';

export default function NavCard() {
  const theme = useTheme(); // ✅ Get the current theme

  return (
    <MainCard
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'grey.50',
        color: theme.palette.text.primary, // ✅ Ensures text is readable in dark mode
        m: 3,
        p: 2,
        boxShadow: theme.palette.mode === 'dark' ? 3 : 1, // Slight shadow change in dark mode
      }}
    >
      <Stack alignItems="center" spacing={2.5}>
        <CardMedia component="img" image={avatar} sx={{ width: 112 }} />
        <Stack alignItems="center">
          <Typography variant="h5" sx={{ color: theme.palette.primary.main }}> {/* ✅ Blue Theme Support */}
            PSA
          </Typography>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Learn more about this app
          </Typography>
        </Stack>
        <AnimateButton>
          <Button
            component={Link}
            target="_blank"
            href="https://personalstock.mystrikingly.com"
            variant="contained"
            size="small"
            sx={{
              bgcolor: theme.palette.success.main, // ✅ Theme-aware success color
              color: theme.palette.success.contrastText, // ✅ Ensures button text contrast
              '&:hover': { bgcolor: theme.palette.success.dark }
            }}
          >
            Click here
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  );
}
