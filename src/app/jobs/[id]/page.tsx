import ApplyButton from "@/components/ApplyButton";
import DeleteButton from "@/components/DeleteButton";
import { JobType } from "@/types/types";
import Image from "next/image";
import React from "react";

const getData = async (id: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const SingleJobPage = async ({ params }: { params: { id: string } }) => {
  const job: JobType = await getData(params.id);

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-12rem)]">
      <div className="p-4 lg:px-20 xl:px-40 flex flex-col md:flex-row md:gap-8 md:items-center relative h-full">
        <div className="relative w-full md:w-1/2 h-1/2 md:h-[70%] flex justify-center items-center">
          {job.company_logo && (
            <Image
              src={job.company_logo}
              alt={job.company}
              className="object-contain"
              layout="fill"
            />
          )}
        </div>
        <div className="flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
          <h1 className="text-3xl font-bold uppercase flex items-center">
            <span>{job.company}</span>
            <DeleteButton id={job.id} />
          </h1>
          <div className="text-lg">
            <p>
              <strong>Role:</strong> {job.role}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Years of Experience:</strong> {job.yoe}
            </p>
            <p>
              <strong>Minimum Qualification:</strong> {job.qualification}
            </p>
            <p>
              <strong>CTC:</strong> {job.ctc}
            </p>
            <p>
              <strong>Skills:</strong> {job.skills.join(", ")}
            </p>
          </div>
          <p className="text-lg">
            <strong>Job Description:</strong>
            <br />
            {job.jd}
          </p>
          <p className="text-lg">
            <strong>Perks:</strong>
            <br />
            {job.perks}
          </p>
        </div>
      </div>
      <ApplyButton jobId={params.id} />
    </div>
  );
};

export default SingleJobPage;
