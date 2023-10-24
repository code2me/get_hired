import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server"; 

// GET ALL APPLIED JOBS BY CANDIDATE
// export const GET = async (
//   req: NextRequest,
// ) => {
//   try {
//     const session = await getAuthSession();
//     const userId = session?.user.userId as string;
//     console.log("🚀 ~ file: route.ts:12 ~ userId:", userId)

//     const candidate = await prisma.candidate.findUnique({
//       where: {
//         userId: userId,
//       },
//     });

//     return new NextResponse(JSON.stringify(candidate?.jobIDs), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };
