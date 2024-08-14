import connectToDB from "@utils/database";
import Dream from "@models/dream";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const dreams = await Dream.findById(params.id).populate("creator");

    if (!dreams) {
      return new Response("Dream not found.", { status: 500 });
    }

    return new Response(JSON.stringify(dreams), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Dream.", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { dream, tag } = await req.json();
  try {
    await connectToDB();
    const existingDreams = await Dream.findById(params.id);

    if (!existingDreams) {
      return new Response("Dream not found.", { status: 500 });
    }

    existingDreams.dream = dream;
    existingDreams.tag = tag;

    await existingDreams.save();

    return new Response(JSON.stringify(existingDreams), { status: 200 });
  } catch (error) {
    return new Response("Failed to update Dream.", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const existingDreams = await Dream.findByIdAndDelete(params.id);

    return new Response("Dream deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Dream.", { status: 500 });
  }
};
