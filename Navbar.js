import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Invoice Generator
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Invoices
        </Button>
        <Button color="inherit" component={Link} to="/create">
          Create Invoice
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;