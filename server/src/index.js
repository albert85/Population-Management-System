import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();

//  Log request to console
app.use(logger('dev'));

// Swagger path
const swaggerPath = path.join(__dirname, './apiDocs/*.js');

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: {
    info: {
      title: 'Random Number Generator',
      version: '1.0.0',
      description: 'API Documentation of Random Number',
    },
    host: 'localhost:4000',
    basePath: '/',
  },
  // path to the API docs
  apis: [swaggerPath],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

const router = express.Router();

router.get('/get', (req, res) => res.send('Hi welcome to a worker server'));

// import routes into application
app.use(router);

const port = parseInt(process.env.PORT, 10) || 4000;
app.set('port', port);

app.listen(port, () => console.log('Server is runing on port ', port));

export default app;
