"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MainFeed from "@/components/MainFeed";
import axios from "axios";
import { singleNews } from "@/interfaces/interfaces";
import Navbar from "@/components/Navbar";
import { fetchAINews } from "./api/action";
import { toast } from "sonner";

export default function Home() {
  const [feedNews, setFeedNews] = useState([] as Array<singleNews>);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();

  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 2);

  useEffect(() => {
    (async function () {
      const news = await fetchAINews();
      if (news.length !== 0) setFeedNews(news);
      else {
        console.log("error in getting news");
        toast.error("Something went wrong!");
      }
    })();
  }, []);

  return (
    <>
      <div className="fixed top-0 w-screen">
        <Navbar />
      </div>
      {feedNews.length > 0 && <MainFeed News={feedNews} />}
    </>
  );
}
