"use client";

import React from "react";
import { useSession } from "next-auth/react";

const HireOrRecruit = () => {
  const { data: session, status } = useSession();
  let userType: string = "user";
  if (session?.user.isAdmin) {
    userType = "admin";
  } else if (!session?.user.isAdmin && session?.user.isRecuriter) {
    userType = "recuriter";
  }

  return (
    <>
      {userType === "user" && (
        <div className="text-center text-black flex flex-col items-center gap-6">
          <h1 className="text-6xl uppercase font-extrabold mb-4 text-gray-800">
            Join Our Team
          </h1>
          <p className="text-2xl mb-8 text-gray-600">
            We are looking for talented individuals to join us on our mission.
          </p>
          <a
            href="/login"
            className="text-lg btn-primary p-4 rounded-md bg-red-500 hover:bg-red-800 text-white"
          >
            Apply Now
          </a>
        </div>
      )}
      {(userType === "recuriter" || userType === "admin") && (
        <div className="text-center text-black flex flex-col items-center gap-6">
          <h1 className="text-6xl uppercase font-extrabold mb-4 text-gray-800">
            Hire From Us
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Choose the most talented individuals to join your team.
          </p>
          <a
            href="/login"
            className="text-lg btn-primary p-4 rounded-md bg-red-500 hover:bg-red-800 text-white"
          >
            Login Now
          </a>
        </div>
      )}
    </>
  );
};

export default HireOrRecruit;
