import * as http from 'http';
import * as url from 'url';

interface TextPrompt {
  text: string
}

export interface SimpleImageRequest {
  text_prompts: Array<TextPrompt>;
  negativePrompt: string;
  styles: string[];
  seed: number;
  samplerName: string;
  batchSize: number;
  nIter: number;
  steps: number;
  cfgScale: number;
  width: number;
  height: number;
  sNoise: number;
  overrideSettings: Record<string, unknown>;
  overrideSettingsRestoreAfterwards: boolean;
}

export interface ImageResponse {
  // images: Uint8Array[];
  // info: string;
  artifacts: Array<{
		base64: string;
		seed: number;
		finishReason: string;
	}>

}

export interface ImageInfo {
  prompt: string;
  allPrompts: string[];
  negativePrompt: string;
  allNegativePrompts: string[];
  seed: number;
  allSeeds: number[];
  subseed: number;
  allSubseeds: number[];
  subseedStrength: number;
  width: number;
  height: number;
  samplerName: string;
  cfgScale: number;
  steps: number;
  batchSize: number;
  restoreFaces: boolean;
  faceRestorationModel: unknown;
  sdModelHash: string;
  seedResizeFromW: number;
  seedResizeFromH: number;
  denoisingStrength: number;
  extraGenerationParams: Record<string, unknown>;
  indexOfFirstImage: number;
  infotexts: string[];
  styles: unknown[];
  jobTimestamp: string;
  clipSkip: number;
  isUsingInpaintingConditioning: boolean;
}


const sdServerURL = `https://api.stability.ai`;
const engineId = 'stable-diffusion-512-v2-0'

function buildURL(path: string): url.URL {
  const u = new url.URL(sdServerURL);
  u.pathname = path;
  return u
}

class Client {
  // private req: any;

  // constructor() {
  //   this.req = http.globalAgent;
  // }

  async generate(inp: SimpleImageRequest): Promise<ImageResponse> {
    const u = buildURL(`/v1beta/generation/${engineId}/text-to-image`);
    const body = JSON.stringify(inp);

    const response = await fetch(u.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${process.env.API_KEY}`
      },
      body: body,
    });

    if (!response.ok) {
      // console.log(`Failed to fetch response: ${response.status} ${JSON.stringify(response)}`)
      throw new Error(`Failed to fetch response: ${response.status} ${response.text}`);
    }

    const data = await response.json();
    return data as ImageResponse;
  }
}

const Default = new Client();

export async function Generate(inp: SimpleImageRequest): Promise<ImageResponse> {
  return Default.generate(inp);
}
