const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Invalid API endpoint');
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});