import fs from "fs";

export async function deleteFile(path: string) {
  await fs.promises.unlink(path);
}
