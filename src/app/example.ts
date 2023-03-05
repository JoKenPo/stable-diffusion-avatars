
import { Generate, SimpleImageRequest, ImageResponse } from '../services/stablediffusion';
import { getDataFolderPath, persistData } from '../utils/createFile';

const request: SimpleImageRequest = {
  text_prompts: [
    { text: 'Uma casa na praia' }
  ],
  // negativePrompt: 'Sem pessoas',
  styles: ['landscape'],
  seed: 42,
  samplerName: 'tft',
  batchSize: 1,
  nIter: 1,
  steps: 50,
  cfgScale: 1,
  width: 512,
  height: 512,
  sNoise: 0,
  // overrideSettings: {},
  overrideSettingsRestoreAfterwards: false,
};
export function run() {
  Generate(request)
    .then(async (response: ImageResponse) => {
    const imageResponse = response;
  
    if (imageResponse.artifacts.length > 0) {
      const imageBuffer = imageResponse.artifacts[0];
      const fileName = `image_${new Date().toISOString().replace(/:/g, '-')}.jpg`;
      
      const buffer = await Buffer.from(imageBuffer.base64, "base64");
  
      return await persistData(buffer, `${getDataFolderPath()}/${fileName}`);
    } else {
      throw new Error('Não foi possível gerar a imagem.');
    }
  });
}

