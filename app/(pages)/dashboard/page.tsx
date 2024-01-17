"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";
import Link from "next/link";
import { publicApi } from "@/lib/configs/axiosInstance";
import { signOut, useSession } from "next-auth/react";

const Page = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, create] = useState(false);
  const [createdLink, setCreatedLink] = useState("");

  const { data: session, status } = useSession();

  const generateLink = async () => {
    if (!link) {
      toast.error("please enter a link", { id: "error" });
      return;
    }

    if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(link)) {
      toast.error("invalid link", { id: "error" });
      return;
    }

    setLoading(true);
    try {
      const cryptedLink = nanoid();
      console.log(status);

      const res = await publicApi.get("/api/auth/user/" + session?.user.email);

      await publicApi.post(`/api/create-link/${res.data._id}`, { link, ceeLink: cryptedLink });

      setCreatedLink(cryptedLink);

      toast.success("link created", { id: "success" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <div className="my-10 container">
          <div className="space-y-2">
            <label htmlFor="website" className="block">
              website link
            </label>
            <input
              type="text"
              placeholder="enter link"
              className="block p-2 outline-none bg-transparent border border-zinc-100/10"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <button
            className={`mt-4 disabled:opacity-20 duration-300 bg-cyan-400 p-3 rounded-lg"`}
            onClick={generateLink}
            disabled={loading}
          >
            {loading ? "loading" : "generate"}
          </button>

          {createdLink && (
            <p>
              Your smart link :{" "}
              <Link className="font-semibold text-cyan-100" target="_blank" href={`/r/${createdLink}`}>
                {createdLink}
              </Link>
            </p>
          )}
        </div>

        <div className="mt-12 container">
          <div className="font-semibold text-red-200 cursor-pointer select-none" onClick={() => signOut()}>
            Logout
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
