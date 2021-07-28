const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./routes/user.router');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/users', userRouter);

app.listen(3000, () => console.log('Server listo'));
