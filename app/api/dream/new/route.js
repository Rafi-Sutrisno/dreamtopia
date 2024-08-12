import connectToDB from "@utils/database";
import Dream from "@models/dream";

export const POST = async (req) => {
  const { userId, dream, tag } = await req.json();

  try {
    await connectToDB();
    const newDream = new Dream({
      creator: userId,
      dream,
      tag,
    });

    await newDream.save();

    return new Response(JSON.stringify(newDream), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Dream.", { status: 500 });
  }
};
