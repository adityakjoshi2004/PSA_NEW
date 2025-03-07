// material-ui
import { useTheme } from '@mui/material/styles';
import myLogo from 'assets/images/my-logo.png';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <img src={myLogo} alt="Mantis" width="118" />
  );
};
  
export default Logo;