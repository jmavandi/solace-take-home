import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { AdvocatesResponse } from "../../../types/advocate";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search")?.toLowerCase() || "";

    // Uncomment this line to use a database
    // const data = await db.select().from(advocates);

    let data = advocateData;

    // Server-side filtering for better performance
    if (searchTerm) {
      data = data.filter((advocate) => {
        return (
          advocate.firstName.toLowerCase().includes(searchTerm) ||
          advocate.lastName.toLowerCase().includes(searchTerm) ||
          advocate.city.toLowerCase().includes(searchTerm) ||
          advocate.degree.toLowerCase().includes(searchTerm) ||
          advocate.specialties.some((specialty) =>
            specialty.toLowerCase().includes(searchTerm)
          ) ||
          advocate.yearsOfExperience.toString().includes(searchTerm)
        );
      });
    }

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
