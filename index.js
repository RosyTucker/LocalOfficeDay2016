import express from 'express';
import Task from './src/Task';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post(Task.endPoint, Task.postHandler);
app.get(Task.endPoint, Task.getHandler);

app.listen(process.env.PORT || 5005);