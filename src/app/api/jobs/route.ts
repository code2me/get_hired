import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL JOBS
export const GET = async (req: NextRequest) => {
  try {
    const jobs = await prisma.job.findMany();
    return new NextResponse(JSON.stringify(jobs), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const job = await prisma.job.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(job), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};