"use client"
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const ApplyButton = ({ jobId }: { jobId: string }) => {
  const { data: session, status } = useSession();
  
  const handleApply = async () => {
    //update the candidate with applied job
    const res = await fetch(`/api/apply/${jobId}`, {
      method: "PUT",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed!");
    } else {
      toast("The Job has been Applied!");
    }
  };

  return (
    <div>
      {status === "authenticated" ? (
        <div className="flex justify-center gap-8">
          <button
            onClick={handleApply}
            className="uppercase w-56 bg-red-50 text-black p-3 ring-2 hover:ring-red-500 rounded-md"
          >
            Apply Now
          </button>
          <button className="uppercase w-56 bg-green-50 text-black p-3 ring-2 hover:ring-green-500 rounded-md">
            Save For Later
          </button>
        </div>
      ) : (
        <div className="text-center text-red-500 text-xl">
          Login to apply for this Job
        </div>
      )}
    </div>
  );
};

export default ApplyButton