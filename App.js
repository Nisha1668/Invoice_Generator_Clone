import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Navbar from './components/Navbar';
import InvoiceList from './components/InvoiceList';
import CreateInvoice from './components/CreateInvoice';
import EditInvoice from './components/EditInvoice';

import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/"  element={<InvoiceList />} />
            <Route path="/create" element={<CreateInvoice />} />
            <Route path="/edit/:id" element={<EditInvoice />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
