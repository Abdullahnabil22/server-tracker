import { getServerById, getServerMetrics } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const server = getServerById(id);

    if (!server) {
      return NextResponse.json({ error: "Server not found" }, { status: 404 });
    }

    const metrics = getServerMetrics(id);

    return NextResponse.json({
      ...server,
      metrics,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch server details" },
      { status: 500 }
    );
  }
}
