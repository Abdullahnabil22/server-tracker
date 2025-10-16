import { getServers } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const servers = getServers();
    return NextResponse.json(servers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch servers" },
      { status: 500 }
    );
  }
}
