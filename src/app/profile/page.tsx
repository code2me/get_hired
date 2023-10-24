"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  role: string;
  yoe: string;
  qualification: qualificationType;
  ectc: string;
  skills: string[];
  about: string;
  resume: string;
  reason_to_apply: string;
  email: string;
  phone: string;
};

enum qualificationType {
  "Masters",
  "Bachelors",
  "Diploma",
}

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    role: "",
    yoe: "",
    qualification: qualificationType.Bachelors,
    ectc: "",
    skills: [],
    about: "",
    resume: "",
    reason_to_apply: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const getProfileData = async () => {
      if (session?.user.userId) {
        const userId = session.user.userId;
        const res = await fetch(`/api/candidates/${userId}`, {
          method: "GET",
          cache: "no-store",
        });

        if (res.ok) {
          const fetchedData = await res.json();
          if (fetchedData) {
            const { id, ...dataWithoutId } = fetchedData;
            setInputs(dataWithoutId);
            setIsDataFetched(true);
          }
        }
      }
    };

    if (status === "authenticated") {
      getProfileData();
    }
  }, [session, status]);

  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (
    status === "unauthenticated" ||
    session?.user.isAdmin ||
    session?.user.isRecuriter
  ) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "skills") {
      // Split the skills input into an array of individual skills
      const skillsArray = value.split(",").map((skill) => skill.trim());

      setInputs((prev) => ({
        ...prev,
        [name]: skillsArray,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "lappinos");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/navneetbahuguna/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let url;

      if (isDataFetched && !inputs.resume) {
        url = await upload();
      }

      let res;
      if (isDataFetched) {
        // UPDATE
        const userId = session?.user.userId;
        res = await fetch(`/api/candidates/${userId}`, {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            ...inputs,
            resume: url,
          }),
        });
      } else {
        // CREATE
        res = await fetch("/api/candidates", {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            ...inputs,
            resume: url,
          }),
        });
      }

      toast(res.json());

      router.push(`/jobs`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-11rem)] md:h-[calc(100vh-11rem)] flex items-center justify-center text-red-500">
      <div className="overflow-y-auto max-h-[80vh] w-[90%] md:[80%] no-scrollbar">
        <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-6 p-2">
          <h1 className="text-4xl mb-2 text-red-500 font-bold">Your Profile</h1>
          <div className="w-full flex flex-col gap-2 ">
            <label
              className="text-sm cursor-pointer flex gap-4 items-center"
              htmlFor="file"
            >
              <Image src="/upload.png" alt="" width={30} height={20} />
              <span>Upload Your Resume [PDF/WORD]</span>
            </label>
            <input
              type="file"
              onChange={handleChangeImg}
              id="file"
              className="hidden"
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Full Name</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="John Doe"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Which role you want to apply for?</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="Software Engineer"
              name="role"
              value={inputs.role}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">
              Total Years of Experience (Excluding Internship)
            </label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="2+"
              name="yoe"
              value={inputs.yoe}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Maximum Qualification Obtained</label>
            <select
              name="qualification"
              value={inputs.qualification}
              onChange={handleChange}
              className="ring-1 ring-red-200 p-2 rounded-sm outline-none"
            >
              {Object.values(qualificationType)
                .filter((value) => typeof value === "string")
                .map((qualification) => (
                  <option key={qualification} value={qualification}>
                    {qualification}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">
              Expected Cost to Company Range (ECTC)
            </label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="16 LPA"
              name="ectc"
              value={inputs.ectc}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">What skills you have?</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="JAVA, PYTHON, JS/TS, Node.js, React.js"
              name="skills"
              value={inputs.skills}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm">About Yourself</label>
            <textarea
              rows={3}
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              placeholder="I am a Senior Software Engineer with over 10 years of experience in software development. I have expertise in Java, Python, and C++. I am passionate about innovation and problem-solving."
              name="about"
              value={inputs.about}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm">
              why do you want to work for this company?
            </label>
            <textarea
              rows={3}
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              placeholder="Please give honest answer"
              name="reason_to_apply"
              value={inputs.reason_to_apply}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Email</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="JohnDoe@example.com"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Phone Number</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="+91 987654321"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 ring-1 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center hover:bg-white hover:ring-black hover:text-black"
          >
            {isDataFetched ? "Update Profile" : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
