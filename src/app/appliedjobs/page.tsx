"use client"
import { JobType } from "@/types/types";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from 'react'

const AppliedJobsPage = () => {
  const { data: session, status } = useSession();
  const userId = session?.user.userId as string;
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      const res = await fetch(`/api/jobs`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch jobs.");
      }

      const data = await res.json();
      setAllJobs(data);
    } catch (error) {
      console.error(error); // Log the error for debugging.
      throw error; // Rethrow the error to be caught by the component.
    }
  }

  const getAllAppliedJobs = async (userId: string) => {
    try {
      const res = await fetch(`/api/apply/${userId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch jobs.");
      }

      const data = await res.json();
      setAppliedJobs(data);
    } catch (error) {
      console.error(error); // Log the error for debugging.
      throw error; // Rethrow the error to be caught by the component.
    }
  };

  useEffect(() => {
    if (session && userId) {
      getAllAppliedJobs(userId);
      getAllJobs();
    }
  }, [session]);

  const filteredJobs = allJobs.filter((job: JobType) =>
    appliedJobs.some((appliedJob) => appliedJob === job.id)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Applied Jobs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-100">Company</th>
              <th className="px-4 py-2 bg-gray-100">Role</th>
              <th className="px-4 py-2 bg-gray-100">Location</th>
              <th className="px-4 py-2 bg-gray-100">Years of Experience</th>
              <th className="px-4 py-2 bg-gray-100">Qualification</th>
              <th className="px-4 py-2 bg-gray-100">CTC</th>
              <th className="px-4 py-2 bg-gray-100">Skills</th>
              <th className="px-4 py-2 bg-gray-100">Job Description</th>
              <th className="px-4 py-2 bg-gray-100">Perks</th>
              <th className="px-4 py-2 bg-gray-100">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job: JobType) => (
              <tr key={job.id} className="hover:bg-red-50">
                <td className="border px-4 py-2">{job.company}</td>
                <td className="border px-4 py-2">{job.role}</td>
                <td className="border px-4 py-2">{job.location}</td>
                <td className="border px-4 py-2">{job.yoe}</td>
                <td className="border px-4 py-2">{job.qualification}</td>
                <td className="border px-4 py-2">{job.ctc}</td>
                <td className="border px-4 py-2">{job.skills.join(", ")}</td>
                <td className="border px-4 py-2">{job.jd}</td>
                <td className="border px-4 py-2">{job.perks}</td>
                <td className="border px-4 py-2">
                  <div>
                    <p>{job.email}</p>
                    <p>{job.phone}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobsPage