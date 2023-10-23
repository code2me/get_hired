"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

type Inputs = {
  company: string;
  location: string;
  role: string;
  yoe: string;
  qualification: qualificationType;
  ctc: string;
  skills: string[];
  jd: string;
  perks: string;
  email: string;
  phone: string;
};

enum qualificationType {
  "Masters",
  "Bachelors",
  "Diploma"
}

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    company: "",
    location: "",
    role: "",
    yoe: "",
    qualification: qualificationType.Bachelors,
    ctc: "",
    skills: [],
    jd: "",
    perks: "",
    email: "",
    phone: "",
  });

  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (
    status === "unauthenticated" ||
    (!session?.user.isAdmin && !session?.user.isRecuriter)
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
      const url = await upload();
      const res = await fetch(`${process.env.HOSTED_URL}/api/jobs`, {
        method: "POST",
        body: JSON.stringify({
          company_logo: url,
          ...inputs,
        }),
      });

      const data = await res.json();

      router.push(`/jobs/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-11rem)] md:h-[calc(100vh-11rem)] flex items-center justify-center text-red-500">
      <div className="overflow-y-auto max-h-[80vh] w-[90%] md:[80%] no-scrollbar">
        <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-6 p-2">
          <h1 className="text-4xl mb-2 text-red-500 font-bold">Add New JOB</h1>
          <div className="w-full flex flex-col gap-2 ">
            <label
              className="text-sm cursor-pointer flex gap-4 items-center"
              htmlFor="file"
            >
              <Image src="/upload.png" alt="" width={30} height={20} />
              <span>Upload Company Logo</span>
            </label>
            <input
              type="file"
              onChange={handleChangeImg}
              id="file"
              className="hidden"
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Company Name</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="Google"
              name="company"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Location</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="NY, USA"
              name="location"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Job Position/Role</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="Senior Software Engineer"
              name="role"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">
              Years of Experience required for this role
            </label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="5"
              name="yoe"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Minimum Qualification Required</label>
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
            <label className="text-sm">Cost to Company Range (CTC)</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="16 LPA"
              name="ctc"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Required Skills</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="JAVA, PYTHON, JS/TS, Node.js, React.js"
              name="skills"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm">Job Description</label>
            <textarea
              rows={3}
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              placeholder="Seeking a Senior Software Engineer with deep expertise in software development, problem-solving skills, and a passion for innovation to lead and contribute to complex projects."
              name="jd"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm">Company Perks</label>
            <textarea
              rows={3}
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              placeholder="Our company offers a range of employee perks, including comprehensive healthcare, flexible work schedules, professional development opportunities, retirement plans, and wellness programs. We value work-life balance and invest in our employees' growth and well-being."
              name="perks"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Email</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="abc@example.com"
              name="email"
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
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 ring-1 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center hover:bg-white hover:ring-black hover:text-black"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
