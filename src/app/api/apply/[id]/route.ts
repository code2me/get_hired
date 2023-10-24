import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET ALL APPLIED JOBS BY CANDIDATE
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const candidate = await prisma.candidate.findUnique({
      where: {
        userId: id,
      },
    });

    return new NextResponse(JSON.stringify(candidate?.jobIDs), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// UPDATE CANDIDATE APPLIED JOBS
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const jobId = params.id;
  const session = await getAuthSession();
  const userId = session?.user.userId as string;

  if (session) {
    try {
      await prisma.candidate.update({
        where: {
          userId: userId,
        },
        data: {
          jobIDs: {
            push: jobId,
          },
        },
      });

      return new NextResponse(JSON.stringify("Job has been Applied!"), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }
  return new NextResponse(JSON.stringify({ message: "You are not allowed!" }), {
    status: 403,
  });
};
