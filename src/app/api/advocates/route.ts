import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
// import { advocateData } from "../../../db/seed/advocates";

export async function GET(request: NextRequest) {
  // Uncomment this line to use a database
  const pageSize = 10;
  const page = request.nextUrl.searchParams.get("page");

  const pageNumber = parseInt(page ?? "1");

  const offset = (pageNumber - 1) * pageSize;

  const data = await db.select().from(advocates).limit(pageSize).offset(offset);

  // const data = advocateData;

  return Response.json({ data });
}
