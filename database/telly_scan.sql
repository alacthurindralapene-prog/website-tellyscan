CREATE DATABASE telly_scan;
USE telly_scan;

CREATE TABLE manpower (
    id INT AUTO_INCREMENT PRIMARY KEY,
    barcode VARCHAR(50) UNIQUE,
    nama VARCHAR(100),
    unit VARCHAR(50)
);

INSERT INTO manpower
(barcode,nama,unit)
VALUES
('12345','Ahmad Subarjo','Lini A'),
('12346','Hikma','Lini A'),
('12347','Della','Lini A'),
('67890','Siti Aminah','Lini B'),
('55555','Budi Santoso','Lini C');

CREATE TABLE production (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tanggal DATE,
    supervisor VARCHAR(100),
    barcode VARCHAR(50),
    nama VARCHAR(100),
    komoditas VARCHAR(50),
    size_produk VARCHAR(20),
    jumlah INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);