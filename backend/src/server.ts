import express from 'express';
import path from 'path';
import routes from './routes'
import errorHandler from './errors/handler';
import 'express-async-errors';
import './database/connection';


const app = express();

app.use(express.json());
app.use(errorHandler);
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));



app.listen(4000,function () {
    console.log('App is listening on port 4000!');
});