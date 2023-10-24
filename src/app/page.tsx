import HireOrRecruit from "@/components/HireOrRecruit";
import Image from "next/image";
import React from "react";

const Home: React.FC = () => {
  return (
    <main>
      <div
        className="bg-red-50 h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: 'url("/bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <HireOrRecruit/>
      </div>
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">
            Why Join Us?
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            At our company, we offer exciting opportunities, a supportive work
            environment, and a chance to make a real impact. Join us in making a
            difference!
          </p>
          <div className="relative w-full rounded-lg shadow-lg">
            <Image
              src="/teams.jpg"
              alt="Team"
              layout="responsive"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
