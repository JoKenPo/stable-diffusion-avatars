import { Request, Response, Router } from 'express';
import { StableDiffusion } from './app/avatars';
import { run } from './app/example'

class Routes {
    static define(router: Router): Router {
        const stableDiffusion = new StableDiffusion();

        router.use('/example', async (req: Request, res: Response) => {
          router.get("/", async () => {
            return await run()
          })
          
        });

        // 
        router.use("/image/:hash", async (req: Request, res: Response) => {
          return await stableDiffusion.renderImage(req, res);
        });

        return router;
    }
}

export default Routes.define(Router());