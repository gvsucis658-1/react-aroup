import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    const jobPost = await prisma.jobPost.findUnique({
      where: { id },
    });

    if (!jobPost) {
      return NextResponse.json(
        { error: "Job post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(jobPost);
  } catch (error) {
    console.error("Error fetching job post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 