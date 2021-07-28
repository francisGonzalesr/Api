const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./routes/user.router');
app.set('puerto', process.env.PORT || 4000);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/users', userRouter);

app.listen(app.get('puerto'), () => console.log('Server listo'));

