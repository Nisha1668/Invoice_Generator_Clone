import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    customerName: '',
    customerEmail: '',
    dueDate: '',
    items: [{ description: '', quantity: 0, rate: 0, amount: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/invoices/${id}`)
      .then(response => {
        setInvoice(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoice.items];
    items[index][name] = value;
    items[index].amount = items[index].quantity * items[index].rate;
    
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;

    setInvoice(prevState => ({
      ...prevState,
      items,
      subtotal,
      tax,
      total
    }));
  };

  const addItem = () => {
    setInvoice(prevState => ({
      ...prevState,
      items: [...prevState.items, { description: '', quantity: 0, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index) => {
    const items = [...invoice.items];
    items.splice(index, 1);
    setInvoice(prevState => ({
      ...prevState,
      items
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/invoices/update/${id}`, invoice)
      .then(res => {
        console.log(res.data);
        navigate('/');
      });
  };

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Edit Invoice</Typography>
      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Invoice Number"
              name="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Customer Name"
              name="customerName"
              value={invoice.customerName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Customer Email"
              name="customerEmail"
              type="email"
              value={invoice.customerEmail}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Due Date"
              name="dueDate"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={invoice.dueDate ? invoice.dueDate.substring(0, 10) : ''}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>Items</Typography>
        {invoice.items.map((item, index) => (
          <Grid container spacing={2} key={index} sx={{ marginBottom: 1 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Rate"
                name="rate"
                type="number"
                value={item.rate}
                onChange={(e) => handleItemChange(index, e)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={item.amount}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button onClick={() => removeItem(index)} color="secondary">Remove</Button>
            </Grid>
          </Grid>
        ))}
        <Button onClick={addItem} color="primary" sx={{ marginBottom: 2 }}>Add Item</Button>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Subtotal"
              name="subtotal"
              type="number"
              value={invoice.subtotal}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Tax"
              name="tax"
              type="number"
              value={invoice.tax}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Total"
              name="total"
              type="number"
              value={invoice.total}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Notes"
          name="notes"
          multiline
          rows={4}
          value={invoice.notes}
          onChange={handleChange}
          sx={{ marginTop: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Update Invoice
        </Button>
      </Box>
    </Paper>
  );
};

export default EditInvoice;