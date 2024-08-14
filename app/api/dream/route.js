import connectToDB from "@utils/database";
import Dream from "@models/dream";

export const GET = async (req) => {
  try {
    await connectToDB();
    const dreams = await Dream.find({}).populate("creator");

    return new Response(JSON.stringify(dreams), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts Dream.", { status: 500 });
  }
};
