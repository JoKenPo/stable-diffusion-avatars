import { Request, Response, Router } from 'express';
import { StableDiffusion } from './app/avatars';
import BasicRoutes from './routes/basic.routes'

class Routes {
    static define(router: Router): Router {
        const stableDiffusion = new StableDiffusion();

        router.use('/image', BasicRoutes);

        return router;
    }
}

export default Routes.define(Router());