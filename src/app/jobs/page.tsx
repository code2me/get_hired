import { JobsType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getJobs = async () => {
  const res = await fetch("http://localhost:3000/api/jobs", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const Jobs = async () => {
  const jobs: JobsType = await getJobs();
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-wrap justify-center items-start gap-4">
      {jobs.map((job) => (
        <Link href={`/jobs/${job.id}`} key={job.id}>
          <div className="w-[15rem] h-[20rem] bg-gray-100 rounded-lg shadow-md p-4 ring-1 hover:ring-red-500">
            <div className="text-center p-2 h-[40%]">
              <Image
                src={job.company_logo}
                alt="Company Logo"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            </div>
            <div className="p-2 text-center">
              <h2 className="text-2xl font-bold mt-2 text-center">
                {job.company}
              </h2>
              <p className="text-lg text-center">{job.role}</p>
              <p className="text-lg mt-2 text-center">
                <span className="text-gray-500">{job.location}</span>
              </p>
              <p className="text-lg mt-2">
                CTC: <span className="text-green-800">{job.ctc}</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Jobs;
