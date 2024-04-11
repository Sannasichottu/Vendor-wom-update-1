import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Stack, Typography } from '@mui/material';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

const Footer = () => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
    <Typography variant="caption">&copy; work order ♥ crafted by Team tit</Typography>
    <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
      <Link component={RouterLink} to="/" target="_blank" variant="caption" color="textPrimary">
        Home
      </Link>
      <Link component={RouterLink} to="/dashboard/default" target="_blank" variant="caption" color="textPrimary">
        dashboard
      </Link>
    </Stack>
  </Stack>
);

export default Footer;
