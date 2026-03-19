require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 1000;

app.listen ( PORT, () => {
    console.log("Congratulations")
});