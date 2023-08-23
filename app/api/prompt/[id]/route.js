import { dbConnection } from "@utils/database";
import Prompt from "@models/prompt";


//GET Request for Post
export const GET = async (req, { params }) => {
  try {
    await dbConnection()

    const post = await Prompt.findById(params.id).populate('creator')

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new Response("Error finding Prompts", { status: 500 })
  }
}


//PATCH Request for Post
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()

  try {
    await dbConnection()

    const existingPost = await Prompt.findById(params.id)
    if (!existingPost) {
      return new Response("Failed to Fetch Post", { status: 404 })
    }

    const updatedPost = await Prompt.findByIdAndUpdate(params.id, {
      prompt:prompt,
      tag:tag

    },{new:true})
    
    await updatedPost.save()
    console.log(updatedPost);

    return new Response(JSON.stringify(updatedPost), { status: 200 })
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 })
  }
}


//DELETE Request for Post 
export const DELETE = async (req, { params }) => {
  try {
    await dbConnection()

    await Prompt.findByIdAndDelete(params.id)

    return new Response("Deleted Successfully", {status:200})

  } catch (error) {
    return new Response("Internal Server Error", {status:500})
  }
}