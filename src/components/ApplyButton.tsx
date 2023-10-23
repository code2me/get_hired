"use client"
import { signOut, useSession } from "next-auth/react";

const ApplyButton = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div className="flex justify-center gap-8">
          <button className="uppercase w-56 bg-red-50 text-black p-3 ring-2 hover:ring-red-500 rounded-md">
            Apply Now
          </button>
          <button className="uppercase w-56 bg-green-50 text-black p-3 ring-2 hover:ring-green-500 rounded-md">
            Save For Later
          </button>
        </div>
      ) : (
        <div className="text-center text-red-500 text-xl">Login to apply for this Job</div>
      )}
    </div>
  );
}

export default ApplyButton