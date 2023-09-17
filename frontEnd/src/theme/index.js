import PropTypes from 'prop-types';
import { useMemo, useState, createContext } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette, {paletteDark} from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import {useAuth} from  "../hooks/useAuth";
import useMode, {ModeContext} from "../hooks/display/useMode";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};


export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');
  const themeOptions = useMemo(
    () => ({
      palette:mode==='dark'?paletteDark:palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    [mode]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <ModeContext.Provider value={{mode, setMode}}>
        {children}
        </ModeContext.Provider>
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

export {ModeContext};
