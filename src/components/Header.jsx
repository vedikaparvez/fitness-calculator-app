import React from 'react'
import { AppBar, CssBaseline, Toolbar, Typography, Container, Button, Grid } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const Header = () => {
    return (
        <AppBar position='fixed'>
            <Toolbar>
                <Typography variant='h6'>
                    Calorie Calculator
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;