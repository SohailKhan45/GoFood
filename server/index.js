const express = require('express');
const connectDB = require('./db/connect');
const userRouter = require('./routes/user.routes')
const foodDataRouter = require('./routes/dataDisplay.routes')
const cors = require('cors')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: 'http://localhost:3000', // Adjust according to your front-end URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', foodDataRouter)

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});


connectDB(process.env.MONGO_URI).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Unable to connect to database', error);
});
