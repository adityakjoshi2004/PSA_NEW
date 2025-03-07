import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, createContext } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project imports
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';



// ==============================|| THEME CONTEXT ||============================== //
export const ThemeModeContext = createContext();

export default function ThemeCustomization({ children }) {
  // Load saved theme from localStorage or default to 'light'
  const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') || 'light');

  // Save theme preference in localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      console.log("Theme changed to:", newMode);  // Debugging
      return newMode;
    });
  };
  
  const theme = Palette(themeMode, 'default');
  
  const themeTypography = Typography(`'Public Sans', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440
        }
      },
      direction: 'ltr',
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleTheme }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </ThemeModeContext.Provider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node
};