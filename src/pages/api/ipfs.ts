import nextConnect from "next-connect";
const { Web3Storage, File, Blob } = require("web3.storage");
const bodyParser = require("body-parser");

const handler = nextConnect();

handler.use((req: any, res: any, next) => {
  bodyParser();
  next();
});

handler.post(async (req: any, res: any) => {
  try {
    const cid: string = await makeFileObjects(req.body);
    console.log(res, "res")
    return res.json(cid);
  } catch (err: any) {
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
    const cid: string = await client.put(files, {wrapWithDirectory: false});
    return cid;
  } catch (err: any) {
    console.error(err.message);
  }
};

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}
