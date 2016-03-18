import express from 'express';
import Version from './Version';

const app = express();

app.get(Version.END_POINT, Version.handler);

app.listen(5000);
