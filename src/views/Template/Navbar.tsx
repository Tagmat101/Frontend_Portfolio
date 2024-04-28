import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { MoonFull, SunSnowflake } from 'mdi-material-ui';

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <AppBar position="static" color={darkMode ? 'inherit' : 'primary'}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ~ Hamza Ouabiba
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="#contact"
          sx={{ marginRight: isMobile ? 0 : 2 }}
        >
          Contact me
        </Button>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <SunSnowflake /> : <MoonFull />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
