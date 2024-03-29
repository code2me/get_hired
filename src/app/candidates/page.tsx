"use client"

import { useSession } from "next-auth/react";
import { UsersType, UserType } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const getAllCandidatesData = async () => {
  const res = await fetch("/api/candidates", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const CandidatesPage = () => {
  const { data: session, status } = useSession();
  const [candidates, setCandidates] = useState<UsersType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCandidatesData();
        setCandidates(data);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {session?.user.isAdmin ? (
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Candidates List</h1>
          {loading ? (
            <p>Loading candidates...</p>
          ) : (
            <div className="overflow-x-auto h-[calc(100vh-12rem)]">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-100">Name</th>
                    <th className="px-4 py-2 bg-gray-100">Role</th>
                    <th className="px-4 py-2 bg-gray-100">
                      Years of Experience
                    </th>
                    <th className="px-4 py-2 bg-gray-100">Qualification</th>
                    <th className="px-4 py-2 bg-gray-100">Expected CTC</th>
                    <th className="px-4 py-2 bg-gray-100">Skills</th>
                    <th className="px-4 py-2 bg-gray-100">About</th>
                    <th className="px-4 py-2 bg-gray-100">Resume</th>
                    <th className="px-4 py-2 bg-gray-100">Reason to Apply</th>
                    <th className="px-4 py-2 bg-gray-100">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate: UserType) => (
                    <tr key={candidate.id}>
                      <td className="border px-4 py-2 text-center">
                        {candidate.name}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {candidate.role}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {candidate.yoe}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {candidate.qualification}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {candidate.ectc}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {candidate.skills.join(", ")}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {candidate.about}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <Link
                          className="hover:bg-red-50 p-2 rounded-md hover:ring-1 hover:ring-red-100"
                          href={`${candidate.resume}`}
                          download
                        >
                          Link
                        </Link>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {candidate.reason_to_apply}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {candidate.email}
                        <br />
                        {candidate.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p className="text-bold text-red-500 text-3xl h-[calc(100vh-12rem)] flex justify-center items-center">
          Only Recruiters can see candidates
        </p>
      )}
    </>
  );
};

export default CandidatesPage;
