const express = require('express');
const app = express();
const api = require('./routes/api.js');

app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Invalid API endpoint');
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});