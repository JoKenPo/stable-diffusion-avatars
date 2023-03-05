import dotenv from 'dotenv';
dotenv.config();

import { SetupApplication } from './app';


class Server {
    static start(): void {
        const app = new SetupApplication(parseInt(process.env.PORT as string, 10) | 3030);
        app.init();

        app.start();
    }
}

Server.start();