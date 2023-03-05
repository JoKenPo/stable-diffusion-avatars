import { Request, Response } from "express";
import { Generate, ImageResponse, SimpleImageRequest } from './../services/stablediffusion';
import { StringBuilder } from '../utils/stringBuilder'

type Avatar = {
  images: Uint8Array[];
};

export class StableDiffusion {
  // RenderImage renders a stable diffusion image based on the hash given.
  //
  // It assumes that the image does dont exist, if it does, you will need
  // to check elsewhere.
  public async renderImage(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    const { prompt, seed } = this.hallucinatePrompt(hash);

    try {
      const imageReq: SimpleImageRequest = {
        text_prompts: [
          { text: `masterpiece, best quality, ${prompt}`},
          // { text: "dont person in distance, dont worst quality, dont low quality, dont medium quality, dont deleted, dont lowres, dont comic, dont bad anatomy, dont bad hands, dont text, dont error, dont missing fingers, dont extra digit, dont fewer digits, dont cropped, dont jpeg artifacts, dont signature, dont watermark, dont username, dont blurry"}
        ],
        // negativePrompt: 
        //   "person in distance, worst quality, low quality, medium quality, deleted, lowres, comic, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry"
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

  hallucinatePrompt(hash: string): any {
    const sb = new StringBuilder();
    if (hash[0] > '0' && hash[0] <= '5') {
      sb.append("1girl, ")
    } else {
      sb.append("1guy, ")
    }
  
    switch (hash[1]) {
    case '0': case '1': case '2': case '3':
      sb.append("blonde, ")
    case '4': case '5': case '6': case '7':
      sb.append("brown hair, ")
    case '8': case '9': case 'a': case 'b':
      sb.append("red hair, ")
    case 'c': case 'd': case 'e': case 'f':
      sb.append("black hair, ")
    default:
    }
  
    if (hash[2] > '0' && hash[2] <= '5') {
      sb.append("coffee shop, ")
    } else {
      sb.append("landscape, outdoors, ")
    }
  
    if (hash[3] > '0' && hash[3] <= '5') {
      sb.append("hoodie, ")
    } else {
      sb.append("sweatsuit, ")
    }
  
    switch (hash[4]) {
    case '0': case '1': case '2': case '3':
      sb.append("<lora:cdi:1>, ")
    case '4': case '5': case '6': case '7':
      sb.append("breath of the wild, ")
    case '8': case '9': case 'a': case 'b':
      sb.append("genshin impact, ")
    case 'c': case 'd': case 'e': case 'f':
      sb.append("arknights, ")
    default:
    }
  
    if (hash[5] > '0' && hash[5] <= '5') {
      sb.append("watercolor, ")
    } else {
      sb.append("matte painting, ")
    }
  
    switch (hash[6]) {
    case '0': case '1': case '2': case '3':
      sb.append("highly detailed, ")
    case '4': case '5': case '6': case '7':
      sb.append("ornate, ")
    case '8': case '9': case 'a': case 'b':
      sb.append("thick lines, ")
    case 'c': case 'd': case 'e': case 'f':
      sb.append("3d render, ")
    default:
    }
  
    switch (hash[7]) {
    case '0': case '1': case '2': case '3':
      sb.append("short hair, ")
    case '4': case '5': case '6': case '7':
      sb.append("long hair, ")
    case '8': case '9': case 'a': case 'b':
      sb.append("ponytail, ")
    case 'c': case 'd': case 'e': case 'f':
      sb.append("pigtails, ")
    default:
    }
  
    switch (hash[8]) {
    case '0': case '1': case '2': case '3':
      sb.append("smile, ")
    case '4': case '5': case '6': case '7':
      sb.append("frown, ")
    case '8': case '9': case 'a': case 'b':
      sb.append("laughing, ")
    case 'c': case 'd': case 'e': case 'f':
      sb.append("angry, ")
    default:
    }
  
    switch (hash[9]) {
    case '0': case '1': case '2': case '3':
      sb.append("sweater, ")
    case '4': case '5': case '6': case '7':
      sb.append("tshirt, ")
    case '8': case '9': case 'a': case 'b':
      sb.append("suitjacket, ")
    case 'c': case 'd': case 'e': case 'f':
      sb.append("armor, ")
    default:
    }
  
    switch (hash[10]) {
    case '0': case '1': case '2': case '3':
      sb.append("blue eyes, ")
    case '4': case '5': case '6': case '7':
      sb.append("red eyes, ")
    case '8': case '9': case 'a': case 'b':
      sb.append("brown eyes, ")
    case 'c': case 'd': case 'e': case 'f':
      sb.append("hazel eyes, ")
    default:
    }
  
    if (hash[11] == '0') {
      sb.append("heterochromia, ")
    }
  
    switch (hash[12]) {
    case '0': case '1': case '2': case '3':
      sb.append("morning, ")
    case '4': case '5': case '6': case '7':
      sb.append("afternoon, ")
    case '8': case '9': case 'a': case 'b':
      sb.append("evening, ")
    case 'c': case 'd': case 'e': case 'f':
      sb.append("nighttime, ")
    default:
    }
  
    if (hash[13] == '0') {
      sb.append("<lora:genshin:1>, genshin, ")
    }
  
    switch (hash[14]) {
    case '0': case '1': case '2': case '3':
      sb.append("vtuber, ")
    case '4': case '5': case '6': case '7':
      sb.append("anime, ")
    case '8': case '9': case 'a': case 'b':
      sb.append("studio ghibli, ")
    case 'c': case 'd': case 'e': case 'f':
      sb.append("cloverworks, ")
    default:
    }

  
    const seedPortion = hash.slice(-9, -1)
    const seed = parseInt(seedPortion, 16) || Math.floor(Math.random() * 1000000);
  
    sb.append("pants")

  
    return {prompt: sb.toString(), seed}
  }
}