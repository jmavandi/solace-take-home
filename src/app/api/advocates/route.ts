import { NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { AdvocatesResponse } from "../../../types/advocate";

export async function GET(): Promise<NextResponse> {
  try {
    // Uncomment this line to use a database
    // const data = await db.select().from(advocates);

    const data = advocateData;

    const response: AdvocatesResponse = { data };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return NextResponse.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}
