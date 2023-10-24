"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "All Jobs", url: "/jobs" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  let userType: string = "user";
  if (session?.user.isAdmin) {
    userType = "admin";
  } else if (!session?.user.isAdmin && session?.user.isRecuriter) {
    userType = "recuriter";
  }

  return (
    <div>
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt=""
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />

      {open && (
        <div className="bg-red-500 text-white h-screen absolute left-0 top-[4rem] w-full flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}

          {status === "authenticated" && userType === "user" && (
            <>
              <Link href="/appliedjobs" onClick={() => setOpen(false)}>
                Applied Jobs
              </Link>
              <Link href="/profile" onClick={() => setOpen(false)}>
                Edit Profile
              </Link>
            </>
          )}

          {status === "authenticated" &&
            (userType === "admin" || userType === "recuriter") && (
              <>
                <Link href="/add" onClick={() => setOpen(false)}>
                  Add Jobs
                </Link>
                <Link href="/candidates" onClick={() => setOpen(false)}>
                  Candidates
                </Link>
              </>
            )}

          {status === "authenticated" ? (
            <Link href="/" className="cursor-pointer" onClick={() => signOut()}>
              Logout
            </Link>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
