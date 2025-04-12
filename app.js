const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, (req, res, next) => {
    console.log(`Listening on port: ${PORT}`);
})

