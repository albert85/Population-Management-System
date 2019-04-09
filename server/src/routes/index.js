import express from 'express';

import stateRoute from 'routes/state'; //eslint-disable-line
import cityRoute from 'routes/city'; //eslint-disable-line

const app = express();

app.use(stateRoute);
app.use(cityRoute);

export default app;
