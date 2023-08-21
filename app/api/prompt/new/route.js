import Prompt from "@models/prompt";
import { dbConnection } from "@utils/database";

export const POST = async (req, res) => {
  const {userId, prompt, tag} = await req.json()

  try {
    await dbConnection()

    const newPrompt = new Prompt({
      creator:userId,
      prompt,
      tag
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), {status: 201})
  } catch (error) {
    console.log(error);
    return new Response("Failed to Create Prompt", {status:500})
  }
}