import * as path from 'path';
import * as fs from 'fs';

const ASSETS_FOLDER_NAME = "images"

const createFolderIfNotExists = (folderPath:string) => {
  if(!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true })
}

export const getDataFolderPath = ()=> {
  const result = path.resolve(ASSETS_FOLDER_NAME)
  createFolderIfNotExists(result)

  return ASSETS_FOLDER_NAME
}

export const persistData = async (data: any, localFilePath: string) => {
  await fs.writeFileSync(localFilePath, data
    // , 
  //   (err: any) => {
  //   if (err) throw err;
  //     console.log(`A imagem foi salva em ${localFilePath}`);
  // }
  )
}