import { Express, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import logger from '../../logger';
import { version } from '../../package.json';

const options: swaggerJsDoc.Options = {
  definition: {
    open: '3.0.0',
    info: {
      title: 'Feedback App Rest API',
      version,
      description:
        "This API documentation provides detailed information about the endpoints and functionalities available in the Feedback App's REST API. It serves as a reference for developers and integrators who want to interact with the Feedback App programmatically. The API supports authentication using Google Authentication. Please refer to the security section for more details on how to authenticate requests using the provided security schema",
    },
    components: {
      securitySchemas: {
        googleAuth: {
          type: 'apiKey',
          name: 'Cookie',
          in: 'cookie',
        },
      },
    },
    security: [{ googleAuth: [] }],
  },
  apis: ['./src/routes/*.ts', './src/schema/*.ts'],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-type', 'application/json');
    res.send(swaggerSpec);
  });
  logger.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
