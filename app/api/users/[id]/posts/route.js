import connectToDB from "@utils/database";
import Dream from "@models/dream";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const dreams = await Dream.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(dreams), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts Dream.", { status: 500 });
  }
};