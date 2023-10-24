import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE PROFILE
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

    return new NextResponse(JSON.stringify(candidate), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// UPDATE SINGLE PROFILE
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const session = await getAuthSession();
  const body = await req.json();

  if (session) {
    try {
      await prisma.candidate.update({
        where: {
          userId: id,
        },
        data: body,
      });

      return new NextResponse(JSON.stringify("Profile has been Updated!"), {
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
