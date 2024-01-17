"use client";

import { publicApi } from "@/lib/configs/axiosInstance";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

export const dynamicParams = true;

const findLink = async (link: string) => {
  try {
    const res = await publicApi.get<string>(`/api/links/${link}`);
    window.location.href = res.data;
  } catch (e) {
    console.log(e);
    redirect("/");
  }
};

const Page = () => {
  const params = useParams<{ link: string }>();

  useEffect(() => {
    findLink(params.link);
  }, []);

  return null;
};

export default Page;
