const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Server is ok!")
})

app.listen(port, () => {
    console.log(`server is running on: ${port}`);
})