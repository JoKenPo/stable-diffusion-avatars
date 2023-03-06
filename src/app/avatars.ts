import { Request, Response } from "express";
import { Generate, ImageResponse, SimpleImageRequest } from './../services/stablediffusion';
import { StringBuilder } from '../utils/stringBuilder'
import { themes } from "../models/themes";

type Avatar = {
  images: Uint8Array[];
};

export class StableDiffusion {
  // RenderImage renders a stable diffusion image based on the hash given.
  public async renderImage(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    const { prompt, seed } = this.hallucinatePrompt(hash);

    try {
      const imageReq: SimpleImageRequest = {
        prompt: `masterpiece, best quality, ${prompt}`,
        negativePrompt: 
          "person in distance, worst quality, low quality, medium quality, deleted, lowres, comic, bad anatomy, bad hands, bad face, text, error, missing fingers, extra fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry",
        seed,
        sampler: "K_DPMPP_2M",
        batchSize: 1,
        nIter: 1,
        steps: 20,
        cfgScale: 7,
        width: 512,
        height: 512,
        sNoise: 1,
        overrideSettingsRestoreAfterwards: true,
      };

      const imgs = await Generate(imageReq);

      const imgData = imgs.artifacts[0];

      const buffer = await Buffer.from(imgData.base64, "base64");

      res.contentType("image/jpeg");
      // res.contentLength = 1; //imgData.length;
      res.header(
        "expires",
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()
      );
      res.header("Cache-Control", "max-age:2630000"); // one month
      res.status(200).send(buffer);
    } catch (error) {
      res
        .status(500)
        .send("candont render image, sorry");
    }
  }

  hallucinatePrompt(hash: string, theme: string = "RPG"): any {
    const sb = new StringBuilder();

    const mainTheme = themes[theme]

    if (hash[0] > '0' && hash[0] <= '5') {
      sb.append(mainTheme[0][0])
    } else {
      sb.append(mainTheme[0][1])
    }
  
    switch (hash[1]) {
    case '0': case '1': case '2': case '3':
      sb.append(mainTheme[1][0])
    case '4': case '5': case '6': case '7':
      sb.append(mainTheme[1][1])
    case '8': case '9': case 'a': case 'b':
      sb.append(mainTheme[1][2])
    case 'c': case 'd': case 'e': case 'f':
      sb.append(mainTheme[1][3])
    default:
    }
  
    if (hash[2] > '0' && hash[2] <= '5') {
      sb.append(mainTheme[2][0])
    } else {
      sb.append(mainTheme[2][1])
    }
  
    if (hash[3] > '0' && hash[3] <= '5') {
      sb.append(mainTheme[3][0])
    } else {
      sb.append(mainTheme[3][1])
    }
  
    switch (hash[4]) {
    case '0': case '1': case '2': case '3':
      sb.append(mainTheme[4][0])
    case '4': case '5': case '6': case '7':
      sb.append(mainTheme[4][1])
    case '8': case '9': case 'a': case 'b':
      sb.append(mainTheme[4][2])
    case 'c': case 'd': case 'e': case 'f':
      sb.append(mainTheme[4][3])
    default:
    }
  
    if (hash[5] > '0' && hash[5] <= '5') {
      sb.append(mainTheme[5][0])
    } else {
      sb.append(mainTheme[5][1])
    }
  
    switch (hash[6]) {
    case '0': case '1': case '2': case '3':
      sb.append(mainTheme[6][0])
    case '4': case '5': case '6': case '7':
      sb.append(mainTheme[6][1])
    case '8': case '9': case 'a': case 'b':
      sb.append(mainTheme[6][2])
    case 'c': case 'd': case 'e': case 'f':
      sb.append(mainTheme[6][3])
    default:
    }
  
    switch (hash[7]) {
    case '0': case '1': case '2': case '3':
      sb.append(mainTheme[7][0])
    case '4': case '5': case '6': case '7':
      sb.append(mainTheme[7][1])
    case '8': case '9': case 'a': case 'b':
      sb.append(mainTheme[7][2])
    case 'c': case 'd': case 'e': case 'f':
      sb.append(mainTheme[7][3])
    default:
    }
  
    switch (hash[8]) {
    case '0': case '1': case '2': case '3':
      sb.append(mainTheme[8][0])
    case '4': case '5': case '6': case '7':
      sb.append(mainTheme[8][1])
    case '8': case '9': case 'a': case 'b':
      sb.append(mainTheme[8][2])
    case 'c': case 'd': case 'e': case 'f':
      sb.append(mainTheme[8][3])
    default:
    }
  
    switch (hash[9]) {
    case '0': case '1': case '2': case '3':
      sb.append(mainTheme[9][0])
    case '4': case '5': case '6': case '7':
      sb.append(mainTheme[9][1])
    case '8': case '9': case 'a': case 'b':
      sb.append(mainTheme[9][2])
    case 'c': case 'd': case 'e': case 'f':
      sb.append(mainTheme[9][3])
    default:
    }
  
    switch (hash[10]) {
    case '0': case '1': case '2': case '3':
      sb.append(mainTheme[10][0])
    case '4': case '5': case '6': case '7':
      sb.append(mainTheme[10][1])
    case '8': case '9': case 'a': case 'b':
      sb.append(mainTheme[10][2])
    case 'c': case 'd': case 'e': case 'f':
      sb.append(mainTheme[10][3])
    default:
    }
  
    if (hash[11] == '0') {
      sb.append(mainTheme[11][0])
    }
  
    switch (hash[12]) {
    case '0': case '1': case '2': case '3':
      sb.append(mainTheme[12][0])
    case '4': case '5': case '6': case '7':
      sb.append(mainTheme[12][1])
    case '8': case '9': case 'a': case 'b':
      sb.append(mainTheme[12][2])
    case 'c': case 'd': case 'e': case 'f':
      sb.append(mainTheme[12][3])
    default:
    }
  
    if (hash[13] == '0') {
      sb.append(mainTheme[13][0])
    }
  
    switch (hash[14]) {
    case '0': case '1': case '2': case '3':
      sb.append(mainTheme[14][0])
    case '4': case '5': case '6': case '7':
      sb.append(mainTheme[14][1])
    case '8': case '9': case 'a': case 'b':
      sb.append(mainTheme[14][2])
    case 'c': case 'd': case 'e': case 'f':
      sb.append(mainTheme[14][3])
    default:
    }
  
    const seedPortion = hash.slice(-9, -1)
    const seed = parseInt(seedPortion, 16) || Math.floor(Math.random() * 1000000);

    if (!!mainTheme.extra) sb.append("extra: " + mainTheme.extra.join(','))

    // sb.append("pants")

    return {prompt: sb.toString(), seed}
  }
}