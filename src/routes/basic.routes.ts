import { Router, request, response } from 'express';
import { run } from '../app/example'
import { StableDiffusion } from '../app/avatars';

const router = Router();

router.get('/example', async (request, response) => {
    await run()

    response.status(200)
    response.json({
        status: '200',
        message: 'Imagem criada com sucesso!'
    });
});

router.get('/:hash', async (request, response) => {
  return await new StableDiffusion().renderImage(request, response);

  response.status(200)
  response.json({
      status: '200',
      // message: 'Imagem criada com sucesso!'
  });
});

export default router;