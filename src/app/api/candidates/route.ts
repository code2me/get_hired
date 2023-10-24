import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

// FETCH ALL CANDIDATES
export const GET = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();
    if(session?.user.isAdmin || session?.user.isRecuriter) {
      const candidates = await prisma.candidate.findMany();
      return new NextResponse(JSON.stringify(candidates), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ message: "Not Authorized!" }), {
        status: 403,
      });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// CREATE PROFILE 
export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const userId = session?.user.userId as string;
    console.log("🚀 ~ file: route.ts:25 ~ POST ~ userId:", userId)
    
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })


    const candidate = await prisma.candidate.create({
      data: {
        ...body
      },
    });

    return new NextResponse(JSON.stringify(candidate), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
