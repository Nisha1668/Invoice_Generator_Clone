const router = require('express').Router();
let Invoice = require('../models/invoiceModel.js');

router.route('/').get((req, res) => {
  Invoice.find()
    .then(invoices => res.json(invoices))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newInvoice = new Invoice(req.body);

  newInvoice.save()
    .then(() => res.json('Invoice added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Invoice.findById(req.params.id)
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Invoice.findByIdAndDelete(req.params.id)
    .then(() => res.json('Invoice deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Invoice.findById(req.params.id)
    .then(invoice => {
      invoice.invoiceNumber = req.body.invoiceNumber;
      invoice.customerName = req.body.customerName;
      invoice.customerEmail = req.body.customerEmail;
      invoice.dueDate = Date.parse(req.body.dueDate);
      invoice.items = req.body.items;
      invoice.subtotal = req.body.subtotal;
      invoice.tax = req.body.tax;
      invoice.total = req.body.total;
      invoice.notes = req.body.notes;

      invoice.save()
        .then(() => res.json('Invoice updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
