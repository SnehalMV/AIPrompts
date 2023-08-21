import { dbConnection } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await dbConnection()

    const posts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response("Error finding Prompts", { status: 500 })
  }
} 