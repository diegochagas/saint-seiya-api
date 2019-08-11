const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');
const port = 3002;
const allSaints = [];

fs.createReadStream('public/data/athena-saints.csv')
    .pipe(csv())
    .on('data', (data) => allSaints.push(data));

app.get('/allsaints', (req, res) => res.json(allSaints));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('To shutdown the server: ctrl + c');
});