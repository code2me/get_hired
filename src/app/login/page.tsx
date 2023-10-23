"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
    router.push("/jobs");
  }
  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-12rem)] flex items-center justify-center bg-red-50">
      {/* BOX */}
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[80%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image
            src="/we_are_hiring.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2 text-center bg-[#c0d2fe]">
          <h1 className="font-bold text-xl xl:text-3xl">USER LOGIN</h1>
          <h2 className="font-bold text-xl xl:text-xl">
            GET HIRED BY TOP COMPANIES
          </h2>
          <p>Log into your account or create a new one using social buttons</p>
          <button
            className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md hover:ring-red-500 hover:text-red-500 bg-white"
            onClick={() => signIn("google")}
          >
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Google</span>
          </button>
          <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md hover:ring-red-500 hover:text-red-500 bg-white">
            <Image
              src="/facebook.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Facebook</span>
          </button>
          <p className="text-sm">
            Have a problem?
            <Link className="underline" href="/">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
