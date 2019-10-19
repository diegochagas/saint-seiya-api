const express = require('express');
const cors = require('cors');

const routes = require('./routes.js');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((req, res, next) => res.status(404).json({ message: `${req.url} not found` }));

app.use((err, req, res, next) => res.status(500).json({ message: String(err) }));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
