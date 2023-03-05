
import './utils/module-alias';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'http';
import router from './routes';
import winston from 'winston';
import expressWinston from 'express-winston';

const loggerOptions: expressWinston.LoggerOptions = {
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.json(),
		winston.format.prettyPrint(),
		winston.format.colorize({ all: true }),
	),
  meta: false,
};

const notFoundHandler = (
	request: express.Request,
	response: express.Response,
	next: express.NextFunction,
) => {
	const message = 'Resource not found';
	response.status(404).json({ status: 404, message });
};

const errorHandler = (
	error: HttpException,
	request: express.Request,
	response: express.Response,
	next: express.NextFunction,
) => {
	const status = error.statusCode || error.status || 400;
	response.status(status).json({ status, ...error });
};

class HttpException extends Error {
	statusCode?: number;
	status?: number;
	message: string;
	error: string | null;

	constructor(statusCode: number, message: string, error?: string) {
		super(message);

		this.statusCode = statusCode;
		this.message = message;
		this.error = error || null;
	}
}
export class SetupApplication {
  private server?: Server;

  constructor(private port = 3030, public app = express()) { }

  public init(): void {
    this.setupExpress();
    this.setupLogger();
    this.setupRoutes();

  }

  private setupRoutes(): void {
    this.app.use(router);
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setupLogger(): void {
		this.app.use(expressWinston.logger(loggerOptions));
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
  	  console.log('Server environment: ', process.env.NODE_ENV?.toLowerCase());
      console.log(`Server running at http://localhost:${this.port} 🚀`);
    });
  }
}