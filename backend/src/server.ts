import express from 'express';
import './database/connection';
import routes from './routes'


const app = express();

app.use(express.json());
app.use(routes);


app.listen(4000,function () {
    console.log('App is listening on port 4000!');
});