import express from 'express';
import Task from './src/Task';

const app = express();

app.post(Task.endPoint, Task.postHandler);

app.listen(process.env.PORT || 5005);