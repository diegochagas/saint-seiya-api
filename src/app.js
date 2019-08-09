const express = require('express');
const app = express();
const port = 3002;
const allSaints = [
    {
        id: 1,
        name: 'QConSP',
        data: ['24/04/2017', '25/04/2017', '26/04/2017'],
        link: 'http://qconsp.com'
    },
    {
        id: 2,
        name: 'FrontInSampa',
        data: ['01/07/2017'],
        link: 'http://www.frontinsampa.com.br'
    },
    {
        id: 3,
        name: 'FrontInVale',
        data: ['16/07/2017'],
        link: 'https://www.eventick.com.br/frontinvale2017'
    }
];

app.get('/allsaints', (req, res) => res.json(allSaints))/

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('To shutdown the server: ctrl + c');
});