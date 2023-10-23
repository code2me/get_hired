"use client"

import { JobsType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const getJobs = async () => {
  try {
    const res = await fetch(`${process.env.HOSTED_URL}/api/jobs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs.");
    }

    return res.json();
  } catch (error) {
    console.error(error); // Log the error for debugging.
    throw error; // Rethrow the error to be caught by the component.
  }
};

const Jobs = () => {
  const [jobs, setJobs] = useState<JobsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getJobs()
      .then((data) => setJobs(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!jobs) {
    return <div>Loading...</div>;
  }

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
