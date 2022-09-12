import nextConnect from "next-connect";
const { Web3Storage, File, Blob, getFilesFromPath } = require("web3.storage");
const bodyParser = require("body-parser");

const handler = nextConnect();

handler.use((req: any, res: any, next) => {
  bodyParser();
  next();
});

handler.post(async (req: any, res: any) => {
  try {
    const cid = await makeFileObjects(req.body);
    return res.json(cid);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error storing the file", success: false });
  }
});

export default handler;

const makeFileObjects = async (obj: any) => {
  const client = makeStorageClient();
  const blob = new Blob([obj], { type: "application/json" });
  const files = [new File([blob], `metadata.json`)];
  try {
    const cid = await client.put(files);
    return cid;
  } catch (err) {
    console.error(err.message);
  }
};

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}
