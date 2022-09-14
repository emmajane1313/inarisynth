import nextConnect from "next-connect";
const bodyParser = require("body-parser");
import Replicate from "replicate-js";

const handler = nextConnect();

handler.use((req: any, res: any, next) => {
  bodyParser();
  next();
});

handler.post(async (req: any, res: any) => {
  try {
    const image = await makePromptRequest(req.body);
    console.log(image, "images");
    // return res.json(image);
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Error making Prompt", success: false });
  }
});

export default handler;

const makePromptRequest = async (obj: any) => {
  const client = makeReplicateClient();
  console.log(client, "success")
  console.log(obj)
  try {
    const model: any = await client.models.get("stability-ai/stable-diffusion", "a9758cbfbd5f3c2094457d996681af52552901775aa2d6dd0b17fd15df959bef")
    console.log("made it to model", JSON.stringify(model))
    const prediction: string = await model.predict({
        prompt: "small cat",
  })
    console.log("made it to prediction", prediction)
    return prediction;
  } catch (err: any) {
    console.error(err.message);
  }
};

function makeReplicateClient() {
  return new Replicate({token: process.env.REPLICATE_KEY});
}
