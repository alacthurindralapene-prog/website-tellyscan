const express = require('express');
const { createCanvas } = require('canvas');
const Barcode = require('jsbarcode');

const app = express();
const port = process.env.PORT || 3000;

// Create a barcode endpoint
app.get('/barcode/:text', (req, res) => {
  const canvas = createCanvas();
  Barcode(canvas, req.params.text, {
    format: 'CODE128',
    displayValue: true,
    fontSize: 18,
    textMargin: 10
  });

  res.type('image/png');
  const stream = canvas.createPNGStream();
  stream.pipe(res);
});

// Start the server
app.listen(port, () => {
  console.log(`Barcode API listening on port ${port}`);
});
