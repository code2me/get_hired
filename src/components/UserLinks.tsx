"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserLinks = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const addProduct = () => {
    router.push("/add");
  };

  return (
    <>
      <div>
        {session?.user.isRecuriter && (
          <div className="flex justify-between gap-8">
            <button
              className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer px-2 py-2 rounded-md hover:bg-red-500 hover:text-white"
              onClick={addProduct}
            >
              ADD JOBS
            </button>
            <Link
              className="cursor-pointer px-2 py-2 rounded-md hover:bg-red-500 hover:text-white"
              href="/candidates"
            >
              CANDIDATES
            </Link>
          </div>
        )}
      </div>
      <div>
        {!session?.user.isRecuriter && status === "authenticated" && (
          <div className="flex justify-between gap-8">
            <Link
              className="cursor-pointer px-2 py-2 rounded-md hover:bg-red-500 hover:text-white"
              href="/appliedjobs"
            >
              APPLIED JOBS
            </Link>
            <Link
              className="cursor-pointer px-2 py-2 rounded-md hover:bg-red-500 hover:text-white"
              href="/profile"
            >
              Edit Profile
            </Link>
          </div>
        )}
      </div>
      <div>
        {status === "authenticated" ? (
          <div>
            <Link
              href="/"
              className="ml-4 cursor-pointer px-2 py-2 rounded-md hover:bg-red-500 hover:text-white"
              onClick={() => signOut()}
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link
            className="cursor-pointer px-2 py-2 rounded-md hover:bg-red-500 hover:text-white"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default UserLinks;
