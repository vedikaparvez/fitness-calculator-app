import React from 'react'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

import CalorieCounterPage from './pages/CalorieCounterPage';
import { CssBaseline } from '@mui/material';


const theme = createTheme({
    status: {
      danger: orange[500],
    },
  });

export default function App () {

    return ( <ThemeProvider theme={theme}>
      <CssBaseline />
        <CalorieCounterPage/>
        </ThemeProvider>
    )
}