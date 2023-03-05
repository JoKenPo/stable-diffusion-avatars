const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const stablediffusion = require('within.website/x/internal/stablediffusion');
const bbolt = require('bbolt');
const singleflight = require('promise-singleflight');

class StableDiffusion {
  constructor() {
    this.client = new stablediffusion.Client();
    this.db = new bbolt.DB('./avatars.db', { mode: 0o600 });
    this.group = new singleflight.Group();
  }

  // RenderImage renders a stable diffusion image based on the hash given.
  //
  // It assumes that the image does not exist, if it does, you will need
  // to check elsewhere.
  async RenderImage(ctx, w, hash) {
    const [prompt, seed] = hallucinatePrompt(hash);

    console.log({ prompt });

    const [imgs, err] = await this.group.Do(hash, async () => {
      const request = {
        prompt: `masterpiece, best quality, ${prompt}`,
        negativePrompt: "person in distance, worst quality, low quality, medium quality, deleted, lowres, comic, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry",
        seed: seed,
        samplerName: "DPM++ 2M Karras",
        batchSize: 1,
        nIter: 1,
        steps: 20,
        cfgScale: 7,
        width: 256,
        height: 256,
        sNoise: 1,
        overrideSettingsRestoreAfterwards: true,
      };
      const { images } = await this.client.Generate(request);
      const img = await this.decodeJpeg(images[0]);
      const buffer = await this.encodeJpeg(img, { quality: 75 });
      images[0] = buffer;
      return images;
    });

    if (err) {
      throw err;
    }

    console.log({ prompt });

    await this.db.update((tx) => {
      const bkt = tx.bucket('avatars') || tx.createBucket('avatars');
      return bkt.put(hash, imgs[0]);
    });

    w.setHeader('content-type', 'image/jpeg');
    w.setHeader('content-length', imgs[0].length.toString());
    w.setHeader('expires', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString());
    w.setHeader('Cache-Control', 'max-age:2630000'); // one month
    w.writeHead(200);
    w.write(imgs[0]);
  }

  async decodeJpeg(data) {
    return new Promise((resolve, reject) => {
      const img = new (require('canvas')).Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = Buffer.from(data);
    });
  }
  
  async encodeJpeg(img, options) {
    return new Promise((resolve, reject) => {
      const canvas = new (require('canvas')).Canvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBuffer('image/jpeg', options, (err, buffer) => {})
    })
  }

  }


