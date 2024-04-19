const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 4000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api',require('./routes/index'));

app.listen(port, () =>{
    console.log('Server on port', port);
});

