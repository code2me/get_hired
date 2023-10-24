import React from 'react'

const appliedJobs = [
  {
    id: "65366dc6f02e45b30a672a52",
    createdAt: "2023-10-23T12:58:56.000Z",
    company: "NASA",
    company_logo: "https://www.cdnlogo.com/logos/n/48/nasa.svg",
    role: "Senior Software Engineer",
    location: "NY, USA",
    yoe: "5",
    qualification: "Bachelor's Degree in Computer Science",
    ctc: "120,000 USD",
    skills: ["JavaScript", "React", "Node.js"],
    jd: "We are seeking an experienced software engineer to lead our development projects.",
    perks: "Healthcare, remote work, 401(k) matching",
    email: "john.doe@techcorp.com",
    phone: "+1 (123) 456-7890",
  },
  {
    id: "653672f2f02e45b30a672a54",
    createdAt: "2023-10-23T13:21:54.000Z",
    company: "Google",
    company_logo: "https://www.cdnlogo.com/logos/g/35/google-icon.svg",
    role: "Software Engineer",
    location: "Remote, USA",
    yoe: "3",
    qualification: "Bachelor's Degree in Computer Science",
    ctc: "150,000 USD",
    skills: ["Python", "JavaScript", "Machine Learning"],
    jd: "Join Google's engineering team and work on cutting-edge projects.",
    perks: "Flexible work schedule, stock options, on-site gym",
    email: "john.doe@google.com",
    phone: "+1 (123) 456-7890",
  },
  {
    id: "6536737af02e45b30a672a55",
    createdAt: "2023-10-23T13:23:58.000Z",
    company: "Facebook",
    company_logo: "https://www.cdnlogo.com/logos/f/9/facebook.svg",
    role: "Frontend Developer",
    location: "California, USA",
    yoe: "2",
    qualification: "Bachelor's Degree in Computer Science",
    ctc: "130,000 USD",
    skills: ["React", "JavaScript", "CSS"],
    jd: "Join Facebook's web development team and create amazing user experiences.",
    perks: "Healthcare, free meals, transportation stipend",
    email: "jane.smith@facebook.com",
    phone: "+1 (987) 654-3210",
  },
];

const AppliedJobsPage = () => {
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
            {appliedJobs.map((job) => (
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