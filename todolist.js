const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send("Testing 123");
})

app.listen(3000, () => console.log('server up on :3000'));