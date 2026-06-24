barcode.config.start = 0.1;
barcode.config.end = 0.9;
barcode.config.video = '#barcodevideo';
barcode.config.canvas = '#barcodecanvas';
barcode.config.canvasg = '#barcodecanvasg';
barcode.setHandler(function(barcode) {
    console.log(barcode);
});

barcode.init();

barcode.config.threshold: 160;
barcode.config.quality: 0.45;
