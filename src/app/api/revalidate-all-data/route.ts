import { revalidatePath } from "next/cache";

export const POST = async (req: Request) => {
  let authHeader = req.headers.get("Authorization");

  if (authHeader !== `Bearer ${process.env.REVALIDATE_ALL_DATA_TOKEN}`) {
    return Response.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  // revalidate all data
  revalidatePath("/", "layout");

  return Response.json(
    { message: "revalidate all data" },
    {
      status: 200,
    },
  );
};
