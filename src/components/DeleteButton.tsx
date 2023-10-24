"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  // console.log(session?.user)
  // console.log(id)
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (
    status === "unauthenticated" ||
    (!session?.user.isAdmin || !session?.user.isRecuriter)
  ) {
    return;
  }

  const handleDelete = async () => {
    const res = await fetch(`${process.env.NEXTAUTH_URL_URL}/api/jobs/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (res.status === 200) {
      setTimeout(() => {
        router.push("/jobs");
      }, 5000)
      toast("The Job has been deleted!");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };

  return (
    <button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="" width={20} height={20} />
    </button>
  );
};

export default DeleteButton;
